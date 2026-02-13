import { motion } from 'framer-motion';
import { CheckCircle, Clock, Users, Award, Target, Zap } from 'lucide-react';

const WhyHireMe = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "Successfully delivered 50+ projects with 98% client satisfaction rate",
      color: "text-green-500"
    },
    {
      icon: Clock,
      title: "Quick Delivery",
      description: "Average project completion time 30% faster than industry standard",
      color: "text-blue-500"
    },
    {
      icon: Users,
      title: "Great Communication",
      description: "Daily updates and clear communication throughout the project lifecycle",
      color: "text-purple-500"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in hackathons and coding competitions",
      color: "text-yellow-500"
    },
    {
      icon: Target,
      title: "Problem Solver",
      description: "Analytical approach to complex technical challenges",
      color: "text-red-500"
    },
    {
      icon: Zap,
      title: "Fast Learner",
      description: "Quickly adapt to new technologies and frameworks",
      color: "text-cyan-500"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Why Hire Me?</h2>
          <p className="section-subtitle">
            I bring more than just code - I deliver solutions that drive business growth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="glass-card p-6 border-primary/10 hover:border-primary/30 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-background/50 ${benefit.color} group-hover:scale-110 transition-transform`}>
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="glass-card p-8 border-primary/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to build something amazing together?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I'm currently available for freelance projects and full-time opportunities. 
              Let's discuss how my skills can help your business achieve its goals.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="primary-button gap-2"
              >
                Schedule a Call
              </a>
              <a
                href="/Ankur_Sharma-ResumeD.pdf"
                download="AnkurSharma-Resume.pdf"
                className="magnetic-button gap-2"
              >
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyHireMe;
