import { motion } from 'framer-motion';
import { Users, TrendingUp, Wifi, Activity } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CountUp } from '@/components/ui/CountUp';
import { useDiscordStatus } from '@/hooks/useDiscordStatus';
import { useMcServerStatus } from '@/hooks/useMcServerStatus';

export function ServerStats() {
  const { onlineCount, loading: discordLoading } = useDiscordStatus();
  const { playersOnline, playersMax, loading: mcLoading } = useMcServerStatus();

  const stats = [
    { icon: Users, label: 'Online on Discord', value: onlineCount, loading: discordLoading, color: 'text-cyan-400', border: 'border-cyan-500/20', suffix: '' },
    { icon: Wifi, label: 'Online in Server', value: playersOnline, loading: mcLoading, color: 'text-cyan-400', border: 'border-cyan-500/20', suffix: `/${playersMax}` },
    { icon: TrendingUp, label: 'Peak Today', value: 0, loading: false, color: 'text-gold-400', border: 'border-gold-500/20', suffix: '+' },
    { icon: Activity, label: 'Server Version', value: 0, loading: false, color: 'text-gold-400', border: 'border-gold-500/20', suffix: '', isVersion: true },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 relative z-20">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const isLoading = stat.isVersion ? false : stat.loading;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card variant="glass" hover glowOnHover className={`group text-center border ${stat.border}`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/10 mb-3 ${stat.color} transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <p className={`text-xl xs:text-2xl sm:text-3xl font-heading font-bold ${stat.color} mb-1`}>
                  {isLoading ? (
                    <span className="animate-pulse">...</span>
                  ) : stat.isVersion ? (
                    <span className="text-lg sm:text-xl tracking-tight">Purpur 1.21</span>
                  ) : (
                    <span className="inline-block animate-count-pop">
                      <CountUp to={stat.value} duration={2000} />
                      {stat.suffix}
                    </span>
                  )}
                </p>
                <p className="text-[11px] xs:text-xs sm:text-sm text-muted">{stat.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
