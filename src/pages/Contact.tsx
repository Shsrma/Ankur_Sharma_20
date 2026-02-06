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
              <h2 className="text-2xl font-display font-bold mb-6 neon-text">Connect With Me</h2>
              <div className="space-y-8">

                {/* Hiring / Recruiting */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary/90 flex items-center gap-2">
                    <span className="text-xl">👔</span> If You’re Hiring / Recruiting
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <p className="text-sm text-foreground mb-1 font-medium">Best platforms: LinkedIn · Email</p>
                    <div className="text-sm text-muted-foreground mb-3 space-y-2">
                      <p><strong className="text-foreground">LinkedIn:</strong> If you’re a recruiter or hiring manager, LinkedIn is the best place to review my professional background and discuss full-time, internship, or contract opportunities.</p>
                      <p><strong className="text-foreground">Email:</strong> For formal hiring discussions, role details, or interview coordination, email is the most reliable way to reach me.</p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <a href="https://www.linkedin.com/in/ankur-s-52686427b" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-600 border border-blue-600/20 hover:bg-blue-600/20 transition-colors">LinkedIn Profile</a>
                      <a
                        href="mailto:ankurbpradhan@gmail.com?subject=Hiring%20Opportunity&body=Hello%20Ankur,%20I%20came%20across%20your%20portfolio%20and%20I%E2%80%99m%20reaching%20out%20regarding%20a%20potential%20full-time,%20internship,%20or%20contract%20opportunity.%20I%E2%80%99d%20like%20to%20discuss%20your%20experience%20and%20explore%20whether%20there%E2%80%99s%20a%20fit."
                        className="text-xs px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                      >
                        Email (Recruiting)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Collaboration */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary/90 flex items-center gap-2">
                    <span className="text-xl">🤝</span> If You Want to Collaborate on a Project
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <p className="text-sm text-foreground mb-1 font-medium">Best platforms: GitHub · Discord · Email</p>
                    <div className="text-sm text-muted-foreground mb-3 space-y-2">
                      <p><strong className="text-foreground">GitHub:</strong> If you’re interested in collaborating, contributing, or reviewing my work, GitHub reflects my approach to code quality, structure, and real-world problem-solving.</p>
                      <p><strong className="text-foreground">Discord:</strong> Discord works well for ongoing collaboration, technical discussions, and team-based project communication.</p>
                      <p><strong className="text-foreground">Email:</strong> For collaboration proposals or project planning, feel free to reach out via email with relevant details.</p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <a href="https://github.com/Shsrma" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-full bg-gray-600/10 text-gray-600 border border-gray-600/20 hover:bg-gray-600/20 transition-colors">GitHub</a>
                      <span className="text-xs px-3 py-1.5 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 select-all cursor-copy" title="Click to select">Discord: ankursharma_04180</span>
                      <a
                        href="mailto:ankurbpradhan@gmail.com?subject=Collaboration%20Proposal&body=Hi%20Ankur,%20I%20reviewed%20your%20work%20and%20I%E2%80%99m%20interested%20in%20collaborating%20on%20a%20technical%20project.%20I%E2%80%99d%20like%20to%20discuss%20ideas,%20scope,%20and%20how%20we%20could%20work%20together%20effectively."
                        className="text-xs px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                      >
                        Email (Proposals)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Freelancer */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary/90 flex items-center gap-2">
                    <span className="text-xl">💼</span> If You’re Looking for a Freelancer
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <p className="text-sm text-foreground mb-1 font-medium">Best platforms: Email · WhatsApp</p>
                    <div className="text-sm text-muted-foreground mb-3 space-y-2">
                      <p><strong className="text-foreground">Email:</strong> If you’re looking for a developer for freelance or short-term work, email is ideal for sharing project requirements, timelines, and scope.</p>
                      <p><strong className="text-foreground">WhatsApp:</strong> For quick clarifications or time-sensitive freelance discussions, WhatsApp is a convenient option.</p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <a
                        href="mailto:ankurbpradhan@gmail.com?subject=Freelance%20Project&body=Hello%20Ankur,%20I%E2%80%99m%20looking%20for%20a%20developer%20to%20help%20with%20a%20freelance%20or%20short-term%20project.%20I%E2%80%99d%20like%20to%20share%20the%20project%20requirements,%20timeline,%20and%20expectations."
                        className="text-xs px-3 py-1.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                      >
                        Email
                      </a>
                      <a
                        href="https://wa.me/919414407192?text=Hello%20Ankur,%20I%E2%80%99m%20looking%20for%20a%20developer%20to%20help%20with%20a%20freelance%20or%20short-term%20project.%20I%E2%80%99d%20like%20to%20share%20the%20project%20requirements,%20timeline,%20and%20expectations."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20 transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* Networking */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary/90 flex items-center gap-2">
                    <span className="text-xl">🌐</span> If You’re Networking or Exploring Opportunities
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <p className="text-sm text-foreground mb-1 font-medium">Best platform: LinkedIn</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong className="text-foreground">LinkedIn:</strong> If you’re interested in professional networking, career discussions, or long-term opportunities, LinkedIn is the best place to connect.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <a href="https://www.linkedin.com/in/ankur-s-52686427b" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-600 border border-blue-600/20 hover:bg-blue-600/20 transition-colors">LinkedIn Profile</a>
                      <a
                        href="mailto:ankurbpradhan@gmail.com?subject=Networking%20&body=Hi%20Ankur,%20I%E2%80%99m%20reaching%20out%20to%20connect%20professionally%20and%20explore%20potential%20opportunities,%20career%20discussions,%20or%20long-term%20networking."
                        className="text-xs px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                      >
                        Email (Connection)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Data / ML */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary/90 flex items-center gap-2">
                    <span className="text-xl">📊</span> If You’re From a Data / ML Background
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <p className="text-sm text-foreground mb-1 font-medium">Best platform: Kaggle</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong className="text-foreground">Kaggle:</strong> If you’re interested in data science or machine learning, Kaggle showcases my work with datasets, models, experiments, and analytical problem-solving.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <a href="https://www.kaggle.com/ankur20sharma" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">Kaggle Profile</a>
                      <a
                        href="mailto:ankurbpradhan@gmail.com?subject=Data%20Science%20Discussion&body=Hello%20Ankur,%20I%20reviewed%20your%20Kaggle%20work%20and%20would%20like%20to%20connect%20regarding%20data%20science%20or%20machine%20learning%20topics,%20projects,%20or%20discussions."
                        className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                      >
                        Email (Discussion)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Skills Review */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary/90 flex items-center gap-2">
                    <span className="text-xl">🧠</span> If You’re Reviewing My Skills Before Reaching Out
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <p className="text-sm text-foreground mb-1 font-medium">Best platform: GitHub</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong className="text-foreground">GitHub:</strong> If you’d like to assess my technical skills before connecting, GitHub provides insight into my coding standards, project architecture, and implementation style.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <a href="https://github.com/Shsrma" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-full bg-gray-600/10 text-gray-600 border border-gray-600/20 hover:bg-gray-600/20 transition-colors">GitHub Profile</a>
                      <a
                        href="mailto:ankurbpradhan@gmail.com?subject=Technical%20Skills%20Discussion&body=Hi%20Ankur,%20I%E2%80%99ve%20been%20reviewing%20your%20projects%20and%20would%20like%20to%20connect%20to%20discuss%20your%20technical%20skills,%20approach,%20and%20experience%20in%20more%20detail."
                        className="text-xs px-3 py-1.5 rounded-full bg-gray-600/10 text-gray-600 border border-gray-600/20 hover:bg-gray-600/20 transition-colors"
                      >
                        Email (Discussion)
                      </a>
                    </div>
                  </div>
                </div>

                {/* Casual */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary/90 flex items-center gap-2">
                    <span className="text-xl">👋</span> If You’re Looking to Connect Casually
                  </h3>
                  <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
                    <p className="text-sm text-foreground mb-1 font-medium">Best platforms: Instagram · Snapchat</p>
                    <div className="text-sm text-muted-foreground mb-3 space-y-2">
                      <p><strong className="text-foreground">Instagram:</strong> Instagram is where I occasionally share learning updates, projects, and professional milestones.</p>
                      <p><strong className="text-foreground">Snapchat:</strong> For informal conversations or casual connections, Snapchat is another way to reach me.</p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <a href="https://www.instagram.com/ankur__sharmaaa/?__pwa=1" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20 hover:bg-pink-500/20 transition-colors">Instagram</a>
                      <a href="https://www.snapchat.com/add/asharma231231" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 rounded-full bg-yellow-400/10 text-yellow-500 border border-yellow-400/20 hover:bg-yellow-400/20 transition-colors">Snapchat</a>
                      <a
                        href="mailto:ankurbpradhan@gmail.com?subject=Say%20Hello&body=Hey%20Ankur,%20I%20came%20across%20your%20profile%20and%20just%20wanted%20to%20connect%20and%20say%20hello.%20Looking%20forward%20to%20staying%20in%20touch."
                        className="text-xs px-3 py-1.5 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20 hover:bg-pink-500/20 transition-colors"
                      >
                        Email (Say Hi)
                      </a>
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
