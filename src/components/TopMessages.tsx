import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Clock, User, RefreshCw, Star } from 'lucide-react';
import { contactAPI, TopMessage } from '@/lib/api';
import { toast } from 'sonner';

const TopMessages = () => {
  const [messages, setMessages] = useState<TopMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMessages = async (showRefreshLoading = false) => {
    try {
      if (showRefreshLoading) {
        setRefreshing(true);
      }
      const response = await contactAPI.getTopMessages(5);
      if (response.success && response.data) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      });
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-6 border-primary/10">
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold">Recent Messages</h3>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-muted/50 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-muted/30 rounded w-full mb-1"></div>
              <div className="h-3 bg-muted/30 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 border-primary/10"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold">Recent Messages</h3>
          {messages.length > 0 && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {messages.length}
            </span>
          )}
        </div>
        <button
          onClick={() => fetchMessages(true)}
          disabled={refreshing}
          className="p-2 rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
          title="Refresh messages"
        >
          <RefreshCw
            className={`w-4 h-4 text-muted-foreground ${refreshing ? 'animate-spin' : ''}`}
          />
        </button>
      </div>

      {/* Messages */}
      <AnimatePresence mode="wait">
        {messages.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8"
          >
            <MessageCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">No messages yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Be the first to reach out!</p>
          </motion.div>
        ) : (
          <motion.div
            key="messages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-4 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                {/* Message Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{message.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(message.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  {message.status === 'new' && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-yellow-500 font-medium">New</span>
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  "{message.message}"
                </p>

                {/* Hover indicator */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-primary/50 rounded-full animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      {messages.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 pt-4 border-t border-border/30"
        >
          <p className="text-xs text-muted-foreground text-center">
            Showing latest {messages.length} messages • Messages are displayed publicly for
            transparency
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TopMessages;
