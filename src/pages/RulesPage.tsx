import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Gavel, Star, ChevronRight, Scale, Shield, MessageSquare, Swords, Building2, Handshake, AlertTriangle } from 'lucide-react';

const RULE_CATEGORIES = [
  {
    id: 'general',
    label: 'General',
    icon: Shield,
    rules: [
      { title: 'Respect Everyone', description: 'Treat all players and staff with respect. No toxicity, harassment, or discrimination.' },
      { title: 'Common Sense', description: 'If you think it might be against the rules, it probably is. Use good judgment.' },
      { title: 'No Exploiting', description: 'Exploiting bugs, glitches, or abusing mechanics is strictly forbidden. Report bugs to staff.' },
      { title: 'English Only', description: 'Please use English in all public chat channels so moderators can monitor chat.' },
      { title: 'No Impersonation', description: 'Do not impersonate staff members, other players, or claim false rankings.' },
    ],
  },
  {
    id: 'chat',
    label: 'Chat',
    icon: MessageSquare,
    rules: [
      { title: 'No Spamming', description: 'Do not spam messages, caps, emotes, or repetitive content in any chat channel.' },
      { title: 'No Advertising', description: 'Advertising other servers, services, or unrelated content is not allowed.' },
      { title: 'No Hate Speech', description: 'Racism, sexism, homophobia, and any form of hate speech result in an instant ban.' },
      { title: 'Keep It Clean', description: 'No NSFW, inappropriate, or overly offensive content in chat or signs.' },
      { title: 'No Doxxing', description: 'Sharing personal information of others is strictly prohibited.' },
    ],
  },
  {
    id: 'pvp',
    label: 'PvP',
    icon: Swords,
    rules: [
      { title: 'Safe Zones', description: 'PvP is disabled in spawn and designated safe zones. Do not lure players out.' },
      { title: 'Respect Toggles', description: 'Respect players who have PvP toggled off. Do not harass them to enable it.' },
      { title: 'No Combat Logging', description: 'Logging out during PvP is considered combat logging and is not allowed.' },
      { title: 'Crystal PvP', description: 'Crystal PvP is only allowed in the designated PvP arena, not in the overworld.' },
      { title: 'No Kill Farming', description: 'Repeatedly killing the same player for stats or loot is not allowed.' },
    ],
  },
  {
    id: 'griefing',
    label: 'Griefing',
    icon: AlertTriangle,
    rules: [
      { title: 'Zero Tolerance', description: 'Griefing is strictly prohibited and will result in an immediate permanent ban.' },
      { title: 'Respect Builds', description: 'Do not destroy, modify, or steal from other players\' builds or chests.' },
      { title: 'Claim Protection', description: 'Use /claim to protect your builds. Unclaimed builds are not an excuse for griefing.' },
      { title: 'No Lava Casting', description: 'Lava casting, water griefing, and other destructive techniques are banned.' },
      { title: 'No Raiding', description: 'Raiding other players\' bases, even if unclaimed, is considered griefing.' },
    ],
  },
  {
    id: 'scamming',
    label: 'Scamming',
    icon: Handshake,
    rules: [
      { title: 'No Scamming', description: 'Scamming other players through trades, sales, or deception is strictly forbidden.' },
      { title: 'Fair Trades', description: 'All trades must be transparent. Bait-and-switch or hidden terms are not allowed.' },
      { title: 'Real Money Trading', description: 'Trading in-game items or currency for real money is prohibited.' },
      { title: 'Account Trading', description: 'Buying, selling, or trading accounts is not permitted.' },
      { title: 'Report Scams', description: 'If you are scammed, report it to staff immediately with screenshots as evidence.' },
    ],
  },
  {
    id: 'building',
    label: 'Building',
    icon: Building2,
    rules: [
      { title: 'Appropriate Content', description: 'No offensive, NSFW, or political builds. This includes signs and item frames.' },
      { title: 'Build Distance', description: 'Maintain at least 50 blocks distance from other players\' builds unless permitted.' },
      { title: 'No Lag Machines', description: 'Redstone contraptions that cause server lag are not allowed.' },
      { title: 'Skybase Rules', description: 'Skybases must be at least 100 blocks above ground level and properly claimed.' },
      { title: 'Underground Bases', description: 'Underground bases must not interfere with natural terrain above ground level.' },
    ],
  },
];

export function RulesPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
            <Gavel className="w-4 h-4" />
            Server Rules
          </div>
          <h1 className="font-heading text-3xl font-bold text-gradient">BhukkadSMP Rules</h1>
          <p className="text-muted max-w-xl mx-auto">
            Follow these rules to ensure a fun and fair experience for everyone. Violations may result in warnings, mutes, or bans.
          </p>
        </div>

        <div className="grid gap-6">
          {RULE_CATEGORIES.map((category, idx) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} variant="default" className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-semibold">{category.label}</h2>
                    <p className="text-xs text-muted">{category.rules.length} rules</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {category.rules.map((rule, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-surface/50 hover:bg-surface transition-colors">
                      <Star className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-semibold text-white">{rule.title}</h3>
                        <p className="text-xs text-muted mt-0.5">{rule.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <Card variant="highlight" padding="md" className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-start gap-3">
            <Scale className="w-6 h-6 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold">Need to appeal a punishment?</p>
              <p className="text-sm text-muted">If you believe you were unfairly punished, submit an appeal.</p>
            </div>
          </div>
          <Link to="/appeal">
            <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-gold-600 hover:bg-gold-500 text-stone-950 font-semibold rounded-lg transition-colors text-sm">
              Submit Appeal
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
