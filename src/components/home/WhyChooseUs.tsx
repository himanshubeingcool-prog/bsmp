import { motion } from 'framer-motion';
import { Zap, ShieldCheck, RefreshCw, HeartHandshake } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Lag-Free Servers',
    description: 'Powered by high-performance dedicated hardware with optimized configurations. Our servers maintain 20 TPS even with hundreds of concurrent players, ensuring buttery-smooth gameplay at all times.',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: ShieldCheck,
    title: 'Dedicated Staff',
    description: 'Our experienced moderation team works around the clock to maintain a safe and enjoyable environment. With an average response time of under 5 minutes, help is always just a ticket away.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: RefreshCw,
    title: 'Regular Updates',
    description: 'We stay on top of the latest Minecraft versions and continuously add new features, custom items, and improvements based on community feedback. The server evolves with its players.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: HeartHandshake,
    title: 'Active Community',
    description: 'Join a thriving community of passionate Minecraft players. With active Discord channels, regular community events, and a welcoming atmosphere, you will always find someone to play with.',
    color: 'text-gold-400',
    bgColor: 'bg-gold-500/10',
  },
];

export function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12 sm:mb-16"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
          <span className="text-gradient">Why BhukkadSMP?</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Discover what makes us the premier Minecraft survival server
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {reasons.map((reason, i) => {
          const Icon = reason.icon;
          return (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="relative h-full rounded-xl bg-card border border-border p-6 sm:p-8 transition-all duration-300 hover:border-green-500/30 gradient-border group">
                <div className="flex items-start gap-5">
                  <div className={`shrink-0 w-14 h-14 rounded-2xl ${reason.bgColor} flex items-center justify-center ${reason.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className={`text-lg sm:text-xl font-heading font-bold mb-3 ${reason.color}`}>
                      {reason.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
