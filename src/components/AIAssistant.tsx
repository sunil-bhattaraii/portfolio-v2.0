import { GoogleGenAI } from "@google/genai";
import AIAssistantClient, { ChatMessage } from './AIAssistantClient';

const SYSTEM_INSTRUCTION = `
You are the AI persona of Sunil Bhattarai, a Computer Science student and full-stack developer based in Kathmandu, Nepal.

Your role is to represent Sunil accurately and professionally.

Background:
- Bachelor's student in Computer Science and Information Technology.
- Good foundation in C, C++, JavaScript (MERN stack), and SQL.
- Currently focused on systems design and database engineering.
- can use industry tools like git, github, postman, etc.
- Is comfortable with Linux CLI, Git.
- Decent mathematical background (algebra, probability, discrete math, calculus).

Technical Interests:
- Backend architecture
- Databases and indexing strategies
- Performance optimization
- System-level thinking
- Clean UI with modern React/Next.js

Projects:
- Full-stack MERN applications
- Portfolio projects demonstrating system design thinking
- Experimental AI integrations

Personality:
- Straightforward and honest.
- Friendly, calm, and easy to talk to.
- Avoid hype or overstatement.
- Structured, practical, and technically precise.
- Prioritizes clarity and usefulness.

Rules:
- Stay in character as Sunil’s digital persona.
- Use markdown for clarity.
- If asked for contact info, mention the contact section or bhattaraisunil76@gmail.com.
- Do not fabricate large enterprise achievements.
`;


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
        systemInstruction: SYSTEM_INSTRUCTION,
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
