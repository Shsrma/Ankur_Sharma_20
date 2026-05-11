import Hero from '@/components/Hero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Briefcase, Code, Award, Mail, ArrowRight } from 'lucide-react';

const overviewItems = [
  {
    title: 'About Me',
    description: 'Learn about my journey, education, and the core technologies I work with.',
    icon: User,
    link: '/about',
    color: 'hsl(var(--glow-cyan))'
  },
  {
    title: 'Activity',
    description: 'Explore my online presence, open-source contributions, and professional posts.',
    icon: Briefcase,
    link: '/activity',
    color: 'hsl(var(--glow-violet))'
  },
  {
    title: 'Projects',
    description: 'View my featured technical projects, from web apps to machine learning models.',
    icon: Code,
    link: '/projects',
    color: 'hsl(220, 100%, 60%)'
  },
  {
    title: 'Certifications',
    description: 'See my achievements, courses, and recognized credentials.',
    icon: Award,
    link: '/certifications',
    color: 'hsl(45, 100%, 50%)'
  },
  {
    title: 'Contact',
    description: 'Get in touch for collaborations, opportunities, or just to say hi.',
    icon: Mail,
    link: '/contact',
    color: 'hsl(15, 100%, 55%)'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-background/50 backdrop-blur-3xl -z-10" />
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] opacity-20 -z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(var(--glow-cyan)) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />

        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Portfolio Overview</h2>
            <p className="section-subtitle">Navigate through my digital universe</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {overviewItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link to={item.link} className="block h-full">
                  <div className="glass-card p-8 h-full flex flex-col group hover:border-primary/50 transition-colors duration-300 relative overflow-hidden">
                    {/* Hover Glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at center, ${item.color} 0%, transparent 70%)` }}
                    />
                    
                    <div className="mb-6 inline-flex p-3 rounded-xl bg-secondary/30 text-primary group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-8 h-8" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">{item.description}</p>
                    
                    <div className="flex items-center text-sm font-semibold text-primary mt-auto">
                      Explore Section
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
