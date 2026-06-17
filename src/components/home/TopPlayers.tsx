import { motion } from 'framer-motion';
import { Trophy, Crown, Medal, Crosshair } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { formatNumber, getRankColor } from '@/lib/utils';
import { LEADERBOARD_DATA } from '@/lib/mock-data';

const topPlayers = LEADERBOARD_DATA.kills.slice(0, 5);

const podiumColors = [
  { border: 'border-gold-500/50', bg: 'bg-gold-500/10', icon: Crown, label: '#1' },
  { border: 'border-gray-400/50', bg: 'bg-gray-400/10', icon: Medal, label: '#2' },
  { border: 'border-amber-600/50', bg: 'bg-amber-600/10', icon: Medal, label: '#3' },
];

const listColors = [
  'border-green-500/20',
  'border-green-500/15',
];

export function TopPlayers() {
  const [first, second, third, ...rest] = topPlayers;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-10 sm:mb-12"
      >
        <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
          <Trophy className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold">
            <span className="text-gradient">Top Players</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted">Kills leaderboard</p>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-end justify-center gap-4 sm:gap-6 mb-8">
        {[second, first, third].map((player, index) => {
          const podiumIndex = index === 0 ? 1 : index === 1 ? 0 : 2;
          const podium = podiumColors[podiumIndex];
          const PodiumIcon = podium.icon;
          const isFirst = podiumIndex === 0;
          const height = isFirst ? 'h-48' : index === 0 ? 'h-36' : 'h-28';

          return (
            <motion.div
              key={player.username}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: podiumIndex * 0.15 }}
              viewport={{ once: true }}
              className={`flex-1 max-w-xs w-full ${height}`}
            >
              <div className={`h-full glass-card rounded-xl border-2 ${podium.border} ${podium.bg} p-4 sm:p-5 flex flex-col items-center justify-end text-center relative`}>
                <div className={`absolute -top-4 ${isFirst ? 'scale-110' : 'scale-90'}`}>
                  <PodiumIcon className={`w-6 h-6 ${isFirst ? 'text-gold-400' : podiumIndex === 1 ? 'text-gray-400' : 'text-amber-600'}`} />
                </div>

                <Avatar
                  src={player.avatar || undefined}
                  alt={player.username}
                  size={isFirst ? 'lg' : 'md'}
                  className="mb-2"
                />

                <p className="text-sm font-bold text-white truncate max-w-full">
                  {player.username}
                </p>

                <Badge variant="gold" className="mt-1">
                  {player.tier}
                </Badge>

                <div className="flex items-center gap-1.5 mt-2">
                  <Crosshair className={`w-3.5 h-3.5 ${getRankColor(player.tier)}`} />
                  <span className={`text-sm font-heading font-bold ${getRankColor(player.tier)}`}>
                    {formatNumber(player.value)}
                  </span>
                </div>

                <span className="text-xs text-muted mt-1">
                  {podium.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-xl mx-auto space-y-2">
        {rest.map((player, i) => (
          <motion.div
            key={player.username}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
            viewport={{ once: true }}
            className={`flex items-center gap-3 glass-card rounded-xl border ${listColors[i]} px-4 py-3`}
          >
            <span className="w-6 text-center text-sm font-heading font-bold text-muted">
              #{player.rank}
            </span>

            <Avatar
              src={player.avatar || undefined}
              alt={player.username}
              size="sm"
            />

            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-gray-200 truncate block">
                {player.username}
              </span>
            </div>

            <Badge variant="gold" size="sm">
              {player.tier}
            </Badge>

            <div className="flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-sm font-heading font-bold text-gold-400">
                {formatNumber(player.value)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
