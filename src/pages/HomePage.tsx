import { HeroSection } from '@/components/home/HeroSection';
import { ServerStats } from '@/components/home/ServerStats';
import { FeatureShowcase } from '@/components/home/FeatureShowcase';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CommunitySection } from '@/components/home/CommunitySection';
import { RecentPurchases } from '@/components/home/RecentPurchases';
import { TopPlayers } from '@/components/home/TopPlayers';
import { Reveal } from '@/components/ui/Reveal';
import { ServerRibbon } from '@/components/home/ServerRibbon';

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <Reveal><ServerStats /></Reveal>
      <ServerRibbon />
      <Reveal delay={0.1}><FeatureShowcase /></Reveal>
      <Reveal><WhyChooseUs /></Reveal>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal><TopPlayers /></Reveal>
        <Reveal delay={0.15}><RecentPurchases /></Reveal>
      </div>
      <Reveal delay={0.1}><CommunitySection /></Reveal>
    </div>
  );
}
