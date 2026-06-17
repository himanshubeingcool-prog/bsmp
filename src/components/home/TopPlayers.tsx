import { motion } from 'framer-motion';
import { Trophy, Construction } from 'lucide-react';

export function TopPlayers() {
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="glass-card rounded-xl border border-border p-12 text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-stone-800/50 flex items-center justify-center">
          <Construction className="w-8 h-8 text-gold-400" />
        </div>
        <h3 className="text-lg font-heading font-bold text-gray-300 mb-2">Leaderboard Coming Soon</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          The leaderboard will be populated with real player stats once the Minecraft plugin is connected.
        </p>
      </motion.div>
    </section>
  );
}
