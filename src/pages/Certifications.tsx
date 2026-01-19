import { motion } from 'framer-motion';
import { Award, ExternalLink, Trophy, Star, Calendar, CheckCircle } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  platform: string;
  link?: string;
  icon: 'coursera' | 'nptel';
}

const certifications: Certification[] = [
  {
    title: 'Excel Basics for Data Analysis',
    issuer: 'IBM',
    platform: 'Coursera',
    link: 'https://coursera.org/certificate',
    icon: 'coursera',
  },
  {
    title: 'Data Visualization and Dashboards with Excel and Cognos',
    issuer: 'IBM',
    platform: 'Coursera',
    link: 'https://coursera.org/certificate',
    icon: 'coursera',
  },
  {
    title: 'Introduction to Data Analytics',
    issuer: 'IBM',
    platform: 'Coursera',
    link: 'https://coursera.org/certificate',
    icon: 'coursera',
  },
  {
    title: 'Data Visualization',
    issuer: 'University',
    platform: 'Coursera',
    link: 'https://coursera.org/certificate',
    icon: 'coursera',
  },
  {
    title: 'Data Science Math Skills',
    issuer: 'Duke University',
    platform: 'Coursera',
    link: 'https://coursera.org/certificate',
    icon: 'coursera',
  },
  {
    title: 'Business Fundamentals for Entrepreneurs (Part 2)',
    issuer: 'NPTEL',
    platform: 'NPTEL',
    link: 'https://nptel.ac.in/certificate',
    icon: 'nptel',
  },
  {
    title: 'Management Information System',
    issuer: 'NPTEL',
    platform: 'NPTEL',
    link: 'https://nptel.ac.in/certificate',
    icon: 'nptel',
  },
];

const achievements = [
  {
    title: 'Hackathon 2.0 Winner',
    year: '2022',
    description: 'Won Hackathon 2.0 for innovative project submission',
    icon: Trophy,
  },
  {
    title: 'Hackathon 3.0 Participant',
    year: '2023',
    description: 'Participated and showcased skills in Hackathon 3.0',
    icon: Star,
  },
  {
    title: 'Active GitHub Contributor',
    year: 'Ongoing',
    description: 'Actively building and maintaining real-world projects on GitHub',
    icon: CheckCircle,
  },
];

const Certifications = () => {
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
          <h1 className="section-title">Certifications & Achievements</h1>
          <p className="section-subtitle">
            Continuous learning and recognition in my journey
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
            <Award className="w-7 h-7 text-primary" />
            <span className="neon-text">Certifications</span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                className="glass-card p-5 group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.08 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:shadow-lg"
                    style={{
                      background: cert.icon === 'coursera' 
                        ? 'linear-gradient(135deg, hsl(210, 100%, 50%), hsl(210, 100%, 40%))'
                        : 'linear-gradient(135deg, hsl(280, 100%, 50%), hsl(280, 100%, 40%))',
                      boxShadow: cert.icon === 'coursera'
                        ? '0 0 20px hsl(210 100% 50% / 0.3)'
                        : '0 0 20px hsl(280 100% 50% / 0.3)',
                    }}
                  >
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">{cert.issuer}</p>
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: 'var(--glass-bg)',
                          border: '1px solid var(--glass-border)',
                        }}
                      >
                        {cert.platform}
                      </span>
                      {cert.link && (
                        <motion.a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          whileHover={{ scale: 1.2 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
            <Trophy className="w-7 h-7 text-secondary" />
            <span className="neon-text">Achievements Timeline</span>
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div 
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
              style={{ background: 'var(--gradient-primary)' }}
            />

            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className={`relative flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.15 }}
                >
                  {/* Content */}
                  <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <motion.div
                      className="glass-card p-6 inline-block max-w-md"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{achievement.year}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </motion.div>
                  </div>

                  {/* Center Icon */}
                  <motion.div
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10"
                    style={{
                      background: 'var(--gradient-primary)',
                      boxShadow: '0 0 30px hsl(var(--glow-cyan) / 0.5)',
                    }}
                    whileHover={{ scale: 1.2 }}
                    animate={{
                      boxShadow: [
                        '0 0 20px hsl(var(--glow-cyan) / 0.4)',
                        '0 0 40px hsl(var(--glow-cyan) / 0.6)',
                        '0 0 20px hsl(var(--glow-cyan) / 0.4)',
                      ],
                    }}
                    transition={{
                      boxShadow: { duration: 2, repeat: Infinity },
                    }}
                  >
                    <achievement.icon className="w-5 h-5 text-primary-foreground" />
                  </motion.div>

                  {/* Hidden spacer for layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certifications;
