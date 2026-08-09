import {
  getAIInstruction,
  getSiteConfig,
  getSkills,
  getProjects,
  getExperience,
  getQualifications,
  getSocials,
} from './queries';

/**
 * The persona prompt is built from two concatenated parts:
 *  1. INSTRUCTION — the text that tells the LLM who it is and how to behave.
 *                   Editable from the admin panel (falls back to a default).
 *  2. CONTEXT     — the portfolio's real data (projects, skills, certifications,
 *                   experience, socials, contact…) condensed to the essentials.
 *
 * The context is fetched from Mongo ONCE and cached server-side for TTL_MS, so it
 * is rebuilt only once per "context" instead of on every chat message. The
 * instruction is read fresh each message so admin edits apply immediately.
 */

const TTL_MS = 10 * 60 * 1000; // 10 minutes

function condense(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length > max ? `${clean.slice(0, max).trimEnd()}…` : clean;
}

async function buildContext(): Promise<string> {
  const [config, skills, projects, experiences, qualifications, socials] =
    await Promise.all([
      getSiteConfig(),
      getSkills(),
      getProjects(),
      getExperience(),
      getQualifications(),
      getSocials(),
    ]);

  const lines: string[] = [];

  const hero = config?.hero;
  if (hero?.name || hero?.role) {
    lines.push(`PROFILE: ${hero.name ?? ''} — ${hero.role ?? ''}.`);
  }

  const contact = config?.contact;
  if (contact && (contact.email || contact.phone || contact.location)) {
    lines.push(
      `CONTACT: ${[
        contact.email && `email ${contact.email}`,
        contact.phone && `phone ${contact.phone}`,
        contact.location && `location ${contact.location}`,
      ]
        .filter(Boolean)
        .join(', ')}.`
    );
  }

  const intro = (config?.about?.intro ?? []).join(' ');
  if (intro) lines.push(`ABOUT: ${condense(intro, 400)}`);

  const facts = (config?.about?.facts ?? [])
    .map((f) => `${f.label}: ${f.value}`)
    .filter(Boolean)
    .join('; ');
  if (facts) lines.push(`QUICK FACTS: ${facts}.`);

  const hobbies = (config?.about?.hobbies ?? [])
    .map((h) => h.title)
    .filter(Boolean)
    .join(', ');
  if (hobbies) lines.push(`HOBBIES: ${hobbies}.`);

  if (skills.length > 0) {
    const featured = skills
      .filter((s) => s.highlight)
      .map((s) => `${s.name} (${s.level})`)
      .join(', ');
    if (featured) lines.push(`HIGHLIGHT SKILLS: ${featured}.`);
    lines.push(`ALL SKILLS: ${skills.map((s) => s.name).join(', ')}.`);
  }

  if (projects.length > 0) {
    const projectLines = projects.map((p) => {
      const tech = p.techStack?.length ? ` (tech: ${p.techStack.join(', ')})` : '';
      const status = p.status ? ` [${p.status}]` : '';
      return `- ${p.title}${status}: ${condense(p.description ?? '', 140)}${tech}`;
    });
    lines.push(`PROJECTS:\n${projectLines.join('\n')}`);
  }

  if (experiences.length > 0) {
    const expLines = experiences.map((e) => {
      const bullets = (e.description ?? [])
        .slice(0, 3)
        .map((b) => condense(b, 90))
        .join('; ');
      return `- ${e.role} @ ${e.company} (${e.duration})${bullets ? `: ${bullets}` : ''}`;
    });
    lines.push(`EXPERIENCE:\n${expLines.join('\n')}`);
  }

  if (qualifications.length > 0) {
    const qualLines = qualifications.map((q) => {
      const details = q.details ? `: ${condense(q.details, 90)}` : '';
      return `- ${q.title} @ ${q.institute} (${q.year}, ${q.type ?? 'degree'})${details}`;
    });
    lines.push(`QUALIFICATIONS:\n${qualLines.join('\n')}`);
  }

  if (socials.length > 0) {
    lines.push(
      `SOCIALS: ${socials
        .map((s) => `${s.platform} — ${s.href}`)
        .join(' | ')}.`
    );
  }

  if (lines.length === 0) {
    return '';
  }

  return `--- PORTFOLIO CONTEXT (real site data) ---\n${lines.join('\n')}`;
}

let contextCache: { context: string; builtAt: number } | null = null;

/** Returns the condensed portfolio context, built once per TTL window. */
export async function getAIContext(): Promise<string> {
  if (contextCache && Date.now() - contextCache.builtAt < TTL_MS) {
    return contextCache.context;
  }
  const context = await buildContext();
  contextCache = { context, builtAt: Date.now() };
  return context;
}

/** Full system prompt = INSTRUCTION + CONTEXT (concatenated). */
export async function getAIPrompt(): Promise<string> {
  const [instruction, context] = await Promise.all([
    getAIInstruction(),
    getAIContext(),
  ]);
  return `${instruction}\n\n${context}`.trim();
}
