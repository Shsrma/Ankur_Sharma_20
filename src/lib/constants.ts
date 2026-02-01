import {
  Linkedin,
  Github,
  MessageCircle,
  Instagram,
  Camera,
  Gamepad2,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

/**
 * Social media links
 * Centralized configuration to avoid hardcoding across components
 */
export const SOCIAL_LINKS = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ankur-s-52686427b',
    color: 'hsl(210, 100%, 50%)',
  },
  {
    icon: Github,
    label: 'GitHub',
    url: 'https://github.com/Shsrma',
    color: 'hsl(0, 0%, 70%)',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    url: 'https://wa.me/919414407192',
    color: 'hsl(140, 70%, 50%)',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    url: 'https://www.instagram.com/ankur__sharmaaa/',
    color: 'hsl(330, 100%, 60%)',
  },
  {
    icon: Camera,
    label: 'Snapchat',
    url: 'https://www.snapchat.com',
    color: 'hsl(55, 100%, 50%)',
  },
  {
    icon: Gamepad2,
    label: 'Discord',
    url: 'https://discord.com',
    color: 'hsl(235, 85%, 65%)',
  },
];

/**
 * Contact information
 */
export const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ankur.sharma2003920@gmail.com',
    href: 'mailto:ankur.sharma2003920@gmail.com',
    color: 'hsl(0, 100%, 65%)',
  },
  {
    icon: Mail,
    label: 'Alternate Email',
    value: 'ankur.sharma2003920@outlook.com',
    href: 'mailto:ankur.sharma2003920@outlook.com',
    color: 'hsl(210, 100%, 50%)',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 9414407192',
    href: 'tel:+919414407192',
    color: 'hsl(var(--glow-cyan))',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Jaipur, India',
    href: '#',
    color: 'hsl(var(--glow-violet))',
  },
];

/**
 * Navigation links
 */
export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Portfolio metadata
 */
export const PORTFOLIO_META = {
  title: 'Ankur Sharma - Full Stack Developer & Cybersecurity Enthusiast',
  description: 'Personal portfolio showcasing projects, skills, and certifications',
  author: 'Ankur Sharma',
  github: 'https://github.com/Shsrma',
  linkedin: 'https://www.linkedin.com/in/ankur-s-52686427b',
};
