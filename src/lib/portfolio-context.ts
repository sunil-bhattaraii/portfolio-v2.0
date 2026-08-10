import {
  getSiteConfig,
  getSkills,
  getProjects,
  getExperience,
  getQualifications,
  getSocials,
} from './queries';

/**
 * Builds a compact, structured block of all portfolio data. It is embedded in
 * the system prompt on every chat turn so the model can answer questions
 * directly from context instead of calling data-fetch tools. Kept deliberately
 * small: short structured lines, no prose bloat.
 */
export async function buildPortfolioContext(): Promise<string> {
  const [site, skills, projects, experience, qualifications, socials] =
    await Promise.all([
      getSiteConfig(),
      getSkills(),
      getProjects(),
      getExperience(),
      getQualifications(),
      getSocials(),
    ]);

  const lines: string[] = [
    'PORTFOLIO DATA — authoritative and always current. Answer questions about Sunil directly from this data. It is already available here on every message, so NEVER call a tool to fetch any of it.',
    '',
  ];

  if (site) {
    const hero = site.hero ?? {};
    lines.push('SITE:');
    if (hero.name || hero.role) {
      lines.push(`- name: ${hero.name ?? ''} | role: ${hero.role ?? ''}`);
    }
    const intro = site.about?.intro ?? [];
    if (intro.length) lines.push(`- about: ${intro.join(' ')}`);
    const facts = (site.about?.facts ?? []).filter(
      (f) => f.label && f.value
    );
    if (facts.length) {
      lines.push(
        `- facts: ${facts.map((f) => `${f.label}: ${f.value}`).join(' | ')}`
      );
    }
    const hobbies = (site.about?.hobbies ?? [])
      .map((h) => h.title)
      .filter(Boolean);
    if (hobbies.length) lines.push(`- hobbies: ${hobbies.join(', ')}`);
    const contact = site.contact ?? {};
    if (contact.email || contact.phone || contact.location) {
      lines.push(
        `- contact: email ${contact.email || '-'} | phone ${contact.phone || '-'} | location ${contact.location || '-'}`
      );
    }
    lines.push('');
  }

  if (skills.length) {
    lines.push('SKILLS (name | level | highlighted):');
    for (const s of skills) {
      lines.push(`- ${s.name} | ${s.level} | ${s.highlight ? 'yes' : 'no'}`);
    }
    lines.push('');
  }

  if (projects.length) {
    lines.push('PROJECTS (id | title | status | tech | live | github):');
    for (const p of projects) {
      lines.push(
        `- id: ${p.id} | title: ${p.title} | status: ${p.status} | tech: ${p.techStack.join(', ')} | live: ${p.liveUrl || '-'} | github: ${p.githubUrl || '-'}`
      );
      if (p.description) lines.push(`  description: ${p.description}`);
      if (p.fullDetails) lines.push(`  details: ${p.fullDetails}`);
    }
    lines.push('');
  }

  if (experience.length) {
    lines.push('EXPERIENCE (role | company | duration):');
    for (const e of experience) {
      lines.push(
        `- ${e.role} | ${e.company} | ${e.duration}`
      );
      if (e.description.length) {
        lines.push(`  highlights: ${e.description.join('; ')}`);
      }
      if (e.skills.length) {
        lines.push(`  skills: ${e.skills.join(', ')}`);
      }
    }
    lines.push('');
  }

  if (qualifications.length) {
    lines.push('QUALIFICATIONS (title | institute | year | type):');
    for (const q of qualifications) {
      lines.push(
        `- ${q.title} | ${q.institute} | ${q.year} | ${q.type}`
      );
      if (q.details) lines.push(`  details: ${q.details}`);
    }
    lines.push('');
  }

  if (socials.length) {
    lines.push('SOCIALS (platform | href):');
    for (const s of socials) {
      lines.push(`- ${s.platform}: ${s.href}`);
    }
    lines.push('');
  }

  return lines.join('\n').trim();
}
