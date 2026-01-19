import { motion } from 'framer-motion';
import { Calendar, MapPin, GraduationCap, Briefcase, Code, BookOpen } from 'lucide-react';
import OrbitalTechStack from '@/components/OrbitalTechStack';

const timelineData = [
  {
    year: '2022 - 2026',
    title: 'B.Tech in Computer Science',
    institution: 'Vivekananda Global University, Jaipur',
    description: 'CGPA: 7.56/10',
    icon: GraduationCap,
    type: 'education',
  },
  {
    year: 'Jun 2024 - Jul 2024',
    title: 'Web Developer Intern',
    institution: 'InternPe, Jaipur',
    description: 'Developed responsive web pages, implemented form validation, and collaborated using Git.',
    icon: Briefcase,
    type: 'experience',
  },
  {
    year: '2021',
    title: 'Senior Secondary (12th - Science)',
    institution: 'RBSE',
    description: 'Percentage: 85.5%',
    icon: BookOpen,
    type: 'education',
  },
];

const About = () => {
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
          <h1 className="section-title">About Me</h1>
          <p className="section-subtitle">
            My journey, education, and the technologies I work with
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {[
            { label: 'Education', value: '2022-2026', icon: Calendar },
            { label: 'Projects', value: '10+', icon: Code },
            { label: 'Experience', value: '2 Months', icon: Briefcase },
            { label: 'Certifications', value: '7+', icon: GraduationCap },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="text-2xl md:text-3xl font-bold neon-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio Section */}
        <motion.div
          className="glass-card p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-display font-bold mb-4 neon-text">Who Am I?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I am a final-year B.Tech Computer Science student at Vivekananda Global University, 
                Jaipur, with a passion for creating innovative digital solutions. My expertise spans 
                across full-stack web development, machine learning, and data analysis.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With hands-on experience in developing responsive web applications and ML-powered systems, 
                I enjoy solving complex problems and building applications that make a real-world impact. 
                I'm constantly learning and exploring new technologies to stay at the forefront of innovation.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold mb-4 neon-text">Core Competencies</h2>
              <div className="space-y-3">
                {[
                  'Data Structures & Algorithms',
                  'Object-Oriented Programming',
                  'Database Management Systems',
                  'Operating Systems',
                  'Computer Networks',
                  'Machine Learning',
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ background: 'var(--gradient-primary)' }}
                    />
                    <span className="text-muted-foreground">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="text-3xl font-display font-bold text-center mb-4 neon-text">Tech Arsenal</h2>
          <p className="text-center text-muted-foreground mb-8">
            Tools & Technologies I command
          </p>
          <OrbitalTechStack />
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-3xl font-display font-bold text-center mb-12 neon-text">My Journey</h2>
          <div className="max-w-3xl mx-auto">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.15 }}
              >
                <div className="glass-card p-6 ml-4">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Calendar className="w-4 h-4" />
                        {item.year}
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        {item.institution}
                      </div>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
