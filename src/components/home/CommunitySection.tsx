import { motion } from 'framer-motion';
import { MessageCircle, ExternalLink, Users, Signal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DiscordIcon } from '@/components/ui/SocialIcons';

export function CommunitySection() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            <span className="text-gradient">Join Our Community</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Connect with thousands of players on Discord and in-game
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="glass-card rounded-xl p-6 sm:p-8 border border-border hover:border-green-500/20 transition-colors h-full">
              <div className="flex items-start gap-4 sm:gap-5 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2] shrink-0">
                  <DiscordIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-white">Discord Server</h3>
                  <p className="text-xs sm:text-sm text-muted mt-1">Join 12,847 members online</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">12,847 Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Signal className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">2,341 Online</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: '#announcements', desc: 'Server updates & news' },
                  { label: '#general-chat', desc: 'Talk with the community' },
                  { label: '#support', desc: 'Get help from staff' },
                ].map(channel => (
                  <div key={channel.label} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <div>
                      <span className="text-sm font-medium text-gray-200">{channel.label}</span>
                      <span className="text-xs text-muted ml-2">{channel.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="primary" fullWidth icon={<MessageCircle className="w-4 h-4" />}>
                Join Discord Server
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <div className="glass-card rounded-xl p-6 sm:p-8 border border-border hover:border-gold-500/20 transition-colors text-center">
              <h3 className="text-sm font-heading font-bold text-gold-400 mb-3">Server IP</h3>
              <div className="bg-stone-950/50 rounded-lg p-3 mb-4">
                <p className="font-heading font-bold text-base sm:text-lg text-green-400">
                  play.bhukkadsmp.com
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow" />
                <span className="text-xs sm:text-sm text-green-400">1,247 players online</span>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 sm:p-8 border border-border hover:border-green-500/20 transition-colors text-center">
              <h3 className="text-sm font-heading font-bold text-green-400 mb-4">Follow Us</h3>
              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://discord.gg/bhukkadsmp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#5865F2]/10 hover:bg-[#5865F2]/20 text-[#5865F2] transition-all hover:scale-105"
                >
                  <DiscordIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/bhukkadsmp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@bhukkadsmp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://twitch.tv/bhukkadsmp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.428l-3 3v-3H6.857V1.714h13.714Z" />
                  </svg>
                </a>
              </div>
              <p className="text-xs text-muted mt-4">Stay connected and never miss an update</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
