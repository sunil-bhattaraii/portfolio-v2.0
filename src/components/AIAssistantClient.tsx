'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Bot, Send, X, Sparkles, Terminal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export type ChatMessage = { role: 'user' | 'ai'; text: string };

interface AIAssistantClientProps {
  onSendMessage: (
    messages: ChatMessage[],
    userMessage: string
  ) => Promise<string>;
}

const SUGGESTIONS = [
  'What is your tech stack?',
  'Tell me about your projects.',
  'How can you help my business?',
  'Are you available for hire?',
];

const AIAssistantClient: React.FC<AIAssistantClientProps> = ({
  onSendMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'ai',
      text: "Initializing persona... Connection established. I am Sunil's digital twin. How can I assist you today?",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    const messageHistory = [...messages];

    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await onSendMessage(messageHistory, userMessage);
      setMessages((prev) => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: 'Connection error. Please check your network protocol.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-1100 flex flex-col items-end">
      {isHovered && !isOpen && (
        <div className="mb-4 mr-2 bg-sky-600 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 pointer-events-none">
          <Sparkles size={12} className="animate-pulse" />
          Chat with my persona
        </div>
      )}

      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
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
        <div className="absolute bottom-20 right-0 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-zinc-950/95 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col border border-white/10">
          <div className="p-6 bg-black/40 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                <Terminal size={18} className="text-sky-500" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider">
                  Sunil Persona
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest transition-all">
                    Persona Online
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-zinc-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-zinc-950/20">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
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
                              className="bg-zinc-800/80 px-1.5 py-0.5 rounded text-[11px] font-mono text-sky-300 border border-white/5"
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
                </div>
              </div>
            ))}
            {isLoading && (
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

          <div className="p-6 bg-black/40 border-t border-white/5 space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {SUGGESTIONS.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(suggestion)}
                  className="whitespace-nowrap px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-white/5 text-[10px] font-bold text-sky-400 uppercase tracking-wider rounded-lg transition-colors"
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
                placeholder="Ask my persona anything..."
                className="w-full pl-5 pr-14 py-4 bg-zinc-950 border border-white/10 rounded-2xl text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="absolute right-2 top-2 w-10 h-10 bg-sky-600 text-white rounded-xl flex items-center justify-center hover:bg-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[9px] text-center text-zinc-600 font-bold uppercase tracking-[0.2em]">
              Secure End-to-End Persona Protocol
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistantClient;
