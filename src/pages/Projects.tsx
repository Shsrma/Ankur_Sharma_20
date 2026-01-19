import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, ArrowUpRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  timeline: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    title: 'Hybrid Blockchain Cloud Storage System',
    description: 'A hybrid cloud storage architecture combining blockchain immutability with traditional cloud systems for enhanced security and data integrity.',
    technologies: ['Python', 'Blockchain', 'Cloud Storage', 'Cryptography', 'SHA-256'],
    github: 'https://github.com/Shsrma',
    timeline: 'Jul 2025 – Nov 2025',
    highlights: [
      'Implemented cryptographic hashing (SHA-256) to ensure data integrity',
      'Built secure backend workflows for file upload, verification, and retrieval',
      'Designed hybrid architecture combining blockchain and cloud storage',
    ],
  },
  {
    title: 'Credit Card Fraud Detection System',
    description: 'An intelligent transaction monitoring system to detect fraudulent credit card transactions using machine learning algorithms.',
    technologies: ['Python', 'Machine Learning', 'MySQL', 'Scikit-learn', 'Pandas'],
    github: 'https://github.com/Shsrma',
    timeline: 'Jul 2025 – Nov 2025',
    highlights: [
      'Performed extensive data preprocessing and feature engineering',
      'Designed modular backend architecture for ML integration',
      'Developed transaction monitoring system with real-time detection',
    ],
  },
  {
    title: 'Disease Prediction System',
    description: 'A machine learning model to predict diseases based on symptom data, achieving approximately 85% accuracy through model tuning.',
    technologies: ['Python', 'Machine Learning', 'NumPy', 'Pandas', 'Matplotlib'],
    github: 'https://github.com/Shsrma',
    timeline: '2024',
    highlights: [
      'Built ML model for disease prediction using symptom data',
      'Achieved ~85% accuracy through hyperparameter tuning',
      'Implemented data visualization for model insights',
    ],
  },
];

const Projects = () => {
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
          <h1 className="section-title">Featured Projects</h1>
          <p className="section-subtitle">
            Building innovative solutions with modern technologies
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {project.timeline}
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
                      style={{
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 20px hsl(var(--glow-cyan) / 0.3)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">View Code</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </motion.a>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3 text-primary">Key Highlights</h4>
                  <ul className="space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 + i * 0.1 }}
                      >
                        <div 
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ background: 'var(--gradient-primary)' }}
                        />
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      className="skill-badge text-xs"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.15 + i * 0.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Decorative gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--glow-cyan) / 0.05) 0%, hsl(var(--glow-violet) / 0.05) 100%)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-muted-foreground mb-6">
            Want to see more of my work?
          </p>
          <motion.a
            href="https://github.com/Shsrma"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-button text-primary-foreground gap-2 inline-flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            Visit My GitHub
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
