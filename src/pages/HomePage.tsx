import { HeroSection } from '@/components/home/HeroSection';
import { ServerStats } from '@/components/home/ServerStats';
import { FeatureShowcase } from '@/components/home/FeatureShowcase';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CommunitySection } from '@/components/home/CommunitySection';
import { RecentPurchases } from '@/components/home/RecentPurchases';
import { TopPlayers } from '@/components/home/TopPlayers';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <ScrollReveal direction="up"><ServerStats /></ScrollReveal>
      <ScrollReveal direction="up" delay={0.1}><FeatureShowcase /></ScrollReveal>
      <ScrollReveal direction="left"><WhyChooseUs /></ScrollReveal>
      <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal direction="left"><TopPlayers /></ScrollReveal>
        <ScrollReveal direction="right"><RecentPurchases /></ScrollReveal>
      </div>
      <ScrollReveal direction="up"><CommunitySection /></ScrollReveal>
    </div>
  );
}
