import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-border/50">
      {/* Gradient glow */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, hsl(var(--glow-cyan) / 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <span className="text-primary-foreground">A</span>
              </div>
              <span className="font-display font-semibold text-lg neon-text">ANKUR SHARMA</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Software Engineer & Web Developer passionate about building innovative solutions 
              with modern technologies.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-display font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Projects', path: '/projects' },
                { name: 'Certifications', path: '/certifications' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-display font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, url: 'https://www.linkedin.com/in/ankur-s-52686427b', color: 'hsl(210, 100%, 50%)' },
                { icon: Github, url: 'https://github.com/Shsrma', color: 'hsl(0, 0%, 70%)' },
                { icon: Mail, url: 'mailto:ankur.sharma2003920@gmail.com', color: 'hsl(0, 100%, 65%)' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: `0 0 20px ${social.color}60`,
                  }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {currentYear} Ankur Sharma. Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> and code.
          </p>
          <p className="text-xs text-muted-foreground">
            Software Engineer | Web Developer | ML Enthusiast
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
