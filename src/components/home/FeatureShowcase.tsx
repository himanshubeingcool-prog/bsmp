import { motion } from 'framer-motion';
import {
  Shield, Coins, Users, Swords, Package, Calendar,
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Premium Ranks',
    description: 'Unlock exclusive perks with our tiered rank system. From Voter to Legend, each rank offers unique benefits and commands.',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    size: 'md',
  },
  {
    icon: Coins,
    title: 'Custom Economy',
    description: 'Earn coins through gameplay, trade with players, and purchase items in our player-driven economy.',
    color: 'text-gold-400',
    bgColor: 'bg-gold-500/10',
    size: 'sm',
  },
  {
    icon: Users,
    title: 'Active Community',
    description: 'Join thousands of active players. Make friends, form teams, and build lasting memories together.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    size: 'sm',
  },
  {
    icon: Swords,
    title: 'Anti-Cheat',
    description: 'Advanced anti-cheat systems ensure fair gameplay for everyone. Play with confidence knowing cheaters are swiftly dealt with.',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    size: 'md',
  },
  {
    icon: Package,
    title: 'Custom Crates',
    description: 'Open crates filled with exclusive rewards. From basic to mythic, every crate holds the potential for something amazing.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    size: 'md',
  },
  {
    icon: Calendar,
    title: 'Weekly Events',
    description: 'Participate in weekly events, tournaments, and challenges. Compete for exclusive rewards and glory.',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    size: 'sm',
  },
];

export function FeatureShowcase() {
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
          Everything you need for the ultimate Minecraft survival experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          const isLarge = feature.size === 'md';

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`group relative ${isLarge ? 'lg:col-span-2' : ''}`}
            >
              <div className="relative h-full rounded-xl bg-card border border-border p-5 sm:p-6 transition-all duration-300 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-transparent to-green-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className={`relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.bgColor} mb-4`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                <h3 className={`relative z-10 text-lg font-heading font-bold mb-2 ${feature.color}`}>
                  {feature.title}
                </h3>

                <p className="relative z-10 text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>

                <div className={`absolute -bottom-2 -right-2 w-24 h-24 rounded-full ${feature.bgColor} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl`} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
