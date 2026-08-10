export type ToolName =
  | 'scrollToSection'
  | 'openProject'
  | 'openExternalUrl'
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
    'Smoothly scrolls the single-page site to one of its sections. This is the DEFAULT action when the visitor asks to go to or see a section (projects, skills, experience, qualifications, contact, etc.) — scroll to the section and keep the chat reply brief. Portfolio data is already in your context, so never call a tool to fetch or list it. Do NOT scroll for greetings, small talk, or general questions — answer those with text only. Sections are: ' +
      SECTION_OPTIONS.join(', ') +
      '.',
    { section: { type: 'string', enum: SECTION_OPTIONS, description: 'Target section id' } },
    ['section']
  ),
  functionTool(
    'openProject',
    'Navigates the visitor to the dedicated page for ONE single project at /projects/{id} (live preview, tech stack, status, Live Site / Repository buttons, full details). Use this ONLY when the visitor names or asks to open a specific project, e.g. "show me the chess trainer project". For an overview such as "show me your projects", use scrollToSection("projects") instead — NEVER call openProject repeatedly to walk through the whole project list. Use the exact id and title from the PORTFOLIO DATA in your context.',
    {
      id: { type: 'string', description: 'The project id from PORTFOLIO DATA' },
      title: { type: 'string', description: 'The exact project title from PORTFOLIO DATA' },
    }
  ),
  functionTool(
    'openExternalUrl',
    'Opens an external URL in a new browser tab (a social profile, GitHub repository, or live project demo). ONLY works with real URLs from the PORTFOLIO DATA in your context: a project\'s liveUrl or githubUrl, or a social href. NEVER invent, guess, or reconstruct a URL — pass the exact URL from PORTFOLIO DATA. http(s) only.',
    { url: { type: 'string', description: 'The exact http(s) URL from PORTFOLIO DATA' } },
    ['url']
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
