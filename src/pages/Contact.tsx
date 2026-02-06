import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { contactAPI } from '@/lib/api';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  recipient: 'gmail' | 'outlook';
}

interface FormError {
  field: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    recipient: 'gmail', // Default to Gmail
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormError[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => prev.filter((err) => err.field !== name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors([]);

    try {
      const response = await contactAPI.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        recipient: formData.recipient,
      });

      if (response.success) {
        toast.success('Message sent successfully!', {
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else if (response.errors && response.errors.length > 0) {
        setFormErrors(response.errors);
        toast.error('Please fix the errors below');
      } else {
        toast.error(response.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An error occurred while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string) => {
    return formErrors.find((err) => err.field === fieldName)?.message;
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
          <p className="section-subtitle">Let's build something amazing together</p>
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
                {/* Name */}
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
                    className={`w-full px-4 py-3 rounded-xl bg-muted/50 border transition-all duration-300 outline-none ${getFieldError('name')
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                      }`}
                    placeholder="John Doe"
                    whileFocus={{ scale: 1.01 }}
                  />
                  {getFieldError('name') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('name')}</p>
                  )}
                </div>

                {/* Email */}
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
                    className={`w-full px-4 py-3 rounded-xl bg-muted/50 border transition-all duration-300 outline-none ${getFieldError('email')
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                      }`}
                    placeholder="john@example.com"
                    whileFocus={{ scale: 1.01 }}
                  />
                  {getFieldError('email') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('email')}</p>
                  )}
                </div>

                {/* Recipient Selection */}
                <div>
                  <label htmlFor="recipient" className="block text-sm font-medium mb-2">
                    Topic / Send To
                  </label>
                  <div className="relative">
                    <select
                      id="recipient"
                      name="recipient"
                      value={formData.recipient}
                      onChange={handleChange as any}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 outline-none appearance-none cursor-pointer"
                    >
                      <option value="gmail">General Inquiry (ankurbpradhan@gmail.com)</option>
                      <option value="outlook">Project/Business (ankurbpradhan@outlook.com)</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number (Optional)
                  </label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-muted/50 border transition-all duration-300 outline-none ${getFieldError('phone')
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                      }`}
                    placeholder="+91 9876543210"
                    whileFocus={{ scale: 1.01 }}
                  />
                  {getFieldError('phone') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('phone')}</p>
                  )}
                </div>

                {/* Message */}
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
                    className={`w-full px-4 py-3 rounded-xl bg-muted/50 border transition-all duration-300 outline-none resize-none ${getFieldError('message')
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20'
                      }`}
                    placeholder="Your message here..."
                    whileFocus={{ scale: 1.01 }}
                  />
                  {getFieldError('message') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('message')}</p>
                  )}
                </div>

                {/* Submit Button */}
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
                {CONTACT_INFO.map((item, index) => (
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
                {SOCIAL_LINKS.map((social, index) => (
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

            {/* Quick Templates */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-display font-bold mb-6 neon-text">Quick Connect</h2>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  One-click templates to start a conversation:
                </p>

                {/* WhatsApp Template */}
                <motion.a
                  href="https://wa.me/919414407192?text=Hi%20Ankur,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-4 rounded-xl border border-green-500/20 bg-green-500/10 hover:bg-green-500/20 transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-500/20 text-green-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-green-500">WhatsApp</div>
                      <div className="text-xs text-muted-foreground">"Hi Ankur, I visited your portfolio..."</div>
                    </div>
                  </div>
                </motion.a>

                {/* Email Template */}
                <motion.a
                  href="mailto:ankurbpradhan@gmail.com?subject=Portfolio%20Inquiry&body=Hi%20Ankur,%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20was%20impressed%20by%20your%20work.%20I'd%20love%20to%20discuss..."
                  className="block w-full p-4 rounded-xl border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 transition-all cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-500/20 text-blue-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-blue-500">Email Inquiry</div>
                      <div className="text-xs text-muted-foreground">Pre-filled query via Email</div>
                    </div>
                  </div>
                </motion.a>

                {/* Other Social Profiles */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <motion.a
                    href="https://www.linkedin.com/in/ankur-s-52686427b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-blue-600/20 bg-blue-600/10 hover:bg-blue-600/20 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-1.5 rounded-full bg-blue-600/20 text-blue-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </div>
                    <span className="text-sm font-medium text-blue-600">LinkedIn</span>
                  </motion.a>

                  <motion.a
                    href="https://github.com/Shsrma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-600/20 bg-gray-600/10 hover:bg-gray-600/20 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-1.5 rounded-full bg-gray-600/20 text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                    </div>
                    <span className="text-sm font-medium text-gray-600">GitHub</span>
                  </motion.a>

                  <motion.a
                    href="https://www.instagram.com/ankur__sharmaaa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-pink-500/20 bg-pink-500/10 hover:bg-pink-500/20 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-1.5 rounded-full bg-pink-500/20 text-pink-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <span className="text-sm font-medium text-pink-500">Instagram</span>
                  </motion.a>

                  <motion.a
                    href="https://www.snapchat.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-yellow-400/20 bg-yellow-400/10 hover:bg-yellow-400/20 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-1.5 rounded-full bg-yellow-400/20 text-yellow-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <span className="text-sm font-medium text-yellow-500">Snapchat</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
