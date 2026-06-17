import { useState } from 'react';
import { Trophy, Swords, TrendingUp, Skull, Clock, Wallet, Star, Construction } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type LeaderboardType = 'kills' | 'deaths' | 'kdr' | 'playtime' | 'balance' | 'wins';
type Period = 'monthly' | 'alltime';

const TAB_CONFIG: { key: LeaderboardType; label: string; icon: typeof Trophy }[] = [
  { key: 'kills', label: 'Kills', icon: Swords },
  { key: 'deaths', label: 'Deaths', icon: Skull },
  { key: 'kdr', label: 'KDR', icon: TrendingUp },
  { key: 'playtime', label: 'Playtime', icon: Clock },
  { key: 'balance', label: 'Balance', icon: Wallet },
  { key: 'wins', label: 'Wins', icon: Star },
];

export function LeaderboardsPage() {
  const [activeType, setActiveType] = useState<LeaderboardType>('kills');
  const [period, setPeriod] = useState<Period>('alltime');

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-7 h-7 text-gold-400" />
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">Leaderboards</h1>
            <p className="text-sm text-gray-400 mt-0.5">Top players across all categories</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {TAB_CONFIG.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveType(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeType === tab.key
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                    : 'bg-stone-800/50 text-gray-400 hover:bg-stone-700/50 hover:text-white border border-stone-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 mb-8">
          {(['alltime', 'monthly'] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer capitalize ${
                period === p
                  ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                  : 'text-gray-500 border border-transparent hover:text-gray-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="glass-card rounded-xl border border-border p-16 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-stone-800/50 flex items-center justify-center">
            <Construction className="w-10 h-10 text-gold-400" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-gray-300 mb-2">Leaderboard Coming Soon</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
            The leaderboard will be populated with real player stats once the Minecraft plugin is connected.
            Compete for the top spot across kills, wins, KDR, and more!
          </p>
          <Button variant="primary" onClick={() => window.open('https://discord.gg/s7CETJXYhf', '_blank')}>
            Join Discord for Updates
          </Button>
        </div>
      </div>
    </div>
  );
}
