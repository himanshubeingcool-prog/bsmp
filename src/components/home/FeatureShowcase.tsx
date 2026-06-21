import { Reveal } from '@/components/ui/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/ui/Stagger';
import {
  Shield, Coins, Users, Swords, Package, Calendar,
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Premium Ranks',
    description: 'Unlock exclusive perks with our tiered rank system. From Voter to Legend, each rank offers unique benefits and commands.',
    accent: 'cyan',
    size: 'md',
  },
  {
    icon: Coins,
    title: 'Custom Economy',
    description: 'Earn coins through gameplay, trade with players, and purchase items in our player-driven economy.',
    accent: 'gold',
    size: 'sm',
  },
  {
    icon: Users,
    title: 'Active Community',
    description: 'Join thousands of active players. Make friends, form teams, and build lasting memories together.',
    accent: 'cyan',
    size: 'sm',
  },
  {
    icon: Swords,
    title: 'Anti-Cheat',
    description: 'Advanced anti-cheat systems ensure fair gameplay for everyone. Play with confidence knowing cheaters are swiftly dealt with.',
    accent: 'cyan',
    size: 'md',
  },
  {
    icon: Package,
    title: 'Custom Crates',
    description: 'Open crates filled with exclusive rewards. From basic to mythic, every crate holds the potential for something amazing.',
    accent: 'cyan',
    size: 'md',
  },
  {
    icon: Calendar,
    title: 'Weekly Events',
    description: 'Participate in weekly events, tournaments, and challenges. Compete for exclusive rewards and glory.',
    accent: 'cyan',
    size: 'sm',
  },
];

const accentMap: Record<string, { color: string; bgColor: string }> = {
  cyan: { color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
  gold: { color: 'text-gold-400', bgColor: 'bg-gold-500/10' },
};

export function FeatureShowcase() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
      <Reveal className="text-center mb-16 sm:mb-20">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-400/70 font-medium mb-3">Features</p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold mb-4 tracking-tight">
          <span className="text-gradient">Why BhukkadSMP?</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed" style={{ maxWidth: '65ch' }}>
          Everything you need for the ultimate Minecraft survival experience
        </p>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isLarge = feature.size === 'md';
          const { color, bgColor } = accentMap[feature.accent];

          return (
            <StaggerItem key={feature.title}
              className={`group relative ${isLarge ? 'lg:col-span-2' : ''}`}
            >
              <div className="relative h-full rounded-2xl bg-card border border-border stacked-shadow top-highlight p-6 sm:p-8 transition-all duration-300 hover:border-cyan-500/20 overflow-hidden">
                <div className={`relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-xl ${bgColor} mb-4`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>

                <h3 className={`relative z-10 text-lg font-heading font-bold mb-2 ${color}`}>
                  {feature.title}
                </h3>

                <p className="relative z-10 text-sm text-muted leading-relaxed" style={{ maxWidth: '65ch' }}>
                  {feature.description}
                </p>

                <div className={`absolute -bottom-2 -right-2 w-24 h-24 rounded-full ${bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl`} />
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
