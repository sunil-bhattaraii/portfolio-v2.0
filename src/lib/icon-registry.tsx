import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Globe,
  Music,
  Crown as Chess,
  BookOpen,
  Gamepad2,
  Camera,
  Mountain,
  MapPin,
  Coffee,
  Sparkles,
  Briefcase,
  Star,
  Layers,
  Code2,
  Terminal,
  Database,
  Cpu,
  Binary,
  Code,
  Shield,
  GitBranch,
  FunctionSquare,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const LeetCodeIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path d="M13.483 0a1.374 1.374 0 0 0 -0.961 0.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0 -1.209 2.104 5.35 5.35 0 0 0 -0.125 0.513 5.527 5.527 0 0 0 0.062 2.362 5.83 5.83 0 0 0 0.349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193 0.039 0.038c2.248 2.165 5.852 2.133 8.063 -0.074l2.396 -2.392c0.54 -0.54 0.54 -1.414 0.003 -1.955a1.378 1.378 0 0 0 -1.951 -0.003l-2.396 2.392a3.021 3.021 0 0 1 -4.205 0.038l-0.02 -0.019 -4.276 -4.193c-0.652 -0.64 -0.972 -1.469 -0.948 -2.263a2.68 2.68 0 0 1 0.066 -0.523 2.545 2.545 0 0 1 0.619 -1.164L9.13 8.114c1.058 -1.134 3.204 -1.27 4.43 -0.278l3.501 2.831c0.593 0.48 1.461 0.387 1.94 -0.207a1.384 1.384 0 0 0 -0.207 -1.943l-3.5 -2.831c-0.8 -0.647 -1.766 -1.045 -2.774 -1.202l2.015 -2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0 -1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38 -1.382 1.38 1.38 0 0 0 -1.38 -1.382z" />
  </svg>
);

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
      fill="currentColor"
    />
  </svg>
);

/** Known social platforms + their icons. Unknown platforms fall back to Globe. */
export const SOCIAL_PLATFORMS: { platform: string; label: string }[] = [
  { platform: 'github', label: 'GitHub' },
  { platform: 'leetcode', label: 'LeetCode' },
  { platform: 'linkedin', label: 'LinkedIn' },
  { platform: 'instagram', label: 'Instagram' },
  { platform: 'facebook', label: 'Facebook' },
  { platform: 'whatsapp', label: 'WhatsApp' },
];

export function getSocialIcon(
  platform: string,
  size = 18
): React.ReactNode {
  switch (platform) {
    case 'github':
      return <Github size={size} />;
    case 'leetcode':
      return <LeetCodeIcon size={size} />;
    case 'linkedin':
      return <Linkedin size={size} />;
    case 'instagram':
      return <Instagram size={size} />;
    case 'facebook':
      return <Facebook size={size} />;
    case 'whatsapp':
      return <WhatsAppIcon size={size} />;
    default:
      return <Globe size={size} />;
  }
}

/** Hover colour for the contact variant. */
export function getSocialHoverColor(platform: string): string {
  switch (platform) {
    case 'linkedin':
      return 'hover:text-sky-500';
    case 'whatsapp':
      return 'hover:text-emerald-500';
    case 'facebook':
      return 'hover:text-blue-600';
    case 'instagram':
      return 'hover:text-pink-500';
    default:
      return 'hover:text-white';
  }
}

const LUCIDE_ICONS: Record<string, LucideIcon> = {
  Music,
  Chess,
  BookOpen,
  Gamepad2,
  Camera,
  Mountain,
  MapPin,
  Coffee,
  Sparkles,
  Briefcase,
  Star,
  Layers,
  Code2,
  Terminal,
  Database,
  Cpu,
  Binary,
  Code,
  Shield,
  GitBranch,
  Globe,
  FunctionSquare,
};

export const ICON_NAMES = Object.keys(LUCIDE_ICONS);

export function getLucideIcon(name: string): LucideIcon {
  return LUCIDE_ICONS[name] ?? Sparkles;
}
