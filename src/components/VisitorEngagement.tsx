import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, MessageCircle, TrendingUp, Clock } from 'lucide-react';

const VisitorEngagement = () => {
  const [visitorCount, setVisitorCount] = useState(15234);
  const [sessionTime, setSessionTime] = useState(0);
  const [showEngagement, setShowEngagement] = useState(false);

  useEffect(() => {
    // Simulate visitor count increase
    const timer = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000); // Every 30 seconds

    // Track session time
    const sessionTimer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    // Show engagement widget after 10 seconds
    const engagementTimer = setTimeout(() => {
      setShowEngagement(true);
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(sessionTimer);
      clearTimeout(engagementTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <AnimatePresence>
        {showEngagement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="glass-card p-4 border-primary/20 mb-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm font-semibold">Live Activity</span>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-500" />
                <span className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{formatNumber(visitorCount)}</span> visitors this month
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <span className="text-muted-foreground">
                  You've been here for <span className="font-semibold text-foreground">{formatTime(sessionTime)}</span>
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-cyan-500" />
                <span className="text-muted-foreground">
                  <span className="font-semibold text-foreground">12</span> messages today
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border/50">
              <p className="text-xs text-muted-foreground text-center">
                <span className="text-primary font-semibold">3 recruiters</span> viewed this profile today
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setShowEngagement(!showEngagement)}
        className="w-12 h-12 rounded-full glass-card border-primary/20 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <TrendingUp className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
      </motion.button>
    </motion.div>
  );
};

export default VisitorEngagement;
