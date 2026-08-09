'use client';

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactContent {
  email: string;
  phone: string;
  location: string;
}

interface ContactInfoProps {
  contact: ContactContent;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contact }) => {
  const contactMethods = [
    {
      icon: <Mail size={24} />,
      label: 'Email Protocol',
      value: contact.email,
      href: contact.email ? `mailto:${contact.email}` : undefined,
    },
    {
      icon: <Phone size={24} />,
      label: 'Secure Line',
      value: contact.phone,
      href: contact.phone ? `tel:${contact.phone.replace(/\s/g, '')}` : undefined,
    },
    {
      icon: <MapPin size={24} />,
      label: 'Base Node',
      value: contact.location,
    },
  ].filter((m) => m.value);

  if (contactMethods.length === 0) return null;

  return (
    <div className="space-y-8">
      {contactMethods.map((method, i) => (
        <div key={i} className="flex items-start gap-6 group">
          <div className="p-4 bg-zinc-900 border border-white/5 rounded-lg text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all">
            {method.icon}
          </div>
          <div>
            <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mb-1">{method.label}</p>
            {method.href ? (
              <a href={method.href} className="text-xl font-bold text-white hover:text-sky-500 transition-colors tracking-tight">
                {method.value}
              </a>
            ) : (
              <p className="text-xl font-bold text-white tracking-tight">{method.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo;
