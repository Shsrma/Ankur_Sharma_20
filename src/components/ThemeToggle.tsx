import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full p-1 transition-colors duration-300"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, hsl(222 47% 15%), hsl(270 30% 20%))' 
          : 'linear-gradient(135deg, hsl(200 100% 90%), hsl(40 100% 90%))',
        boxShadow: isDark
          ? '0 0 20px hsl(var(--glow-violet) / 0.3), inset 0 0 10px hsl(var(--glow-cyan) / 0.2)'
          : '0 4px 15px hsl(40 100% 50% / 0.3)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Track stars for dark mode */}
      {isDark && (
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                top: `${20 + i * 25}%`,
                left: `${60 + i * 10}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Toggle knob */}
      <motion.div
        className="relative w-6 h-6 rounded-full flex items-center justify-center"
        animate={{
          x: isDark ? 22 : 0,
          rotate: isDark ? 360 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        style={{
          background: isDark
            ? 'linear-gradient(135deg, hsl(220 20% 20%), hsl(220 30% 30%))'
            : 'linear-gradient(135deg, hsl(40 100% 60%), hsl(35 100% 55%))',
          boxShadow: isDark
            ? '0 0 15px hsl(var(--glow-cyan) / 0.5), inset 0 0 10px hsl(var(--glow-violet) / 0.3)'
            : '0 0 20px hsl(40 100% 50% / 0.5)',
        }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 0 : 360 }}
          transition={{ duration: 0.5 }}
        >
          {isDark ? (
            <Moon className="w-3.5 h-3.5 text-glow-cyan" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-100" />
          )}
        </motion.div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        animate={{
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 0.5,
        }}
        style={{
          background: isDark
            ? 'radial-gradient(circle, hsl(var(--glow-cyan) / 0.5) 0%, transparent 70%)'
            : 'radial-gradient(circle, hsl(40 100% 60% / 0.5) 0%, transparent 70%)',
        }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
