"use client";

import React, { useState } from 'react';
import { Terminal, Send } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form transmission
    console.log('Transmitting Payload:', formState);
    alert('Signal sent successfully. Sunil will respond shortly.');
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="p-8 md:p-12 bg-zinc-900/50 border border-white/5 rounded-2xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Terminal size={120} />
      </div>
      <h3 className="text-xl font-bold text-white mb-8 tracking-tight flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span> Secure Message
      </h3>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Name</label>
            <input 
              type="text" 
              required
              placeholder="Ram Adhikari" 
              value={formState.name}
              onChange={(e) => setFormState({...formState, name: e.target.value})}
              className="w-full px-5 py-4 bg-zinc-950 border border-white/5 rounded-lg text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="ramadh@xyz.com" 
              value={formState.email}
              onChange={(e) => setFormState({...formState, email: e.target.value})}
              className="w-full px-5 py-4 bg-zinc-950 border border-white/5 rounded-lg text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors" 
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Payload</label>
          <textarea 
            rows={4} 
            required
            placeholder="Your message content..." 
            value={formState.message}
            onChange={(e) => setFormState({...formState, message: e.target.value})}
            className="w-full px-5 py-4 bg-zinc-950 border border-white/5 rounded-lg text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors resize-none" 
          />
        </div>
        <button 
          type="submit"
          className="w-full py-5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-sky-500/10 active:scale-[0.98] text-sm tracking-tight"
        >
          Transmit <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;