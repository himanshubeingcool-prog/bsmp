import { useState, useMemo } from 'react';
import {
  Trophy, TrendingUp, TrendingDown, Minus, Skull, Swords,
  Clock, Wallet, Star, ChevronLeft, ChevronRight
} from 'lucide-react';
import { LEADERBOARD_DATA } from '@/lib/mock-data';
import { cn, formatNumber, formatPlaytime, getRankColor } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

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

const ITEMS_PER_PAGE = 7;

const PODIUM_COLORS = [
  'from-yellow-500 to-amber-600 border-yellow-500/40 shadow-yellow-500/10',
  'from-gray-300 to-gray-400 border-gray-400/40 shadow-gray-400/10',
  'from-amber-700 to-amber-800 border-amber-700/40 shadow-amber-700/10',
];

const PODIUM_BG = [
  'bg-gradient-to-br from-yellow-900/20 to-amber-900/20',
  'bg-gradient-to-br from-gray-800/20 to-gray-900/20',
  'bg-gradient-to-br from-amber-900/20 to-orange-900/20',
];

function ChangeIndicator({ change }: { change: 'up' | 'down' | 'same' }) {
  if (change === 'up') return <TrendingUp className="w-4 h-4 text-green-400" />;
  if (change === 'down') return <TrendingDown className="w-4 h-4 text-red-400" />;
  return <Minus className="w-4 h-4 text-gray-500" />;
}

export function LeaderboardsPage() {
  const [activeTab, setActiveTab] = useState<LeaderboardType>('kills');
  const [period, setPeriod] = useState<Period>('monthly');
  const [page, setPage] = useState(1);

  const data = LEADERBOARD_DATA[activeTab] || [];

  const totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const top3 = data.slice(0, 3);
  const paginated = data.slice(3).slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const TabIcon = TAB_CONFIG.find(t => t.key === activeTab)?.icon || Trophy;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-green-400 to-gold-400 bg-clip-text text-transparent">
              Leaderboards
            </h1>
            <p className="text-muted mt-1">Top players across all categories</p>
          </div>
          <div className="flex gap-1 bg-card border border-border rounded-lg p-1">
            <button
              onClick={() => setPeriod('monthly')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer',
                period === 'monthly'
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod('alltime')}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer',
                period === 'alltime'
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              All-Time
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-8 p-1 bg-card border border-border rounded-xl">
          {TAB_CONFIG.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setPage(1); }}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer',
                activeTab === key
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <TabIcon className="w-5 h-5 text-green-400" />
          <h2 className="text-lg font-heading font-semibold capitalize">
            {activeTab} Leaderboard
          </h2>
          <Badge variant="info" size="sm">{period}</Badge>
        </div>

        {top3.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {top3.map((entry, i) => {
              const rankNum = i + 1;
              const avatarUrl = entry.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${entry.username}&backgroundColor=22c55e`;
              return (
                <div
                  key={entry.username}
                  className={cn(
                    'rounded-xl border p-6 text-center animate-slide-up transition-all duration-300',
                    PODIUM_BG[i],
                    PODIUM_COLORS[i].split(' ')[0] && `border ${PODIUM_COLORS[i].split(' ').slice(1).join(' ')}`
                  )}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className={cn(
                    'w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center font-heading font-bold text-lg',
                    i === 0 ? 'bg-yellow-500 text-stone-950 shadow-lg shadow-yellow-500/30' :
                    i === 1 ? 'bg-gray-300 text-stone-950 shadow-lg shadow-gray-400/30' :
                    'bg-amber-700 text-white shadow-lg shadow-amber-700/30'
                  )}>
                    {rankNum}
                  </div>
                  <Avatar src={avatarUrl} alt={entry.username} size="lg" className="mx-auto mb-3" />
                  <h3 className="font-heading font-bold text-white">{entry.username}</h3>
                  <p className={cn('text-sm font-medium mt-1', getRankColor(entry.tier))}>{entry.tier}</p>
                  <p className="text-2xl font-heading font-bold mt-2">
                    {activeTab === 'playtime' ? formatPlaytime(entry.value) : formatNumber(entry.value)}
                  </p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>#{rankNum}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Rank</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Player</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Rank Tier</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Value</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((entry, i) => {
                  const avatarUrl = entry.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${entry.username}&backgroundColor=22c55e`;
                  return (
                    <tr
                      key={entry.username}
                      className="border-b border-border/50 hover:bg-white/5 transition-colors animate-slide-up"
                      style={{ animationDelay: `${i * 75}ms` }}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted w-6">{3 + (safePage - 1) * ITEMS_PER_PAGE + i + 1}</span>
                          <ChangeIndicator change={entry.change} />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar src={avatarUrl} alt={entry.username} size="sm" />
                          <span className="text-sm font-medium text-white">{entry.username}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn('text-sm font-medium', getRankColor(entry.tier))}>{entry.tier}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-bold text-white">
                          {activeTab === 'playtime' ? formatPlaytime(entry.value) : formatNumber(entry.value)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-12 text-center text-muted">No entries found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <span className="text-sm text-muted">
                Page {safePage} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={safePage <= 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  icon={<ChevronLeft className="w-4 h-4" />}
                >
                  Prev
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      'w-8 h-8 rounded-lg text-sm font-medium transition-all cursor-pointer',
                      p === safePage ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {p}
                  </button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  icon={<ChevronRight className="w-4 h-4" />}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
