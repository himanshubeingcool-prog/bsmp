import { Reveal } from '@/components/ui/Reveal';
import { StaggerGroup, StaggerItem } from '@/components/ui/Stagger';
import { Zap, ShieldCheck, RefreshCw, HeartHandshake } from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Lag-Free Servers',
    description: 'Powered by high-performance dedicated hardware with optimized configurations. Our servers maintain 20 TPS even with hundreds of concurrent players, ensuring buttery-smooth gameplay at all times.',
    accent: 'cyan',
  },
  {
    icon: ShieldCheck,
    title: 'Dedicated Staff',
    description: 'Our experienced moderation team works around the clock to maintain a safe and enjoyable environment. With an average response time of under 5 minutes, help is always just a ticket away.',
    accent: 'cyan',
  },
  {
    icon: RefreshCw,
    title: 'Regular Updates',
    description: 'We stay on top of the latest Minecraft versions and continuously add new features, custom items, and improvements based on community feedback. The server evolves with its players.',
    accent: 'cyan',
  },
  {
    icon: HeartHandshake,
    title: 'Active Community',
    description: 'Join a thriving community of passionate Minecraft players. With active Discord channels, regular community events, and a welcoming atmosphere, you will always find someone to play with.',
    accent: 'gold',
  },
];

const accentMap2: Record<string, { color: string; bgColor: string }> = {
  cyan: { color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
  gold: { color: 'text-gold-400', bgColor: 'bg-gold-500/10' },
};

export function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
      <Reveal className="text-center mb-16 sm:mb-20">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-400/70 font-medium mb-3">Why Choose Us</p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-bold mb-4 tracking-tight">
          <span className="text-gradient">Built Different</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed" style={{ maxWidth: '65ch' }}>
          Discover what makes us the premier Minecraft survival server
        </p>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {reasons.map((reason) => {
          const Icon = reason.icon;
          const { color, bgColor } = accentMap2[reason.accent];
          return (
            <StaggerItem key={reason.title}
            >
              <div className="relative h-full rounded-2xl bg-card border border-border stacked-shadow top-highlight p-6 sm:p-8 transition-all duration-300 hover:border-cyan-500/20 group">
                <div className="flex items-start gap-5">
                  <div className={`shrink-0 w-14 h-14 rounded-2xl ${bgColor} flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className={`text-lg sm:text-xl font-heading font-bold mb-3 ${color}`}>
                      {reason.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
