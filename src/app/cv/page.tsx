import React from 'react';
import type { Metadata } from 'next';
import './cv.css';
import CvToolbar from '@/components/cv/CvToolbar';
import {
  getSiteConfig,
  getExperience,
  getQualifications,
  getSkills,
  getProjects,
  getSocials,
} from '@/lib/queries';
import type { Skill, Social } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'CV',
};

function cleanUrl(href: string): string {
  try {
    const url = new URL(href);
    return `${url.host}${url.pathname.replace(/\/+$/, '')}`;
  } catch {
    return href.replace(/^https?:\/\//, '').replace(/\/+$/, '');
  }
}

interface SkillGroup {
  category: string;
  items: string[];
}

function groupSkills(skills: Skill[]): SkillGroup[] {
  const order: string[] = [];
  const map = new Map<string, string[]>();
  for (const skill of skills) {
    const category = skill.categories?.[0] || 'Other';
    if (!map.has(category)) {
      map.set(category, []);
      order.push(category);
    }
    map.get(category)!.push(skill.name);
  }
  return order.map((category) => ({ category, items: map.get(category)! }));
}

function ContactSeparator() {
  return <span className="cv-contact-sep">•</span>;
}

const CvPage: React.FC = async () => {
  const [config, experience, qualifications, skills, projects, socials] =
    await Promise.all([
      getSiteConfig(),
      getExperience(),
      getQualifications(),
      getSkills(),
      getProjects(),
      getSocials(),
    ]);

  const hero = config?.hero ?? { name: '', role: '' };
  const contact = config?.contact ?? { email: '', phone: '', location: '' };
  const intro = (config?.about?.intro ?? []).join(' ').trim();

  const telHref = contact.phone
    ? `tel:${contact.phone.replace(/[^+\d]/g, '')}`
    : '';
  const hasContact =
    Boolean(contact.email) || Boolean(contact.phone) || Boolean(contact.location);
  const socialsList: Social[] = socials ?? [];
  const skillGroups = groupSkills(skills ?? []);

  return (
    <main className="cv-page">
      <CvToolbar />
      <article className="cv-paper">
        <header className="cv-header">
          <h1 className="cv-name">{hero.name}</h1>
          {hero.role && <p className="cv-role">{hero.role}</p>}

          {hasContact && (
            <div className="cv-contact">
              {contact.email && (
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              )}
              {contact.email && contact.phone && <ContactSeparator />}
              {contact.phone && <a href={telHref}>{contact.phone}</a>}
              {contact.phone && contact.location && <ContactSeparator />}
              {contact.location && <span>{contact.location}</span>}
            </div>
          )}

          {socialsList.length > 0 && (
            <div className="cv-links">
              {socialsList.map((social, index) => (
                <React.Fragment key={social.id ?? social.href}>
                  {index > 0 && <ContactSeparator />}
                  <a href={social.href} rel="noopener noreferrer">
                    {cleanUrl(social.href)}
                  </a>
                </React.Fragment>
              ))}
            </div>
          )}
        </header>

        {intro && (
          <section className="cv-section">
            <h2 className="cv-section-title">Profile</h2>
            <p className="cv-summary">{intro}</p>
          </section>
        )}

        {skillGroups.length > 0 && (
          <section className="cv-section">
            <h2 className="cv-section-title">Technical Skills</h2>
            {skillGroups.map((group) => (
              <p key={group.category} className="cv-skill-group">
                <span className="cv-skill-cat">{group.category}:</span>{' '}
                {group.items.join(', ')}
              </p>
            ))}
          </section>
        )}

        {experience.length > 0 && (
          <section className="cv-section">
            <h2 className="cv-section-title">Experience</h2>
            {experience.map((exp, index) => (
              <div className="cv-item" key={exp.id ?? index}>
                <div className="cv-item-head">
                  <h3>{exp.role}</h3>
                  {exp.duration && (
                    <span className="cv-item-dates">{exp.duration}</span>
                  )}
                </div>
                {exp.company && <div className="cv-item-sub">{exp.company}</div>}
                {exp.description.length > 0 && (
                  <ul>
                    {exp.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
                {exp.skills.length > 0 && (
                  <div className="cv-item-skills">
                    <span className="cv-skill-cat">Skills:</span>{' '}
                    {exp.skills.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section className="cv-section">
            <h2 className="cv-section-title">Projects</h2>
            {projects.map((project, index) => (
              <div className="cv-item" key={project.id ?? index}>
                <div className="cv-item-head">
                  <h3>{project.title}</h3>
                  <span className="cv-item-dates">{project.status}</span>
                </div>
                {project.techStack.length > 0 && (
                  <div className="cv-item-sub">{project.techStack.join(', ')}</div>
                )}
                {project.description && <p>{project.description}</p>}
                {(project.githubUrl || project.liveUrl) && (
                  <div className="cv-item-links">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {cleanUrl(project.liveUrl)}
                      </a>
                    )}
                    {project.liveUrl && project.githubUrl && (
                      <span className="cv-contact-sep"> • </span>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {cleanUrl(project.githubUrl)}
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {qualifications.length > 0 && (
          <section className="cv-section">
            <h2 className="cv-section-title">Education</h2>
            {qualifications.map((qualification, index) => (
              <div className="cv-item" key={qualification.id ?? index}>
                <div className="cv-item-head">
                  <h3>{qualification.title}</h3>
                  {qualification.year && (
                    <span className="cv-item-dates">{qualification.year}</span>
                  )}
                </div>
                <div className="cv-item-sub">{qualification.institute}</div>
                {qualification.details && <p>{qualification.details}</p>}
              </div>
            ))}
          </section>
        )}
      </article>
    </main>
  );
};

export default CvPage;
