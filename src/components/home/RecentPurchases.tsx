import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { formatRelativeTime, formatNumber } from '@/lib/utils';
import { RECENT_PURCHASES } from '@/lib/mock-data';

export function RecentPurchases() {
  const purchases = RECENT_PURCHASES.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold">
            <span className="text-gradient">Recent Purchases</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted">Real-time store activity</p>
        </div>
      </motion.div>

      <div className="glass-card rounded-xl border border-border overflow-hidden">
        <div className="divide-y divide-border/50">
          {purchases.map((purchase, i) => (
            <motion.div
              key={`${purchase.username}-${purchase.date}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 sm:py-4 hover:bg-white/5 transition-colors group"
            >
              <div className="relative shrink-0">
                <Avatar
                  src={purchase.avatar || undefined}
                  alt={purchase.username}
                  size="md"
                />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse-glow border-2 border-stone-950" />
              </div>

              <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="text-sm font-medium text-gray-200 truncate max-w-[120px] sm:max-w-none">
                      {purchase.username}
                    </span>
                    <span className="text-[11px] sm:text-xs text-muted">
                      purchased
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 truncate max-w-[160px] sm:max-w-none">
                    {purchase.item}
                  </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-sm sm:text-base font-heading font-bold text-gold-400">
                  ${purchase.amount.toFixed(2)}
                </p>
                <p className="text-[10px] sm:text-xs text-muted">
                  {formatRelativeTime(purchase.date)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="px-4 sm:px-6 py-3 bg-white/5 border-t border-border/50">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-glow" />
            <span className="text-xs text-muted">Live — purchases update in real-time</span>
          </div>
        </div>
      </div>
    </section>
  );
}
