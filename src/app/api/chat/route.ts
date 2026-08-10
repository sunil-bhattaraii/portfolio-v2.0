import OpenAI from 'openai';
import { NextRequest } from 'next/server';
import { CHAT_TOOLS } from '@/lib/chat-tools';
import { getAIInstruction, getAIModel } from '@/lib/queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_NIM_API_KEY,
  baseURL: process.env.NIM_BASE_URL || 'https://integrate.api.nvidia.com/v1',
});

/**
 * Stateless streaming chat proxy. The client owns the agentic loop and sends
 * the full OpenAI-style message history (including tool calls/results).
 * Response is NDJSON, one object per line:
 *   {"type":"text","d":"..."}            streamed text delta
 *   {"type":"tool","i":0,"id":"..","name":"..","a":".."}  tool_call delta fragments
 *   {"type":"finish","reason":".."}      current turn finished
 *   {"type":"error","message":".."}      upstream failure
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const history = Array.isArray(body?.messages) ? body.messages : [];
  const context =
    typeof body?.context === 'string' && body.context.trim()
      ? body.context.trim()
      : '';

  const encoder = new TextEncoder();

  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      // The consumer may cancel mid-stream (client closes the chat, navigates
      // away, aborts the fetch). Once that happens, enqueue() throws, so stop
      // pulling from NIM and abort the upstream request too.
      const abortController = new AbortController();
      let aborted = false;

      const onAbort = () => {
        aborted = true;
        abortController.abort();
      };
      // req.signal fires when the client disconnects and is supported on every
      // runtime. controller.signal is NOT implemented in Node.js as of v24, so
      // only use it as a bonus when the runtime provides it.
      req.signal.addEventListener('abort', onAbort, { once: true });
      const controllerSignal = (controller as { signal?: AbortSignal }).signal;
      if (controllerSignal?.addEventListener) {
        controllerSignal.addEventListener('abort', onAbort, { once: true });
      }

      const send = (obj: unknown): boolean => {
        if (aborted) return false;
        try {
          controller.enqueue(encoder.encode(`${JSON.stringify(obj)}\n`));
          return true;
        } catch {
          aborted = true;
          return false;
        }
      };

      try {
        const [instruction, model] = await Promise.all([
          getAIInstruction(),
          getAIModel(),
        ]);
        const stream = await openai.chat.completions.create(
          {
            model,
            stream: true,
            messages: [
              {
                role: 'system',
                content: context
                  ? `${instruction}\n\nCURRENT UI STATE:\n${context}`
                  : instruction,
              },
              ...history,
            ],
            tools: CHAT_TOOLS,
            tool_choice: 'auto',
          },
          { signal: abortController.signal }
        );

        for await (const chunk of stream) {
          if (aborted) break;
          const choice = chunk.choices?.[0];
          if (!choice) continue;
          const delta = choice.delta;
          if (delta?.content && !send({ type: 'text', d: delta.content })) {
            break;
          }
          if (delta?.tool_calls) {
            for (const tc of delta.tool_calls) {
              if (
                !send({
                  type: 'tool',
                  i: tc.index,
                  id: tc.id ?? undefined,
                  name: tc.function?.name ?? undefined,
                  a: tc.function?.arguments ?? undefined,
                })
              ) {
                break;
              }
            }
          }
          if (choice.finish_reason) {
            send({ type: 'finish', reason: choice.finish_reason });
          }
        }
      } catch (error) {
        if (!aborted) {
          console.error('/api/chat:', error);
          send({
            type: 'error',
            message:
              error instanceof Error ? error.message : 'Unknown error',
          });
        }
      } finally {
        req.signal.removeEventListener('abort', onAbort);
        if (controllerSignal?.removeEventListener) {
          controllerSignal.removeEventListener('abort', onAbort);
        }
        if (!aborted) {
          try {
            controller.close();
          } catch {
            // already closed by the consumer; nothing to do
          }
        }
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
