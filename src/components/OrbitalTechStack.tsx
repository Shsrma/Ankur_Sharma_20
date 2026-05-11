import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  category: string;
  color: string;
  level: string;
  progress: number;
}

const skills: Skill[] = [
  { name: 'Java', category: 'Programming', color: 'hsl(200, 100%, 50%)', level: 'Intermediate', progress: 65 },
  { name: 'Python', category: 'Programming', color: 'hsl(50, 100%, 50%)', level: 'Intermediate', progress: 60 },
  { name: 'C++', category: 'Programming', color: 'hsl(220, 100%, 60%)', level: 'Familiar', progress: 50 },
  { name: 'JavaScript', category: 'Web', color: 'hsl(45, 100%, 50%)', level: 'Intermediate', progress: 70 },
  { name: 'TypeScript', category: 'Web', color: 'hsl(210, 100%, 55%)', level: 'Familiar', progress: 55 },
  { name: 'React', category: 'Web', color: 'hsl(190, 100%, 55%)', level: 'Intermediate', progress: 65 },
  { name: 'Node.js', category: 'Web', color: 'hsl(110, 100%, 45%)', level: 'Familiar', progress: 55 },
  { name: 'MySQL', category: 'Database', color: 'hsl(200, 100%, 45%)', level: 'Intermediate', progress: 65 },
  { name: 'MongoDB', category: 'Database', color: 'hsl(120, 100%, 40%)', level: 'Familiar', progress: 50 },
  { name: 'Git', category: 'Tools', color: 'hsl(10, 100%, 55%)', level: 'Intermediate', progress: 70 },
  { name: 'Docker', category: 'Tools', color: 'hsl(210, 100%, 60%)', level: 'Learning', progress: 40 },
  { name: 'NumPy', category: 'ML', color: 'hsl(210, 100%, 50%)', level: 'Familiar', progress: 55 },
  { name: 'Pandas', category: 'ML', color: 'hsl(280, 100%, 60%)', level: 'Familiar', progress: 55 },
  { name: 'Scikit-learn', category: 'ML', color: 'hsl(30, 100%, 55%)', level: 'Learning', progress: 45 },
  { name: 'Linux', category: 'Tools', color: 'hsl(45, 100%, 45%)', level: 'Familiar', progress: 50 },
];

const OrbitalTechStack = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.3) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getPosition = (index: number, total: number, radius: number) => {
    const angle = ((index / total) * 360 + rotation) * (Math.PI / 180);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * 0.4; // Elliptical orbit
    const z = Math.sin(angle);

    return { x, y, z };
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
      {/* Center Core */}
      <motion.div
        className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center z-20"
        style={{
          background: 'var(--gradient-primary)',
          boxShadow:
            '0 0 60px hsl(var(--glow-cyan) / 0.5), 0 0 120px hsl(var(--glow-violet) / 0.3)',
        }}
        animate={{
          boxShadow: [
            '0 0 40px hsl(var(--glow-cyan) / 0.4), 0 0 80px hsl(var(--glow-violet) / 0.2)',
            '0 0 60px hsl(var(--glow-cyan) / 0.6), 0 0 120px hsl(var(--glow-violet) / 0.4)',
            '0 0 40px hsl(var(--glow-cyan) / 0.4), 0 0 80px hsl(var(--glow-violet) / 0.2)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <span className="font-display text-sm md:text-base font-bold text-primary-foreground text-center">
          TECH
          <br />
          ARSENAL
        </span>
      </motion.div>

      {/* Orbital Rings */}
      <motion.div
        className="absolute w-[280px] h-[120px] md:w-[400px] md:h-[160px] rounded-full border border-primary/20"
        style={{
          transform: 'rotateX(60deg)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-[340px] h-[140px] md:w-[480px] md:h-[190px] rounded-full border border-secondary/20"
        style={{
          transform: 'rotateX(60deg)',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      {/* Skills */}
      {skills.map((skill, index) => {
        const position = getPosition(index, skills.length, 180);
        const scale = 0.7 + (position.z + 1) * 0.3;
        const opacity = 0.5 + (position.z + 1) * 0.25;
        const zIndex = Math.round((position.z + 1) * 10);

        return (
          <motion.div
            key={skill.name}
            className="absolute cursor-pointer"
            style={{
              x: position.x,
              y: position.y,
              scale: activeSkill === skill.name ? 1.3 : scale,
              opacity: activeSkill === skill.name ? 1 : opacity,
              zIndex: activeSkill === skill.name ? 30 : zIndex,
            }}
            onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
            whileHover={{ scale: activeSkill === skill.name ? 1.3 : 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div
              className="px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-medium text-xs md:text-sm whitespace-nowrap transition-all duration-300 flex flex-col items-center justify-center gap-1"
              style={{
                background: activeSkill === skill.name ? skill.color : 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${activeSkill === skill.name ? skill.color : 'var(--glass-border)'}`,
                color: activeSkill === skill.name ? 'white' : 'inherit',
                boxShadow:
                  activeSkill === skill.name
                    ? `0 0 30px ${skill.color}80, 0 0 60px ${skill.color}40`
                    : 'none',
              }}
            >
              <span>{skill.name}</span>
              {activeSkill === skill.name && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex flex-col items-center w-full min-w-[100px] mt-1 gap-1"
                >
                  <span className="text-[10px] opacity-90 font-bold tracking-wider uppercase">{skill.level}</span>
                  <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.progress}%` }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OrbitalTechStack;
