import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, ArrowUpRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  timeline: string;
  highlights: string[];
  image: string; // New field
  category: string;
}

const projects: Project[] = [
  {
    title: 'Hybrid Blockchain Cloud Storage',
    description: 'A secure decentralized storage solution addressing data privacy and integrity. Combines the immutability of blockchain with the scalability of cloud storage to prevent unauthorized tampering.',
    technologies: ['Python', 'Blockchain', 'Advanced Encryption', 'SHA-256', 'Cloud Architecture'],
    github: 'https://github.com/Shsrma',
    timeline: 'Jul 2025 – Nov 2025',
    category: 'Security & Web3',
    image: 'https://placehold.co/600x400/0f172a/0ea5e9?text=Blockchain+Storage',
    highlights: [
      'Implemented SHA-256 cryptographic hashing for tamper-proof data verification.',
      'Designed a hybrid architecture reducing storage costs by 40% while maintaining security.',
      'Built secure file upload/retrieval workflows ensuring zero-knowledge privacy.',
    ],
  },
  {
    title: 'AI Fraud Detection System',
    description: 'Real-time transaction monitoring system designed to identify and prevent fraudulent credit card activities using advanced machine learning algorithms.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'MySQL', 'REST API'],
    github: 'https://github.com/Shsrma',
    timeline: 'Jul 2025 – Nov 2025',
    category: 'AI & Data Science',
    image: 'https://placehold.co/600x400/0f172a/a855f7?text=Fraud+Detection',
    highlights: [
      'Processed and balanced a dataset of over 200k transactions for model training.',
      'Achieved 94% detection accuracy using Random Forest and Logistic Regression.',
      'Developed a modular backend to serve predictions in real-time.',
    ],
  },
  {
    title: 'Disease Prediction Model',
    description: 'Healthcare capability demonstrator predicting potential diseases based on user-reported symptoms, aiding in early diagnosis and awareness.',
    technologies: ['Python', 'NumPy', 'Matplotlib', 'Machine Learning', 'Data Viz'],
    github: 'https://github.com/Shsrma',
    timeline: '2024',
    category: 'Healthcare AI',
    image: 'https://placehold.co/600x400/0f172a/ec4899?text=Disease+Prediction',
    highlights: [
      'Optimized model performance to ~85% accuracy via hyperparameter tuning.',
      'Created intuitive data visualizations to explain model predictions.',
      'Integrated symptom checking logic with a user-friendly input interface.',
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
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 block bg-gradient-to-r from-cyan-400 to-blue-500"
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
