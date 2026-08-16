export interface TourStop {
  id: string;
  message: string;
  dwellMs: number;
}

export const TOUR_EVENT_BEGIN = 'tour:begin';
export const TOUR_EVENT_NARRATE = 'tour:narrate';
export const TOUR_EVENT_STATUS = 'tour:status';
export const TOUR_EVENT_STOP = 'tour:stop';

export const TOUR_STOPS: TourStop[] = [
  {
    id: 'home',
    dwellMs: 5000,
    message:
      "Hey, I'm Sunil's digital twin! Let me walk you through the site — sit back and I'll show you the highlights.",
  },
  {
    id: 'about',
    dwellMs: 4000,
    message:
      "First up, my About section — a quick intro to who I am, what I'm studying, and what I'm into.",
  },
  {
    id: 'skills',
    dwellMs: 4000,
    message:
      "Here's my Skills section — the languages, frameworks, and tools I work with, from frontend to backend and databases.",
  },
  {
    id: 'projects',
    dwellMs: 4000,
    message:
      "This is my Projects section — some of the things I've actually built. Click any card to open the full page for details.",
  },
  {
    id: 'experience',
    dwellMs: 4000,
    message:
      "Next, my Experience — the roles and practical work that shaped how I build software.",
  },
  {
    id: 'qualifications',
    dwellMs: 4000,
    message:
      "Here are my Qualifications — my degree and the certifications I've picked up along the way.",
  },
  {
    id: 'contact',
    dwellMs: 4000,
    message:
      "Last stop — the Contact section. If you'd like to reach out, this is where you can drop me an email.",
  },
  {
    id: 'home',
    dwellMs: 5000,
    message:
      "And that's the whole tour — thanks for looking around! I'll be right here in the corner if you have any questions.",
  },
];
