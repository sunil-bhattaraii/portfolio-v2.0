export type ToolName =
  | 'scrollToSection'
  | 'openProject'
  | 'closeProjectModal'
  | 'openExternalUrl'
  | 'getProjects'
  | 'getSkills'
  | 'getExperience'
  | 'getQualifications'
  | 'getSocials'
  | 'getSiteConfig'
  | 'sendEmail';

const SECTION_OPTIONS = [
  'home',
  'about',
  'skills',
  'experience',
  'qualifications',
  'projects',
  'contact',
];

const functionTool = (
  name: string,
  description: string,
  properties: Record<string, unknown> = {},
  required: string[] = []
) => ({
  type: 'function' as const,
  function: {
    name,
    description,
    parameters: {
      type: 'object',
      properties,
      required,
    },
  },
});

export const CHAT_TOOLS = [
  functionTool(
    'scrollToSection',
    'Smoothly scrolls the single-page site to one of its sections. This is the DEFAULT action when the visitor asks about a section (projects, skills, experience, qualifications, contact, etc.) — scroll to the section and keep the chat reply brief, without dumping the section data into the chat. Only fetch and show the data in the chat (getProjects, getSkills, etc.) when the visitor explicitly asks for the details or a list. Sections are: ' +
      SECTION_OPTIONS.join(', ') +
      '.',
    { section: { type: 'string', enum: SECTION_OPTIONS, description: 'Target section id' } },
    ['section']
  ),
  functionTool(
    'openProject',
    'Opens a specific project details modal in the Projects section (scrolls there and opens the card). If a project modal is already open, close it first with closeProjectModal. Call getProjects first to find the exact project id or title.',
    {
      id: { type: 'string', description: 'The project id from getProjects' },
      title: { type: 'string', description: 'The exact project title from getProjects' },
    }
  ),
  functionTool(
    'closeProjectModal',
    'Closes the currently open project details modal, if any. Use it when the visitor asks to close the modal or before opening a different project.',
    {}
  ),
  functionTool(
    'openExternalUrl',
    'Opens an external URL in a new browser tab, e.g. a social profile, GitHub repository, or live project demo. Only allow http:// and https:// URLs.',
    { url: { type: 'string', description: 'The http(s) URL to open' } },
    ['url']
  ),
  functionTool(
    'getProjects',
    'Fetches the portfolio projects from the database on demand: titles, descriptions, tech stacks, status, github and live links. Call this instead of guessing about projects.',
    {}
  ),
  functionTool(
    'getSkills',
    'Fetches the portfolio skills from the database on demand: names, levels, and highlighted skills. Call this instead of guessing about skills.',
    {}
  ),
  functionTool(
    'getExperience',
    'Fetches the work experience entries from the database on demand: role, company, duration, and key responsibilities. Call this instead of guessing about experience.',
    {}
  ),
  functionTool(
    'getQualifications',
    'Fetches the qualifications from the database on demand: degrees, institutes, and years. Call this instead of guessing about education.',
    {}
  ),
  functionTool(
    'getSocials',
    'Fetches Sunil social media links from the database on demand. Use this before offering social profiles, then open the link with openExternalUrl.',
    {}
  ),
  functionTool(
    'getSiteConfig',
    'Fetches the site configuration on demand: hero name/role, contact email/phone/location, and about text. Call this for contact or profile details.',
    {}
  ),
  functionTool(
    'sendEmail',
    'Sends an email to Sunil through the contact form service. IMPORTANT: first ask the visitor for their name, email address, and message, then summarize and get their explicit confirmation before calling this tool. Returns success or failure.',
    {
      name: { type: 'string', description: 'The visitor name' },
      email: { type: 'string', description: 'The visitor email address' },
      message: { type: 'string', description: 'The message content' },
    },
    ['name', 'email', 'message']
  ),
];
