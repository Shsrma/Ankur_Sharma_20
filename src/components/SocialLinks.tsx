import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MessageCircle } from 'lucide-react';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/ankur-s-52686427b',
    icon: <Linkedin className="w-5 h-5" />,
    color: 'hsl(210, 100%, 50%)',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Shsrma',
    icon: <Github className="w-5 h-5" />,
    color: 'hsl(0, 0%, 70%)',
  },
  {
    name: 'Email',
    url: 'mailto:ankur.sharma2003920@gmail.com',
    icon: <Mail className="w-5 h-5" />,
    color: 'hsl(0, 100%, 65%)',
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/919414407192',
    icon: <MessageCircle className="w-5 h-5" />,
    color: 'hsl(140, 70%, 50%)',
  },
  {
    name: 'Phone',
    url: 'tel:+919414407192',
    icon: <Phone className="w-5 h-5" />,
    color: 'hsl(var(--glow-cyan))',
  },
];

interface SocialLinksProps {
  variant?: 'default' | 'expanded';
}

const SocialLinks = ({ variant = 'default' }: SocialLinksProps) => {
  return (
    <div className={`flex ${variant === 'expanded' ? 'gap-4' : 'gap-3'}`}>
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative flex items-center justify-center rounded-xl transition-all duration-300 ${
            variant === 'expanded' ? 'w-12 h-12' : 'w-10 h-10'
          }`}
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--glass-border)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{
            scale: 1.15,
            y: -5,
          }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.background = link.color;
            target.style.boxShadow = `0 0 30px ${link.color}80, 0 0 60px ${link.color}40`;
            target.style.borderColor = link.color;
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.background = 'var(--glass-bg)';
            target.style.boxShadow = 'none';
            target.style.borderColor = 'var(--glass-border)';
          }}
          aria-label={link.name}
        >
          <span className="text-foreground transition-colors duration-300">
            {link.icon}
          </span>
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;
