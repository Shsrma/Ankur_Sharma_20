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
  recipient: 'gmail' | 'outlook' | 'both';
}

interface FormError {
  field: string;
  message: string;
}

const CollapsibleSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border/50 rounded-xl bg-muted/30 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left font-semibold text-primary/90 hover:bg-muted/50 transition-colors"
      >
        <span className="text-lg flex items-center gap-2">{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0 border-t border-border/50">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const CollapsibleMessage = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-background/50 rounded-lg border border-border/50 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 p-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-primary transition-colors"
      >
        <span>💬 Suggested message</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="p-3 pt-0 text-sm italic text-muted-foreground/80">{children}</p>
      </motion.div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    recipient: 'both', // Default to Both
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
        setFormData({ name: '', email: '', phone: '', message: '', recipient: 'gmail' });
      } else if (response.errors && response.errors.length > 0) {
        setFormErrors(response.errors);
        toast.error('Please fix the errors below');
      } else {
        toast.error(response.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Show the actual error message if available, otherwise generic
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(`Send failed: ${errorMessage}. Check console for details.`);
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
          {/* Contact Info (Now First/Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            <div className="glass-card p-8">
              <h2 className="text-2xl font-display font-bold mb-2 neon-text">Connect With Me</h2>
              <p className="text-sm text-muted-foreground mb-6">Choose what best describes why you’re reaching out.</p>

              <div className="space-y-8">

                {/* Hiring / Recruiting */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary/90 flex items-center gap-2">
                    <span className="text-xl">👔</span> Hiring / Recruiting
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50 space-y-4">
                    <p className="text-sm font-medium text-foreground">Best platforms: LinkedIn · Email</p>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-foreground font-semibold">LinkedIn</p>
                        <p className="text-sm text-muted-foreground">Review my professional background and discuss full-time, internship, or contract opportunities.</p>
                        <a href="https://www.linkedin.com/in/ankur-s-52686427b" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1 text-xs text-blue-500 hover:underline">
                          🔗 LinkedIn Profile
                        </a>
                      </div>

                      <div>
                        <p className="text-sm text-foreground font-semibold">Email</p>
                        <p className="text-sm text-muted-foreground">For formal hiring discussions, role details, or interview coordination.</p>
                        <div className="flex gap-2 mt-1">
                          <a href="mailto:ankurbpradhan@gmail.com?subject=Hiring%20Opportunity&body=Hello%20Ankur,%20I%20came%20across%20your%20portfolio%20and%20I%E2%80%99m%20reaching%20out%20regarding%20a%20potential%20role%20or%20opportunity.%20I%E2%80%99d%20be%20happy%20to%20discuss%20further." className="text-xs text-red-500 hover:underline">📧 ankurbpradhan@gmail.com</a>
                        </div>
                        <div className="flex gap-2 mt-0.5">
                          <a href="mailto:ankurbpradhan@outlook.com?subject=Hiring%20Opportunity&body=Hello%20Ankur,%20I%20came%20across%20your%20portfolio%20and%20I%E2%80%99m%20reaching%20out%20regarding%20a%20potential%20role%20or%20opportunity.%20I%E2%80%99d%20be%20happy%20to%20discuss%20further." className="text-xs text-blue-500 hover:underline">📧 ankurbpradhan@outlook.com</a>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background/50 p-3 rounded-lg border border-border/50">
                      <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Suggested message</p>
                      <p className="text-sm italic text-muted-foreground/80">"Hello Ankur, I came across your portfolio and I’m reaching out regarding a potential role or opportunity. I’d be happy to discuss further."</p>
                    </div>
                  </div>
                </div>

                {/* Collaboration */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary/90 flex items-center gap-2">
                    <span className="text-xl">🤝</span> Collaboration
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50 space-y-4">
                    <p className="text-sm font-medium text-foreground">Best platforms: GitHub · Discord · Email</p>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-foreground font-semibold">GitHub</p>
                        <p className="text-sm text-muted-foreground">Review my work, code quality, and approach to collaboration.</p>
                        <a href="https://github.com/Shsrma" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1 text-xs text-primary hover:underline">
                          🔗 GitHub Profile
                        </a>
                      </div>

                      <div>
                        <p className="text-sm text-foreground font-semibold">Discord</p>
                        <p className="text-sm text-muted-foreground">Best for ongoing technical discussions and teamwork.</p>
                        <span className="text-xs text-indigo-400 select-all cursor-copy">🎮 ankursharma_04180</span>
                      </div>

                      <div>
                        <p className="text-sm text-foreground font-semibold">Email</p>
                        <p className="text-sm text-muted-foreground">For collaboration proposals and planning.</p>
                        <a href="mailto:ankurbpradhan@gmail.com?subject=Collaboration&body=Hi%20Ankur,%20I%20reviewed%20your%20work%20and%20would%20be%20interested%20in%20collaborating%20on%20a%20project.%20Let%E2%80%99s%20discuss%20ideas%20and%20scope." className="text-xs text-red-500 hover:underline">📧 ankurbpradhan@gmail.com</a>
                      </div>
                    </div>

                    <div className="bg-background/50 p-3 rounded-lg border border-border/50">
                      <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Suggested message</p>
                      <p className="text-sm italic text-muted-foreground/80">"Hi Ankur, I reviewed your work and would be interested in collaborating on a project. Let’s discuss ideas and scope."</p>
                    </div>
                  </div>
                </div>

                {/* Freelance Work */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary/90 flex items-center gap-2">
                    <span className="text-xl">💼</span> Freelance Work
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50 space-y-4">
                    <p className="text-sm font-medium text-foreground">Best platforms: Email · WhatsApp</p>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-foreground font-semibold">Email</p>
                        <p className="text-sm text-muted-foreground">Share project requirements, timelines, and scope.</p>
                        <a href="mailto:ankurbpradhan@gmail.com?subject=Freelance%20Project&body=Hello%20Ankur,%20I%E2%80%99m%20looking%20for%20a%20developer%20for%20a%20freelance%20project%20and%20would%20like%20to%20discuss%20details." className="text-xs text-red-500 hover:underline">📧 ankurbpradhan@gmail.com</a>
                      </div>

                      <div>
                        <p className="text-sm text-foreground font-semibold">WhatsApp</p>
                        <p className="text-sm text-muted-foreground">For quick clarifications or time-sensitive questions.</p>
                        <a href="https://wa.me/919414407192?text=Hello%20Ankur,%20I%E2%80%99m%20looking%20for%20a%20developer%20for%20a%20freelance%20project%20and%20would%20like%20to%20discuss%20details." target="_blank" rel="noopener noreferrer" className="text-xs text-green-500 hover:underline">📱 +91 9414407192</a>
                      </div>
                    </div>

                    <div className="bg-background/50 p-3 rounded-lg border border-border/50">
                      <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Suggested message</p>
                      <p className="text-sm italic text-muted-foreground/80">"Hello Ankur, I’m looking for a developer for a freelance project and would like to discuss details."</p>
                    </div>
                  </div>
                </div>

                {/* Networking */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary/90 flex items-center gap-2">
                    <span className="text-xl">🌐</span> Networking
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50 space-y-4">
                    <p className="text-sm font-medium text-foreground">Best platform: LinkedIn</p>

                    <div>
                      <p className="text-sm text-foreground font-semibold">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">Ideal for professional networking and long-term opportunities.</p>
                      <a href="https://www.linkedin.com/in/ankur-s-52686427b" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1 text-xs text-blue-500 hover:underline">
                        🔗 LinkedIn Profile
                      </a>
                    </div>

                    <div className="bg-background/50 p-3 rounded-lg border border-border/50">
                      <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Suggested message</p>
                      <p className="text-sm italic text-muted-foreground/80">"Hi Ankur, I’d like to connect professionally and stay in touch regarding future opportunities."</p>
                    </div>
                  </div>
                </div>

                {/* Data / ML */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary/90 flex items-center gap-2">
                    <span className="text-xl">📊</span> Data / ML
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50 space-y-4">
                    <p className="text-sm font-medium text-foreground">Best platform: Kaggle</p>

                    <div>
                      <p className="text-sm text-foreground font-semibold">Kaggle</p>
                      <p className="text-sm text-muted-foreground">Explore my work with datasets, models, and experiments.</p>
                      <a href="https://www.kaggle.com/ankur20sharma" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1 text-xs text-cyan-500 hover:underline">
                        🔗 Kaggle Profile
                      </a>
                    </div>

                    <div className="bg-background/50 p-3 rounded-lg border border-border/50">
                      <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Suggested message</p>
                      <p className="text-sm italic text-muted-foreground/80">"Hello Ankur, I came across your Kaggle profile and would love to connect regarding data science or ML topics."</p>
                    </div>
                  </div>
                </div>

                {/* Casual */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary/90 flex items-center gap-2">
                    <span className="text-xl">👋</span> Casual
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50 space-y-4">
                    <p className="text-sm font-medium text-foreground">Best platforms: Instagram · Snapchat</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-foreground font-semibold">Instagram</p>
                        <p className="text-sm text-muted-foreground">Occasional updates, projects, and milestones.</p>
                        <a href="https://www.instagram.com/ankur__sharmaaa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-1 text-xs text-pink-500 hover:underline">
                          🔗 Instagram
                        </a>
                      </div>
                      <div>
                        <p className="text-sm text-foreground font-semibold">Snapchat</p>
                        <p className="text-sm text-muted-foreground">For informal conversations.</p>
                        <span className="text-xs text-yellow-500">👻 asharma231231</span>
                      </div>
                    </div>

                    <div className="bg-background/50 p-3 rounded-lg border border-border/50">
                      <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Suggested message</p>
                      <p className="text-sm italic text-muted-foreground/80">"Hey Ankur, just wanted to connect and say hello 🙂"</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50 text-center">
                  <p className="text-sm font-medium text-muted-foreground italic">
                    "Choose the platform that best fits your purpose — I’m always open to meaningful conversations."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form (Now Second/Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
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
                      <option value="both">General / Not Sure (Send to Both)</option>
                      <option value="gmail">General Inquiry (Gmail Only)</option>
                      <option value="outlook">Project/Business (Outlook Only)</option>
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
        </div>
      </div>
    </div>
  );
}

export default Contact;
