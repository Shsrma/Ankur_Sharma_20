import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Briefcase, Users, Laptop, Globe, Database, Coffee, Mail, Linkedin, Github, MessageSquare, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { contactAPI } from '@/lib/api';
import TopMessages from '@/components/TopMessages';

// --- Types ---
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

type CategoryId = 'hiring' | 'collaboration' | 'freelance' | 'networking' | 'data' | 'casual';

interface ContactCategory {
  id: CategoryId;
  label: string;
  icon: React.ElementType;
  description: string;
  platforms: {
    name: string;
    icon: React.ElementType;
    value: string;
    href: string;
    primary?: boolean;
  }[];
  suggestedMessage: string;
  color: string;
}

// --- Data ---
const CATEGORIES: ContactCategory[] = [
  {
    id: 'hiring',
    label: 'Hiring / Recruiting',
    icon: Briefcase,
    description: 'For full-time roles, internships, or contract opportunities.',
    color: 'hsl(210, 100%, 50%)',
    platforms: [
      { name: 'LinkedIn', icon: Linkedin, value: 'Profile', href: 'https://www.linkedin.com/in/ankur-s-52686427b', primary: true },
      { name: 'Email', icon: Mail, value: 'ankurbpradhan@gmail.com', href: 'mailto:ankurbpradhan@gmail.com' },
    ],
    suggestedMessage: "Hello Ankur, I came across your portfolio and I'm reaching out regarding a potential role. I'd be happy to discuss further."
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    icon: Users,
    description: 'Interested in working together on a project?',
    color: 'hsl(270, 100%, 65%)',
    platforms: [
      { name: 'GitHub', icon: Github, value: 'Shsrma', href: 'https://github.com/Shsrma', primary: true },
      { name: 'Discord', icon: MessageSquare, value: 'ankursharma_04180', href: 'https://discord.com' },
    ],
    suggestedMessage: "Hi Ankur, I reviewed your work and would be interested in collaborating on a project. Let's discuss ideas and scope."
  },
  {
    id: 'freelance',
    label: 'Freelance',
    icon: Laptop,
    description: 'Need a developer for your next big idea?',
    color: 'hsl(140, 70%, 50%)',
    platforms: [
      { name: 'Email', icon: Mail, value: 'ankurbpradhan@gmail.com', href: 'mailto:ankurbpradhan@gmail.com?subject=Freelance%20Inquiry', primary: true },
      { name: 'WhatsApp', icon: MessageSquare, value: '+91 9414407192', href: 'https://wa.me/919414407192' },
    ],
    suggestedMessage: "Hello Ankur, I'm looking for a developer for a freelance project and would like to discuss details."
  },
  {
    id: 'networking',
    label: 'Networking',
    icon: Globe,
    description: 'Let\'s connect and grow our professional network.',
    color: 'hsl(30, 100%, 50%)',
    platforms: [
      { name: 'LinkedIn', icon: Linkedin, value: 'Connect', href: 'https://www.linkedin.com/in/ankur-s-52686427b', primary: true },
    ],
    suggestedMessage: "Hi Ankur, I'd like to connect professionally and stay in touch regarding future opportunities."
  },
  {
    id: 'data',
    label: 'Data / ML',
    icon: Database,
    description: 'Discussing datasets, models, or Kaggle competitions.',
    color: 'hsl(190, 100%, 50%)',
    platforms: [
      { name: 'Kaggle', icon: Globe, value: 'ankur20sharma', href: 'https://www.kaggle.com/ankur20sharma', primary: true },
    ],
    suggestedMessage: "Hello Ankur, I came across your Kaggle profile and would love to connect regarding data science or ML topics."
  },
  {
    id: 'casual',
    label: 'Casual',
    icon: Coffee,
    description: 'Just want to say hi? I\'m always up for a chat.',
    color: 'hsl(330, 100%, 60%)',
    platforms: [
      { name: 'Instagram', icon: Globe, value: '@ankur__sharmaaa', href: 'https://www.instagram.com/ankur__sharmaaa/', primary: true },
    ],
    suggestedMessage: "Hey Ankur, just wanted to connect and say hello 🙂"
  }
];

const Contact = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    recipient: 'both',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormError[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => prev.filter((err) => err.field !== name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors([]);

    try {
      const response = await contactAPI.submit(formData);

      if (response.success) {
        toast.success('Message sent successfully!', {
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', phone: '', message: '', recipient: 'both' });
      } else if (response.errors && response.errors.length > 0) {
        setFormErrors(response.errors);
        toast.error('Please fix the errors below');
      } else {
        toast.error(response.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(`Send failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: string) => {
    return formErrors.find((err) => err.field === fieldName)?.message;
  };

  // Helper to pre-fill message based on category
  const applySuggestedMessage = (msg: string) => {
    setFormData(prev => ({ ...prev, message: msg }));
    toast.info("Message template applied!");
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

        <div className="grid lg:grid-cols-12 gap-12 text-left">
          {/* Left Column: Category Selection (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                <span className="text-primary">01.</span>
                How would you like to connect?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CATEGORIES.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group ${selectedCategory === category.id
                        ? 'bg-primary/10 border-primary shadow-[0_0_20px_hsl(var(--glow-cyan)/0.3)]'
                        : 'bg-muted/30 border-border/50 hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3 relative z-10">
                      <div className={`p-2 rounded-lg bg-background/50 text-${category.id === 'hiring' ? 'blue' : 'primary'}-500`}>
                        <category.icon className="w-6 h-6" style={{ color: category.color }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{category.label}</h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{category.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Selected Category Details */}
              <AnimatePresence mode="wait">
                {selectedCategory && (
                  <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, height: 0, y: 20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 overflow-hidden"
                  >
                    <div className="glass-card p-6 border-primary/20">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          <span className="text-primary">Next Steps:</span>
                          {CATEGORIES.find(c => c.id === selectedCategory)?.label}
                        </h3>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        {CATEGORIES.find(c => c.id === selectedCategory)?.platforms.map((platform) => (
                          <a
                            key={platform.name}
                            href={platform.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-all group"
                          >
                            <platform.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            <div>
                              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{platform.name}</p>
                              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{platform.value}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ))}
                      </div>

                      <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Suggested Message</p>
                          <button
                            onClick={() => applySuggestedMessage(CATEGORIES.find(c => c.id === selectedCategory)?.suggestedMessage || "")}
                            className="text-xs text-primary hover:underline font-medium"
                          >
                            Use this template ↓
                          </button>
                        </div>
                        <p className="text-sm italic text-muted-foreground/80">
                          "{CATEGORIES.find(c => c.id === selectedCategory)?.suggestedMessage}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Recent Messages Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <TopMessages />
            </motion.div>
          </div>

          {/* Right Column: Contact Form (5 columns) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-24"
            >
              <div className="glass-card p-8 border-primary/10">
                <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-3">
                  <span className="text-primary">02.</span>
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div className="space-y-1">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className={`w-full px-4 py-3 rounded-xl bg-muted/50 border transition-all outline-none ${getFieldError('name') ? 'border-red-500' : 'border-border focus:border-primary'
                        }`}
                    />
                    {getFieldError('name') && <p className="text-red-500 text-xs">{getFieldError('name')}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email Address"
                      className={`w-full px-4 py-3 rounded-xl bg-muted/50 border transition-all outline-none ${getFieldError('email') ? 'border-red-500' : 'border-border focus:border-primary'
                        }`}
                    />
                    {getFieldError('email') && <p className="text-red-500 text-xs">{getFieldError('email')}</p>}
                  </div>

                  {/* Recipient */}
                  <div className="relative">
                    <select
                      name="recipient"
                      value={formData.recipient}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary outline-none appearance-none cursor-pointer"
                      aria-label="Select recipient for your message"
                    >
                      <option value="both">General (Send to Both)</option>
                      <option value="gmail">Hiring/Freelance (Gmail)</option>
                      <option value="outlook">Business/Project (Outlook)</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="How can I help you?"
                      className={`w-full px-4 py-3 rounded-xl bg-muted/50 border transition-all outline-none resize-none ${getFieldError('message') ? 'border-red-500' : 'border-border focus:border-primary'
                        }`}
                    />
                    {getFieldError('message') && <p className="text-red-500 text-xs">{getFieldError('message')}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="magnetic-button w-full text-primary-foreground gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message <Send className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
