import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorGlow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Inner glow */}
      <div
        className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--glow-cyan)) 0%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
      {/* Outer glow */}
      <div
        className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, hsl(var(--glow-violet) / 0.5) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />
      {/* Trail effect */}
      <motion.div
        className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(var(--glow-cyan) / 0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

export default CursorGlow;
