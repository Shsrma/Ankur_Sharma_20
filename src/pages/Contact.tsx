import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github, MessageCircle, Instagram, Camera, Gamepad2 } from 'lucide-react';
import { toast } from 'sonner';

const contactInfo = [
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

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/ankur-s-52686427b', color: 'hsl(210, 100%, 50%)' },
  { icon: Github, label: 'GitHub', url: 'https://github.com/Shsrma', color: 'hsl(0, 0%, 70%)' },
  { icon: MessageCircle, label: 'WhatsApp', url: 'https://wa.me/919414407192', color: 'hsl(140, 70%, 50%)' },
  { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/ankur__sharmaaa/', color: 'hsl(330, 100%, 60%)' },
  { icon: Camera, label: 'Snapchat', url: '#', color: 'hsl(55, 100%, 50%)' },
  { icon: Gamepad2, label: 'Discord', url: '#', color: 'hsl(235, 85%, 65%)' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent successfully!', {
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title">Get In Touch</h1>
          <p className="section-subtitle">
            Let's build something amazing together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="glass-card p-8">
              <h2 className="text-2xl font-display font-bold mb-6 neon-text">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none"
                    placeholder="John Doe"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none"
                    placeholder="john@example.com"
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none resize-none"
                    placeholder="Your message here..."
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="magnetic-button w-full text-primary-foreground gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-8"
          >
            {/* Direct Contact */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-display font-bold mb-6 neon-text">Direct Contact</h2>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                    style={{ background: 'var(--glass-bg)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: `0 0 20px ${item.color}40`,
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{ 
                        background: item.color,
                        boxShadow: `0 0 20px ${item.color}40`,
                      }}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <div className="font-medium group-hover:text-primary transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-display font-bold mb-6 neon-text">Connect With Me</h2>
              
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 group"
                    style={{ background: 'var(--glass-bg)' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.08 }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -5,
                    }}
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.boxShadow = `0 0 30px ${social.color}60`;
                      target.style.borderColor = social.color;
                    }}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget as HTMLElement;
                      target.style.boxShadow = 'none';
                      target.style.borderColor = 'transparent';
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{ background: social.color }}
                    >
                      <social.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
