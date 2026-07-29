"use client";

import React, { useState } from 'react';
import { Terminal, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData();
    formData.append('access_key', 'f1d24eb2-42ae-4016-86f6-26f0cd6228f0');
    formData.append('name', formState.name);
    formData.append('email', formState.email);
    formData.append('message', formState.message);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
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
              name="name"
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
              name="email"
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
            name="message"
            placeholder="Your message content..." 
            value={formState.message}
            onChange={(e) => setFormState({...formState, message: e.target.value})}
            className="w-full px-5 py-4 bg-zinc-950 border border-white/5 rounded-lg text-white text-sm focus:outline-none focus:border-sky-500/50 transition-colors resize-none" 
          />
        </div>

        {status === 'success' && (
          <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3">
            <CheckCircle size={16} /> Transmission successful. Sunil will respond shortly.
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
            <AlertCircle size={16} /> Transmission failed. Try again or email directly.
          </div>
        )}

        <button 
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-5 bg-sky-600 hover:bg-sky-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-bold rounded-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-sky-500/10 active:scale-[0.98] text-sm tracking-tight"
        >
          {status === 'loading' ? (
            <><Loader2 size={18} className="animate-spin" /> Transmitting...</>
          ) : (
            <><Send size={18} /> Transmit</>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;