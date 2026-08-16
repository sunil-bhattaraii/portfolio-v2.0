'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Send, X, Sparkles, Terminal, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { submitContact } from '@/lib/web3forms';
import {
  TOUR_EVENT_NARRATE,
  TOUR_EVENT_STATUS,
  TOUR_EVENT_STOP,
} from '@/lib/site-tour';
import type { Project } from '@/types';

export type ChatMessage = { role: 'user' | 'ai'; text: string };

type OpenAIMessage = {
  role: 'user' | 'assistant' | 'tool';
  content: string | null;
  tool_calls?: {
    id: string;
    type: 'function';
    function: { name: string; arguments: string };
  }[];
  tool_call_id?: string;
};

type ToolActivity = {
  key: string;
  label: string;
  status: 'running' | 'done' | 'error';
};

type Notice = { id: number; text: string };

const INTERACTIVE_TOOLS = new Set([
  'scrollToSection',
  'openProject',
  'openExternalUrl',
  'sendEmail',
]);

const SCROLL_SECTION_REPLIES: Record<string, string> = {
  home: "I've taken you to the top of my portfolio — where it all begins. What would you like to look at?",
  about: "Here's my About section — a quick intro to who I am. Take a look!",
  projects:
    "I've scrolled you to my Projects — here are some of the things I've built.",
  skills:
    "Here's my Skills section — the tools and technologies I work with.",
  experience:
    "Here's my Experience — the journey that got me here.",
  qualifications:
    "Here are my Qualifications and certifications.",
  contact:
    "Here's the Contact section — feel free to reach out, I'd love to hear from you!",
};

const SUGGESTIONS = [
  'Show me your projects',
  'Scroll to the skills section',
  'What is your tech stack?',
  'Send you an email',
];

const CHAT_STORAGE_KEY = 'sunil-portfolio-chat';
const CONVERSATION_STORAGE_KEY = 'sunil-portfolio-conversation';
const MAX_MESSAGES = 20;
const MODEL_HISTORY_LIMIT = 4;

const getConversationId = (): string => {
  try {
    let id = localStorage.getItem(CONVERSATION_STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(CONVERSATION_STORAGE_KEY, id);
    }
    return id;
  } catch {
    return `conv-${Date.now()}`;
  }
};

/**
 * Fire-and-forget persistence — never awaited, minor failures are acceptable.
 */
const storeChatMessage = (role: 'user' | 'ai', content: string) => {
  try {
    fetch('/api/chat/store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({ conversationId: getConversationId(), role, content }),
    }).catch(() => {});
  } catch {
    // storage/fetch unavailable; ignore
  }
};

const INITIAL_MESSAGE =
  "Initializing persona... Connection established. I am Sunil's digital twin. How can I assist you today?";

const loadPersistedMessages = (): ChatMessage[] => {
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (m): m is ChatMessage =>
          !!m &&
          (m.role === 'user' || m.role === 'ai') &&
          typeof m.text === 'string'
      )
      .slice(-MAX_MESSAGES);
  } catch {
    return [];
  }
};

const persistMessages = (msgs: ChatMessage[]) => {
  try {
    localStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify(msgs.slice(-MAX_MESSAGES))
    );
  } catch {
    // storage unavailable; ignore
  }
};

const toolLabel = (name: string, args?: Record<string, unknown>) => {
  switch (name) {
    case 'scrollToSection':
      return `Scrolled to ${String(args?.section ?? 'section')}`;
    case 'openProject':
      return 'Opened project page';
    case 'openExternalUrl':
      return 'Opened link';
    case 'sendEmail':
      return 'Sent email';
    default:
      return 'Ran tool';
  }
};

const safeParse = (raw: string): Record<string, unknown> => {
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const AIAssistantClient: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = loadPersistedMessages();
    return saved.length ? saved : [{ role: 'ai', text: INITIAL_MESSAGE }];
  });
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toolActivity, setToolActivity] = useState<ToolActivity[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isTourActive, setIsTourActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messagesRef = useRef<ChatMessage[]>(messages);
  const historyRef = useRef<OpenAIMessage[]>([]);
  const replyIndexRef = useRef<number | null>(null);
  const interactiveRanRef = useRef(false);
  const actionSummariesRef = useRef<string[]>([]);
  const noticeIdRef = useRef(0);
  const noticeTimersRef = useRef<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const timers = noticeTimersRef.current;
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isLoading) {
      scrollLastUserMessageToTop();
    }
  }, [isLoading]);

  useEffect(() => {
    persistMessages(messagesRef.current);
  }, [isLoading]);

  useEffect(() => {
    return () => {
      persistMessages(messagesRef.current);
    };
  }, []);

  const pushNotice = (text: string) => {
    const id = ++noticeIdRef.current;
    setNotices((prev) => [...prev.slice(-2), { id, text }]);
    const timer = window.setTimeout(() => {
      setNotices((prev) => prev.filter((n) => n.id !== id));
    }, 6000);
    noticeTimersRef.current.push(timer);
  };

  const showTourBubble = (text: string, duration = 6000) => {
    const id = ++noticeIdRef.current;
    setNotices([{ id, text }]);
    const timer = window.setTimeout(() => {
      setNotices((prev) => prev.filter((n) => n.id !== id));
    }, duration);
    noticeTimersRef.current.push(timer);
  };

  const removeNotice = (id: number) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  const scrollLastUserMessageToTop = () => {
    const container = scrollRef.current;
    if (!container) return;
    const userMessages = container.querySelectorAll('[data-role="user"]');
    const last = userMessages[userMessages.length - 1] as
      | HTMLElement
      | undefined;
    if (!last) return;
    const containerTop = container.getBoundingClientRect().top;
    const elTop = last.getBoundingClientRect().top;
    container.scrollTo({
      top: container.scrollTop + (elTop - containerTop) - 16,
      behavior: 'smooth',
    });
  };

  const buildUiStateContext = () => {
    const path =
      typeof window !== 'undefined' ? window.location.pathname : '/';
    if (path.startsWith('/projects/')) {
      return `The visitor is currently on a single project page (/projects/{id}). To show a different project, call openProject with the exact id or title from the PORTFOLIO DATA in your context. Use scrollToSection to go back to the home sections.`;
    }
    return `The visitor is on the home page (${path}).`;
  };

  const applyMessages = (next: ChatMessage[]) => {
    const drop = Math.max(0, next.length - MAX_MESSAGES);
    const capped = drop > 0 ? next.slice(drop) : next;
    if (drop > 0 && replyIndexRef.current !== null) {
      replyIndexRef.current = Math.max(0, replyIndexRef.current - drop);
    }
    messagesRef.current = capped;
    setMessages(capped);
  };

  const appendToReply = (delta: string) => {
    const next = [...messagesRef.current];
    if (replyIndexRef.current === null) {
      next.push({ role: 'ai', text: delta });
      replyIndexRef.current = next.length - 1;
    } else {
      const index = replyIndexRef.current;
      next[index] = { role: 'ai', text: next[index].text + delta };
    }
    applyMessages(next);
  };

  useEffect(() => {
    const onNarrate = (e: Event) => {
      const detail = (
        e as CustomEvent<{ text?: string; duration?: number }>
      ).detail;
      if (detail?.text) {
        showTourBubble(detail.text, detail.duration ?? 6000);
      }
    };
    const onStatus = (e: Event) => {
      setIsTourActive(
        Boolean((e as CustomEvent<{ active?: boolean }>).detail?.active)
      );
    };
    window.addEventListener(TOUR_EVENT_NARRATE, onNarrate);
    window.addEventListener(TOUR_EVENT_STATUS, onStatus);
    return () => {
      window.removeEventListener(TOUR_EVENT_NARRATE, onNarrate);
      window.removeEventListener(TOUR_EVENT_STATUS, onStatus);
    };
  }, []);

  const pushUserMessage = (text: string) => {
    applyMessages([...messagesRef.current, { role: 'user', text }]);
  };

  const upsertToolActivity = (key: string, name?: string) => {
    if (name && !INTERACTIVE_TOOLS.has(name)) {
      setToolActivity((prev) => prev.filter((t) => t.key !== key));
      return;
    }
    setToolActivity((prev) => {
      const existing = prev.find((t) => t.key === key);
      if (existing) {
        if (name && existing.label === 'Ran tool') {
          return prev.map((t) =>
            t.key === key ? { ...t, label: toolLabel(name) } : t
          );
        }
        return prev;
      }
      return [
        ...prev,
        { key, label: toolLabel(name ?? ''), status: 'running' as const },
      ];
    });
  };

  const setToolStatus = (key: string, status: ToolActivity['status']) => {
    setToolActivity((prev) =>
      prev.map((t) => (t.key === key ? { ...t, status } : t))
    );
  };

  const executeTool = async (
    name: string,
    argsJson: string
  ): Promise<string> => {
    const args = safeParse(argsJson);

    switch (name) {
      case 'scrollToSection': {
        const section = String(args.section ?? '');
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return `Scrolled to the ${section} section.`;
        }
        router.push(`/#${section}`);
        window.setTimeout(() => {
          document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
        return `Navigated to the ${section} section on the home page.`;
      }
      case 'openProject': {
        const projects = (await fetch('/api/projects').then((r) =>
          r.json()
        )) as Project[];
        const match =
          projects.find((p) => p.id === args.id) ??
          projects.find(
            (p) =>
              p.title.toLowerCase() ===
              String(args.title ?? '').toLowerCase()
          );
        if (!match) {
          throw new Error(
            'Project not found. Check the id/title from the PORTFOLIO DATA.'
          );
        }
        router.push(`/projects/${match.id}`);
        return `Navigated to the "${match.title}" project page.`;
      }
      case 'openExternalUrl': {
        const url = String(args.url ?? '');
        if (!/^https?:\/\//i.test(url)) {
          throw new Error('Only http(s) URLs allowed.');
        }

        const [projects, socials] = await Promise.all([
          fetch('/api/projects').then((r) => r.json()).catch(() => []),
          fetch('/api/socials').then((r) => r.json()).catch(() => []),
        ]);
        const projectList = Array.isArray(projects)
          ? projects
          : Array.isArray((projects as { projects?: unknown }).projects)
            ? (projects as { projects: Record<string, unknown>[] }).projects
            : [];
        const socialList = Array.isArray(socials) ? socials : [];

        const realUrls: string[] = [];
        for (const p of projectList as Record<string, unknown>[]) {
          if (typeof p.liveUrl === 'string' && p.liveUrl) realUrls.push(p.liveUrl);
          if (typeof p.githubUrl === 'string' && p.githubUrl) realUrls.push(p.githubUrl);
        }
        for (const s of socialList as Record<string, unknown>[]) {
          if (typeof s.href === 'string' && s.href) realUrls.push(s.href);
        }

        const normalize = (raw: string) => {
          try {
            const parsed = new URL(raw);
            return {
              origin: parsed.origin.toLowerCase(),
              pathname: parsed.pathname.toLowerCase().replace(/\/+$/, ''),
            };
          } catch {
            return null;
          }
        };

        const wanted = normalize(url);
        const isReal = realUrls.some((real) => {
          const rn = normalize(real);
          return (
            rn !== null &&
            wanted !== null &&
            rn.origin === wanted.origin &&
            rn.pathname === wanted.pathname
          );
        });
        if (!isReal) {
          const candidates = realUrls.filter((real) => {
            const rn = normalize(real);
            return rn !== null && wanted !== null && rn.origin === wanted.origin;
          });
          const hint =
            candidates.length > 0
              ? ` The real links from that site are: ${[...new Set(candidates)]
                  .slice(0, 5)
                  .join(', ')}.`
              : '';
          throw new Error(
            `That link isn't a real portfolio link, so I didn't open it. I can only open real links from Sunil's portfolio — a project's live site or repository, or a social profile.${hint}`
          );
        }

        window.open(url, '_blank', 'noopener,noreferrer');
        return `Opened ${url} in a new tab.`;
      }
      case 'sendEmail': {
        const name = String(args.name ?? '').trim();
        const email = String(args.email ?? '').trim();
        const message = String(args.message ?? '').trim();

        const placeholder =
          /message content|your name|your email|your message|visitor name|lorem|placeholder|test@|example\.com/i;
        const problems: string[] = [];
        if (!name || name.length < 2 || placeholder.test(name)) {
          problems.push('name');
        }
        if (
          !email ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
          placeholder.test(email)
        ) {
          problems.push('valid email address');
        }
        if (!message || message.length < 5 || placeholder.test(message)) {
          problems.push('message');
        }

        if (problems.length > 0) {
          throw new Error(
            `Cannot send the email yet: ask the visitor for their ${problems.join(
              ', '
            )}. Show the complete message back to them and get explicit confirmation before calling sendEmail again.`
          );
        }

        const { ok, data } = await submitContact({ name, email, message });
        if (!ok) {
          throw new Error(
            typeof data?.message === 'string' && data.message
              ? data.message
              : 'Email failed to send.'
          );
        }
        return 'Email sent successfully to Sunil.';
      }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  };

  const runTurn = async (): Promise<boolean> => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: historyRef.current,
        context: buildUiStateContext(),
      }),
    });
    if (!res.ok || !res.body) {
      throw new Error(`Chat request failed (${res.status}).`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let streamedText = '';
    const toolCalls = new Map<number, { id: string; name: string; args: string }>();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          if (!line.trim()) continue;
          const msg = JSON.parse(line);
          if (msg.type === 'text') {
            streamedText += msg.d;
            appendToReply(msg.d);
          } else if (msg.type === 'tool') {
            const key = msg.i ?? 0;
            const acc = toolCalls.get(key) ?? { id: '', name: '', args: '' };
            if (msg.id) acc.id = msg.id;
            if (msg.name) acc.name = msg.name;
            if (msg.a) acc.args += msg.a;
            toolCalls.set(key, acc);
            upsertToolActivity(acc.id || `tool-${key}`, acc.name);
          } else if (msg.type === 'error') {
            throw new Error(msg.message || 'Upstream chat error.');
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    const calls = [...toolCalls.values()].filter((c) => c.name);

    if (calls.length === 0) {
      historyRef.current.push({ role: 'assistant', content: streamedText });
      return true;
    }

    historyRef.current.push({
      role: 'assistant',
      content: streamedText || null,
      tool_calls: calls.map((c) => ({
        id: c.id,
        type: 'function' as const,
        function: { name: c.name, arguments: c.args || '{}' },
      })),
    });

    const results: string[] = [];
    for (const call of calls) {
      const activityKey = call.id || `tool-${toolCalls.size}`;
      setToolStatus(activityKey, 'running');
      let result: string;
      try {
        result = await executeTool(call.name, call.args);
        setToolStatus(activityKey, 'done');
      } catch (error) {
        result = `Error: ${error instanceof Error ? error.message : 'Tool failed.'}`;
        setToolStatus(activityKey, 'error');
      }
      results.push(result);
      if (INTERACTIVE_TOOLS.has(call.name)) {
        interactiveRanRef.current = true;
        if (!result.startsWith('Error:')) {
          actionSummariesRef.current.push(result);
        }
      }
      historyRef.current.push({
        role: 'tool',
        tool_call_id: call.id,
        content: result,
      });
    }

    const allOpenExternal = calls.every((c) => c.name === 'openExternalUrl');
    if (allOpenExternal && results.every((r) => r.startsWith('Error:'))) {
      const replyText = results
        .map((r) => r.replace(/^Error:\s*/, ''))
        .join('\n\n');
      if (streamedText) appendToReply(`\n\n${replyText}`);
      else appendToReply(replyText);
      return true;
    }

    if (
      calls.length === 1 &&
      calls[0].name === 'scrollToSection' &&
      results[0] &&
      !results[0].startsWith('Error:')
    ) {
      const section = String(safeParse(calls[0].args)?.section ?? '').trim();
      if (section) {
        if (!streamedText) {
          appendToReply(
            SCROLL_SECTION_REPLIES[section] ??
              `I've taken you to the ${section} section.`
          );
        }
        return true;
      }
    }

    return false;
  };

  const handleSendMessage = async (text: string = inputValue) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    replyIndexRef.current = null;
    setToolActivity([]);
    interactiveRanRef.current = false;
    actionSummariesRef.current = [];
    pushUserMessage(trimmed);
    storeChatMessage('user', trimmed);
    historyRef.current = messagesRef.current
      .slice(-MODEL_HISTORY_LIMIT)
      .map<OpenAIMessage>((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));
    setInputValue('');
    setIsLoading(true);

    try {
      let finished = false;
      while (!finished) {
        finished = await runTurn();
      }

      const finalReply =
        replyIndexRef.current !== null
          ? (messagesRef.current[replyIndexRef.current]?.text ?? '')
          : '';
      if (finalReply.trim()) storeChatMessage('ai', finalReply);

      if (interactiveRanRef.current) {
        setIsOpen(false);
        const reply =
          replyIndexRef.current !== null
            ? (messagesRef.current[replyIndexRef.current]?.text ?? '')
            : '';
        const source = (reply.trim() ? reply.trim() : actionSummariesRef.current[0])
          ?.replace(/[`*#_>]/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        const text = source || 'Action completed.';
        pushNotice(text.length > 120 ? `${text.slice(0, 120).trimEnd()}…` : text);
      }
    } catch (error) {
      console.error('AI Error:', error);
      const message =
        error instanceof Error ? error.message : 'Connection error.';
      if (replyIndexRef.current !== null) {
        appendToReply(`\n\n**Error:** ${message}`);
      } else {
        applyMessages([
          ...messagesRef.current,
          { role: 'ai', text: `Connection error: ${message}` },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const showThinking = isLoading && replyIndexRef.current === null;

  const verticalCls = 'bottom-full mb-4';
  const panelHCls = 'right-0';

  return (
    <div className="fixed bottom-8 right-8 z-1100">
      <div className="relative">
      {isHovered && !isOpen && notices.length === 0 && (
        <div className={`absolute ${verticalCls} ${panelHCls} bg-sky-600 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 pointer-events-none whitespace-nowrap`}>
          <Sparkles size={12} className="animate-pulse" />
          Chat with my persona
        </div>
      )}

      {!isOpen && notices.length > 0 && (
        <div className={`absolute ${verticalCls} ${panelHCls} w-72 max-w-[80vw] flex flex-col items-end gap-2`}>
          {notices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => {
                if (!isTourActive) setIsOpen(true);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === 'Enter' && !isTourActive && setIsOpen(true)
              }
              className="cursor-pointer group text-left bg-zinc-900/95 backdrop-blur border border-white/10 rounded-2xl rounded-br-none px-4 py-3 shadow-2xl text-sm text-zinc-300 hover:border-sky-500/50 transition-colors flex items-start gap-2"
            >
              <span className="flex-1 leading-snug line-clamp-3">{notice.text}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotice(notice.id);
                }}
                className="text-zinc-600 group-hover:text-white shrink-0"
                aria-label="Dismiss notification"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (isTourActive) {
            window.dispatchEvent(new CustomEvent(TOUR_EVENT_STOP));
            if (isOpen) setIsOpen(false);
            return;
          }
          setIsOpen(!isOpen);
        }}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 border-2 ${
          isOpen
            ? 'bg-zinc-900 border-white/20 rotate-90 text-zinc-400'
            : 'bg-sky-600 border-sky-400/50 text-white shadow-sky-500/20'
        }`}
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <div className="relative">
            <Bot size={28} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-sky-600 animate-ping"></span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className={`absolute ${verticalCls} ${panelHCls} w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-zinc-950/95 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col border border-white/10`}>
          <div className="px-4 py-3 bg-black/40 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                <Terminal size={14} className="text-sky-500" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h4 className="text-xs font-black text-white uppercase tracking-wider">
                  Sunil&apos;s Persona
                </h4>
                {isTourActive && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-[8px] font-black uppercase tracking-widest text-sky-400 animate-pulse">
                    Tour
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar bg-zinc-950/20"
          >
            {messages.map((msg, i) => {
              const isLastReply =
                msg.role === 'ai' && i === messages.length - 1;
              return (
                <div
                  key={i}
                  data-role={msg.role}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`min-w-0 max-w-[85%] break-words p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-sky-600 text-white rounded-tr-none shadow-lg'
                        : 'bg-zinc-900/80 border border-white/5 text-zinc-300 rounded-tl-none shadow-md'
                    }`}
                  >
                    {msg.role === 'ai' ? (
                      <div className="markdown-content prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({ node: _node, ...props }) => (
                              <p className="mb-2 last:mb-0" {...props} />
                            ),
                            strong: ({ node: _node, ...props }) => (
                              <strong
                                className="font-bold text-sky-400"
                                {...props}
                              />
                            ),
                            ul: ({ node: _node, ...props }) => (
                              <ul className="list-disc ml-4 mb-2" {...props} />
                            ),
                            ol: ({ node: _node, ...props }) => (
                              <ol className="list-decimal ml-4 mb-2" {...props} />
                            ),
                            li: ({ node: _node, ...props }) => (
                              <li className="mb-1" {...props} />
                            ),
                            code: ({ node: _node, ...props }) => (
                              <code
                                className="bg-zinc-800/80 px-1.5 py-0.5 rounded text-[11px] font-mono text-sky-300 border border-white/5 break-words"
                                {...props}
                              />
                            ),
                            pre: ({ node: _node, ...props }) => (
                              <pre
                                className="whitespace-pre-wrap break-words bg-zinc-800/40 border border-white/10 rounded-lg p-3 my-2 text-[11px] font-mono text-sky-200 overflow-x-auto"
                                {...props}
                              />
                            ),
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      msg.text
                    )}

                    {isLastReply && toolActivity.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        {toolActivity.map((tool) => (
                          <span
                            key={tool.key}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-[10px] font-bold uppercase tracking-wider text-sky-400"
                          >
                            {tool.status === 'running' ? (
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                            ) : tool.status === 'done' ? (
                              <Check size={10} />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            )}
                            {tool.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {showThinking && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 border border-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1">
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-3 bg-black/40 border-t border-white/5 space-y-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {SUGGESTIONS.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(suggestion)}
                  disabled={isTourActive}
                  className="whitespace-nowrap px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-white/5 text-[10px] font-bold text-sky-400 uppercase tracking-wider rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isTourActive}
                placeholder={isTourActive ? 'Tour in progress...' : 'Ask my persona anything...'}
                className="w-full pl-4 pr-12 py-3 bg-zinc-950 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors disabled:opacity-60"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading || isTourActive}
                className="absolute right-1.5 top-1.5 w-9 h-9 bg-sky-600 text-white rounded-xl flex items-center justify-center hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AIAssistantClient;
