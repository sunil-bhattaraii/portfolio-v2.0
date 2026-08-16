export type TourCorner =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left';

export interface TourStop {
  id: string;
  message: string;
  corner: TourCorner;
  dwellMs: number;
}

export const DEFAULT_CORNER: TourCorner = 'bottom-right';

export const TOUR_EVENT_BEGIN = 'tour:begin';
export const TOUR_EVENT_NARRATE = 'tour:narrate';
export const TOUR_EVENT_CORNER = 'tour:corner';
export const TOUR_EVENT_STATUS = 'tour:status';

export const TOUR_STOPS: TourStop[] = [
  {
    id: 'home',
    corner: 'bottom-right',
    dwellMs: 5000,
    message:
      "Hey, I'm Sunil's digital twin! Let me walk you through the site — I'll hop around the screen while I show you the highlights.",
  },
  {
    id: 'about',
    corner: 'bottom-left',
    dwellMs: 4000,
    message:
      "First up, my About section — a quick intro to who I am, what I'm studying, and what I'm into.",
  },
  {
    id: 'skills',
    corner: 'top-right',
    dwellMs: 4000,
    message:
      "Here's my Skills section — the languages, frameworks, and tools I work with, from frontend to backend and databases.",
  },
  {
    id: 'projects',
    corner: 'top-left',
    dwellMs: 4000,
    message:
      "This is my Projects section — some of the things I've actually built. Click any card to open the full page for details.",
  },
  {
    id: 'experience',
    corner: 'bottom-right',
    dwellMs: 4000,
    message:
      "Next, my Experience — the roles and practical work that shaped how I build software.",
  },
  {
    id: 'qualifications',
    corner: 'bottom-left',
    dwellMs: 4000,
    message:
      "Here are my Qualifications — my degree and the certifications I've picked up along the way.",
  },
  {
    id: 'contact',
    corner: 'top-right',
    dwellMs: 4000,
    message:
      "Last stop — the Contact section. If you'd like to reach out, this is where you can drop me an email.",
  },
  {
    id: 'home',
    corner: 'bottom-right',
    dwellMs: 5000,
    message:
      "And that's the whole tour — thanks for looking around! I'll be right here in the corner if you have any questions.",
  },
];
