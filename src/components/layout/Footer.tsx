import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DiscordIcon } from '@/components/ui/SocialIcons';
import { useMcServerStatus } from '@/hooks/useMcServerStatus';

export function Footer() {
  const { playersOnline, loading } = useMcServerStatus();
  return (
    <footer className="relative border-t border-border mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-950/10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-gold-500 flex items-center justify-center font-heading font-bold text-xs text-stone-950">B</div>
              <span className="font-heading font-bold text-sm bg-gradient-to-r from-cyan-400 to-gold-400 bg-clip-text text-transparent">BhukkadSMP</span>
            </Link>
            <p className="text-sm text-muted mb-4 leading-relaxed">
              Asia's First CPvP Battle Royale. Practice PvP, compete in custom arenas.
            </p>
            <div className="flex items-center gap-2">
              <a href="https://discord.gg/s7CETJXYhf" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 rounded-lg text-[#5865F2] transition-colors">
                <DiscordIcon className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@Bhukkaddsmp" target="_blank" rel="noopener noreferrer" className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-heading font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'Store', path: '/store' },
                { label: 'Ranks', path: '/ranks' },
                { label: 'Leaderboards', path: '/leaderboards' },
                { label: 'Teams', path: '/teams' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="group inline-flex items-center gap-1 text-sm text-muted hover:text-cyan-400 transition-colors">
                    {link.label}
                    <span className="inline-block w-0 group-hover:w-3 h-px bg-cyan-400 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-heading font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Keys', path: '/keys' },
                { label: 'Crates', path: '/crates' },
                { label: 'Support', path: '/support' },
                { label: 'FAQ', path: '/support' },
                { label: 'Rules', path: '/rules' },
                { label: 'Privacy Policy', path: '/privacy' },
                { label: 'Terms of Service', path: '/terms' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="group inline-flex items-center gap-1 text-sm text-muted hover:text-cyan-400 transition-colors">
                    {link.label}
                    <span className="inline-block w-0 group-hover:w-3 h-px bg-cyan-400 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-heading font-bold text-white mb-4">Account</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Login', path: '/login' },
                { label: 'Register', path: '/register' },
                { label: 'Dashboard', path: '/dashboard' },
                { label: 'Profile', path: '/profile' },
                { label: 'Settings', path: '/profile' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="group inline-flex items-center gap-1 text-sm text-muted hover:text-cyan-400 transition-colors">
                    {link.label}
                    <span className="inline-block w-0 group-hover:w-3 h-px bg-cyan-400 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-heading font-bold text-white mb-4">Server IP</h3>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted mb-1">Connect Now</p>
              <p className="font-heading font-bold text-sm text-cyan-400">play.bhukkadsmp.fun</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`w-2 h-2 rounded-full ${playersOnline > 0 ? 'bg-cyan-500 animate-pulse-glow' : 'bg-red-500'} shrink-0`} />
                <span className="text-xs text-cyan-400">
                  {loading ? 'Fetching...' : `${playersOnline.toLocaleString()} online`}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">&copy; {new Date().getFullYear()} BhukkadSMP. All rights reserved. Not affiliated with Mojang Studios.</p>
          <div className="flex items-center gap-3 sm:gap-5">
            <Link to="/rules" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors font-medium">Rules</Link>
            <span className="text-border text-xs">|</span>
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors font-medium">Privacy Policy</Link>
            <span className="text-border text-xs">|</span>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors font-medium">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
