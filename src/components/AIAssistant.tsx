import { GoogleGenAI } from "@google/genai";
import AIAssistantClient, { ChatMessage } from './AIAssistantClient';
import { getAIPrompt } from '@/lib/ai-context';


async function generatePersonaResponse(
  messages: ChatMessage[],
  userMessage: string
): Promise<string> {
  "use server";

  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("Missing API_KEY");
    }

    const systemInstruction = await getAIPrompt();

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messages
        .map((message) => ({
          role: message.role === "user" ? "user" : "model",
          parts: [{ text: message.text }],
        }))
        .concat([{ role: "user", parts: [{ text: userMessage }] }]),
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return (
      response.text ??
      "I'm having trouble connecting to my central processing unit. Please try again later."
    );
  } catch (error) {
    console.error("AI Error:", error);
    return "Connection error. Please check your network protocol.";
  }
}

const AIAssistant = () => {
  return <AIAssistantClient onSendMessage={generatePersonaResponse} />;
};

export default AIAssistant;
