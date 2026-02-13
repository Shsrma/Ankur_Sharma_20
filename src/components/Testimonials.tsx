import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO at TechStart Inc.",
      content: "Ankur delivered our project ahead of schedule with exceptional quality. His problem-solving skills and attention to detail are outstanding. Highly recommend!",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Product Manager at InnovateLabs",
      content: "Working with Ankur was a game-changer for our startup. He quickly understood our requirements and delivered a robust solution that scaled perfectly.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director at GrowthCo",
      content: "Ankur's expertise in both frontend and backend development made him the perfect choice for our complex web application. Great communication throughout!",
      rating: 5,
      avatar: "ER"
    },
    {
      name: "David Kim",
      role: "Founder at StartupHub",
      content: "Exceptional developer who goes above and beyond. Ankur helped us optimize our application performance by 40%. Truly impressive work!",
      rating: 5,
      avatar: "DK"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            What people say about working with me
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 md:p-12 border-primary/20"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-2xl font-bold text-primary border-2 border-primary/30">
                    {testimonials[currentIndex].avatar}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <Quote className="w-8 h-8 text-primary/30 mb-4 mx-auto md:mx-0" />
                  
                  <blockquote className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full glass-card border-primary/20 hover:border-primary/40 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full glass-card border-primary/20 hover:border-primary/40 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {[
            { number: "50+", label: "Happy Clients" },
            { number: "100+", label: "Projects Completed" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "24/7", label: "Support Available" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center glass-card p-6 border-primary/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <p className="text-3xl font-bold text-primary mb-2">{stat.number}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
