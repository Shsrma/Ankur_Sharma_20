import { motion } from 'framer-motion';
import { Github, Linkedin, Database, Star, GitCommit, Users, Heart, MessageSquare, ArrowRight, ExternalLink } from 'lucide-react';

const Activity = () => {
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
          <h1 className="section-title">Online Activity & Presence</h1>
          <p className="section-subtitle">A glimpse into my professional and open-source contributions</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* GitHub Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
                <Github className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold">GitHub</h2>
                <a href="https://github.com/Shsrma" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                  @Shsrma <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="glass-card p-6 flex-1 flex flex-col group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-foreground/10" />
              
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <GitCommit className="w-5 h-5 text-primary" /> Recent Contributions
              </h3>
              
              <div className="space-y-4 flex-1">
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-primary">Hybrid Blockchain Storage</span>
                    <span className="text-xs text-muted-foreground">Recent</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Committed massive improvements to smart contract interaction logic.</p>
                </div>
                
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-primary">Chat Application</span>
                    <span className="text-xs text-muted-foreground">Active</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Implemented WebRTC based real-time video chat features.</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex justify-between text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="w-4 h-4" /> Top Repos</span>
                <span className="flex items-center gap-1"><GitCommit className="w-4 h-4" /> 100+ Commits</span>
              </div>
            </div>
          </motion.div>

          {/* LinkedIn Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500">
                <Linkedin className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">LinkedIn</h2>
                <a href="https://www.linkedin.com/in/ankur-s-52686427b" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
                  Connect <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="glass-card p-6 flex-1 flex flex-col group relative overflow-hidden border-blue-500/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-blue-500/10" />
              
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" /> Professional Updates
              </h3>
              
              <div className="space-y-4 flex-1">
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-500">AS</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold">Ankur Sharma</p>
                      <p className="text-[10px] text-muted-foreground">Student at VGU</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Thrilled to share that I've completed the IBM Cyber Security PBEL 2.3 certification! A great deep dive into network security and threat intelligence. 🚀🔒
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> 24</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> 5</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-blue-500/30 transition-colors">
                   <p className="text-sm text-muted-foreground italic text-center py-4">
                     "Constantly learning and sharing my journey in tech, web development, and data science."
                   </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kaggle Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Kaggle</h2>
                <a href="https://www.kaggle.com/ankur20sharma" target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-500 hover:underline flex items-center gap-1">
                  @ankur20sharma <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="glass-card p-6 flex-1 flex flex-col group relative overflow-hidden border-cyan-500/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-cyan-500/10" />
              
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-500" /> Data Science Journey
              </h3>
              
              <div className="space-y-4 flex-1">
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-cyan-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-cyan-500">Disease Prediction Model</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500">Notebook</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Developed a robust predictive model utilizing healthcare datasets to accurately identify potential diseases based on early symptoms.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-cyan-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-cyan-500">Credit Card Fraud Detection</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500">Dataset</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Analyzed transaction patterns using machine learning algorithms to detect and classify fraudulent activities.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/50 flex justify-between items-center">
                 <a href="https://www.kaggle.com/ankur20sharma" target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-500 hover:text-cyan-400 flex items-center gap-2 transition-colors">
                    View full profile <ArrowRight className="w-4 h-4" />
                 </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Activity;
