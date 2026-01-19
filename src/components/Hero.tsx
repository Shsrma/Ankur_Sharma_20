import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import profileImage from '@/assets/profile.jpeg';
import TypingText from '@/components/TypingText';
import SocialLinks from '@/components/SocialLinks';

const Hero = () => {
  const [showSocials, setShowSocials] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const roles = [
    'Software Engineer',
    'Web Developer',
    'ML Enthusiast',
    'Problem Solver',
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute -inset-4 rounded-full"
              style={{
                background: 'var(--gradient-primary)',
                opacity: 0.3,
                filter: 'blur(20px)',
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Rotating border */}
            <motion.div
              className="absolute -inset-2 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, hsl(var(--glow-cyan)), hsl(var(--glow-violet)), hsl(var(--glow-pink)), hsl(var(--glow-cyan)))',
                padding: '3px',
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="w-full h-full rounded-full bg-background" />
            </motion.div>

            {/* Image container */}
            <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-background">
              <motion.img
                src={profileImage}
                alt="Ankur Sharma"
                className="w-full h-full object-cover"
                onLoad={() => setImageLoaded(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Shimmer overlay */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(135deg, transparent 40%, hsl(var(--glow-cyan) / 0.4) 50%, transparent 60%)',
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['200% 200%', '-200% -200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className="neon-text">Ankur Sharma</span>
          </motion.h1>

          {/* Typing Subtitle */}
          <motion.div
            className="text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground mb-8 h-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <TypingText texts={roles} />
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-muted-foreground max-w-2xl mb-10 text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            B.Tech Computer Science student passionate about building innovative 
            solutions with modern technologies. Experienced in full-stack development,
            machine learning, and creating impactful real-world applications.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.a
              href="/Ankur_Sharma_Resume.pdf"
              download
              className="magnetic-button text-primary-foreground gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              Download Resume
            </motion.a>

            <motion.button
              onClick={() => setShowSocials(!showSocials)}
              className="ghost-button gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect With Me
              <motion.span
                animate={{ rotate: showSocials ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <AnimatePresence>
            {showSocials && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <SocialLinks variant="expanded" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 1.5 },
              y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <Link to="/about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <span className="text-sm">Explore More</span>
              <div className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-current"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
