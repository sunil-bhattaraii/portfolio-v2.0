'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, User, Bot, Loader2, Link2 } from 'lucide-react';
import { PageHeader, Card, Select, Button } from './ui';

type StoredMessage = {
  id: string;
  conversationId: string;
  role: 'user' | 'ai';
  content: string;
  ip: string;
  userAgent: string;
  createdAt: string;
};

type IpMeta = {
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isp: string;
  asn: number;
};

type GroupMode = 'ip-conv' | 'conv' | 'ip';

type ConvGroup = {
  key: string;
  conversationId: string;
  messages: StoredMessage[];
};

type TopGroup = {
  key: string;
  label: string;
  ips: string[];
  conversations: ConvGroup[];
};

const shortId = (id: string) => id.slice(0, 8);

const lastTime = (msgs: StoredMessage[]): number =>
  msgs.length ? Date.parse(msgs[msgs.length - 1].createdAt) || 0 : 0;

const formatTime = (iso: string): string => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '' : d.toLocaleString();
};

function deviceLabel(ua: string): string {
  const u = ua.toLowerCase();
  const type = /ipad|tablet/i.test(u)
    ? 'Tablet'
    : /android|iphone|ipod|mobile/i.test(u)
      ? 'Mobile'
      : 'Desktop';
  let browser = 'Unknown';
  if (/edg/i.test(u)) browser = 'Edge';
  else if (/chrome|crios/i.test(u)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(u)) browser = 'Firefox';
  else if (/safari/i.test(u)) browser = 'Safari';
  return `${type} · ${browser}`;
}

const groupMessages = (
  messages: StoredMessage[],
  key: (m: StoredMessage) => string
): Map<string, StoredMessage[]> => {
  const map = new Map<string, StoredMessage[]>();
  for (const m of messages) {
    const k = key(m);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(m);
  }
  return map;
};

const uniqueIps = (msgs: StoredMessage[]): string[] => [
  ...new Set(msgs.map((m) => m.ip).filter(Boolean)),
];

/**
 * A "person" is identified by conversationId. When one conversationId spans
 * multiple IPs (the visitor's IP changed mid-conversation), it is still ONE
 * person — those messages are merged into a single group with all its IPs.
 */
const buildGroups = (messages: StoredMessage[], mode: GroupMode): TopGroup[] => {
  if (mode === 'conv') {
    return [...groupMessages(messages, (m) => m.conversationId).entries()].map(
      ([cid, msgs]) => ({
        key: cid,
        label: `Person · #${shortId(cid)}`,
        ips: uniqueIps(msgs),
        conversations: [{ key: cid, conversationId: cid, messages: msgs }],
      })
    );
  }

  if (mode === 'ip') {
    return [...groupMessages(messages, (m) => m.ip).entries()].map(([ip, msgs]) => ({
      key: ip,
      label: ip === 'unknown' ? 'Unknown IP' : ip,
      ips: [ip],
      conversations: [
        { key: ip, conversationId: msgs[0].conversationId, messages: msgs },
      ],
    }));
  }

  // ip-conv (default): nest single-IP conversations under their IP, but pull
  // multi-IP conversations out into their own "person" group.
  const groups: TopGroup[] = [];
  const byIp = new Map<string, ConvGroup[]>();
  for (const [cid, msgs] of groupMessages(messages, (m) => m.conversationId)) {
    const ips = uniqueIps(msgs);
    const conv: ConvGroup = { key: cid, conversationId: cid, messages: msgs };
    if (ips.length > 1) {
      groups.push({
        key: `person-${cid}`,
        label: `Person · #${shortId(cid)}`,
        ips,
        conversations: [conv],
      });
    } else {
      const ip = ips[0];
      if (!byIp.has(ip)) byIp.set(ip, []);
      byIp.get(ip)!.push(conv);
    }
  }
  for (const [ip, conversations] of byIp) {
    groups.push({
      key: ip,
      label: ip === 'unknown' ? 'Unknown IP' : ip,
      ips: [ip],
      conversations,
    });
  }
  return groups;
};

const IpMetaList: React.FC<{ ips: string[]; meta: Record<string, IpMeta> }> = ({
  ips,
  meta,
}) => {
  if (!ips.length) return null;
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
      {ips.map((ip) => {
        const m = meta[ip];
        const chips = [
          m?.country,
          m?.city,
          m?.region,
          m?.timezone,
          m?.isp,
          m?.asn ? `AS${m.asn}` : '',
          m?.latitude && m?.longitude
            ? `${m.latitude.toFixed(2)}, ${m.longitude.toFixed(2)}`
            : '',
        ].filter(Boolean);
        return (
          <div key={ip} className="flex flex-col gap-1">
            <span className="self-start px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/30 text-xs font-mono font-bold text-sky-400">
              {ip === 'unknown' ? 'Unknown IP' : ip}
            </span>
            {chips.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {chips.map((chip, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/5 text-[9px] text-zinc-400"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const ChatViewer: React.FC = () => {
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [meta, setMeta] = useState<Record<string, IpMeta>>({});
  const [mode, setMode] = useState<GroupMode>('ip-conv');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/chat-history', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to load chats:', e);
      setError('Failed to load chats.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const ips = [...new Set(messages.map((m) => m.ip).filter(Boolean))].join(',');
    if (!ips) return;
    let cancelled = false;
    fetch(`/api/chat-metadata?ips=${encodeURIComponent(ips)}`, {
      cache: 'no-store',
    })
      .then((r) => (r.ok ? r.json() : {}))
      .then((data) => {
        if (!cancelled) setMeta(data);
      })
      .catch((e) => console.error('Failed to load IP metadata:', e));
    return () => {
      cancelled = true;
    };
  }, [messages]);

  const groups = useMemo(
    () =>
      buildGroups(messages, mode).sort((a, b) => {
        const aLast = lastTime(a.conversations[a.conversations.length - 1].messages);
        const bLast = lastTime(b.conversations[b.conversations.length - 1].messages);
        return bLast - aLast;
      }),
    [messages, mode]
  );

  const stats = useMemo(() => {
    const convCount = new Set(messages.map((m) => m.conversationId)).size;
    const ipCount = new Set(messages.map((m) => m.ip)).size;
    return { total: messages.length, convCount, ipCount };
  }, [messages]);

  return (
    <div>
      <PageHeader
        title="Chats"
        subtitle="Conversations recorded from the assistant. A conversation spanning multiple IPs is treated as one person. IP metadata is looked up live via ipwho.is and is not stored."
        action={
          <div className="flex items-center gap-3">
            <Select
              value={mode}
              onChange={(e) => setMode(e.target.value as GroupMode)}
              className="w-auto"
            >
              <option value="ip-conv">By IP → Conversation</option>
              <option value="conv">By Conversation (person)</option>
              <option value="ip">By IP only</option>
            </Select>
            <Button variant="secondary" onClick={load} disabled={loading}>
              {loading ? (
                <Loader2 size={14} className="animate-spin mr-1.5 inline" />
              ) : (
                <RefreshCw size={14} className="mr-1.5 inline" />
              )}
              Refresh
            </Button>
          </div>
        }
      />

      {!loading && messages.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-[11px] text-zinc-400">
            {stats.total} messages
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-[11px] text-zinc-400">
            {stats.convCount} conversations
          </span>
          <span className="px-3 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-[11px] text-zinc-400">
            {stats.ipCount} IPs
          </span>
        </div>
      )}

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <Card className="p-12 flex items-center justify-center gap-3 text-zinc-500">
          <Loader2 size={20} className="animate-spin" /> Loading chats…
        </Card>
      ) : groups.length === 0 ? (
        <Card className="p-12 text-center text-zinc-500 text-sm font-medium">
          No chats recorded yet. Conversations will appear here once visitors use
          the assistant.
        </Card>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <Card key={group.key} className="overflow-hidden">
              <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/30 text-xs font-mono font-bold text-sky-400">
                    {group.label}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">
                    {group.conversations.length}{' '}
                    {group.conversations.length === 1 ? 'conversation' : 'conversations'}
                  </span>
                  {group.ips.length > 1 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      <Link2 size={10} />
                      {group.ips.length} IPs · same person
                    </span>
                  )}
                  <span className="ml-auto text-[11px] text-zinc-500">
                    Last activity:{' '}
                    {formatTime(
                      group.conversations[group.conversations.length - 1].messages[
                        group.conversations[group.conversations.length - 1].messages
                          .length - 1
                      ].createdAt
                    )}
                  </span>
                </div>
                {mode !== 'conv' && <IpMetaList ips={group.ips} meta={meta} />}
              </div>

              <div className="divide-y divide-white/5">
                {group.conversations.map((conv) => (
                  <div key={conv.key} className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                        Conversation{' '}
                        <span className="font-mono text-zinc-500">
                          #{shortId(conv.conversationId)}
                        </span>
                      </span>
                      <span className="px-2 py-0.5 rounded bg-zinc-800 border border-white/5 text-[10px] text-zinc-400">
                        {deviceLabel(conv.messages[0]?.userAgent ?? '')}
                      </span>
                      <span className="text-[11px] text-zinc-600">
                        {conv.messages.length} msg ·{' '}
                        {formatTime(conv.messages[0]?.createdAt ?? '')}
                      </span>
                    </div>
                    {mode === 'conv' && <IpMetaList ips={group.ips} meta={meta} />}
                    <div className="space-y-2.5 mt-3">
                      {conv.messages.map((m) => (
                        <div
                          key={m.id}
                          className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] min-w-0 break-words px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                              m.role === 'user'
                                ? 'bg-sky-600 text-white rounded-tr-none'
                                : 'bg-zinc-900 border border-white/5 text-zinc-300 rounded-tl-none'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1 text-[9px] font-black uppercase tracking-widest opacity-60">
                              {m.role === 'user' ? (
                                <>
                                  <User size={9} /> Visitor
                                </>
                              ) : (
                                <>
                                  <Bot size={9} /> Persona
                                </>
                              )}
                            </div>
                            <div className="whitespace-pre-wrap break-words">
                              {m.content}
                            </div>
                            {m.createdAt && (
                              <div className="mt-1 text-[9px] opacity-50">
                                {formatTime(m.createdAt)}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatViewer;
