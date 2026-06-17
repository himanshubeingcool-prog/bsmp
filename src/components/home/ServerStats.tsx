import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, TrendingUp, UserPlus, Activity } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { formatNumber } from '@/lib/utils';
import { useDiscordStatus } from '@/hooks/useDiscordStatus';

interface StatCounterProps {
  end: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

function StatCounter({ end, suffix = '', decimals = 0, duration = 2 }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  const display = end >= 1000 ? formatNumber(count) : count.toFixed(decimals);

  return <span ref={ref}>{display}{suffix}</span>;
}

export function ServerStats() {
  const { onlineCount, loading } = useDiscordStatus();

  const stats = [
    { icon: Users, label: 'Online on Discord', value: onlineCount, color: 'text-green-400', border: 'border-green-500/30' },
    { icon: TrendingUp, label: 'Peak Players', value: 0, color: 'text-gold-400', border: 'border-gold-500/30' },
    { icon: UserPlus, label: 'Total Registered', value: 0, color: 'text-blue-400', border: 'border-blue-500/30' },
    { icon: Activity, label: 'Server TPS', value: 0, suffix: '', decimals: 1, color: 'text-purple-400', border: 'border-purple-500/30' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 relative z-20">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const isZero = stat.value === 0 && stat.label !== 'Online on Discord';
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card variant="glass" className={`text-center border ${stat.border}`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/10 mb-3 ${stat.color}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <p className={`text-xl xs:text-2xl sm:text-3xl font-heading font-bold ${stat.color} mb-1`}>
                  {isZero ? (
                    <span>—</span>
                  ) : stat.label === 'Online on Discord' && loading ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <StatCounter
                      end={stat.value}
                      suffix={stat.label === 'Online on Discord' ? '' : '+'}
                      decimals={stat.decimals ?? 0}
                    />
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
