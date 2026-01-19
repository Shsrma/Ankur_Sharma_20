import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        {/* 404 Number */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h1 
            className="text-[150px] md:text-[200px] font-display font-bold leading-none"
            style={{
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 60px hsl(var(--glow-cyan) / 0.5))',
            }}
          >
            404
          </h1>
          
          {/* Glow effect behind */}
          <motion.div
            className="absolute inset-0 blur-3xl opacity-30"
            style={{ background: 'var(--gradient-primary)' }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Lost in <span className="neon-text">Cyberspace</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page "{location.pathname}" doesn't exist in this dimension. 
            Let's get you back on track.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link to="/">
            <motion.button
              className="magnetic-button text-primary-foreground gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              Go Home
            </motion.button>
          </Link>

          <motion.button
            onClick={() => window.history.back()}
            className="ghost-button gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
