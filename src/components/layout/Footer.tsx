import { Link } from 'react-router-dom';
import { DiscordIcon, GoogleIcon } from '@/components/ui/SocialIcons';

export function Footer() {
  return (
    <footer className="relative border-t border-border mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-950/10" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-gold-500 flex items-center justify-center font-heading font-bold text-xs text-stone-950">B</div>
              <span className="font-heading font-bold text-sm bg-gradient-to-r from-green-400 to-gold-400 bg-clip-text text-transparent">BhukkadSMP</span>
            </Link>
            <p className="text-sm text-muted mb-4 leading-relaxed">
              Premium Minecraft Survival Experience. Join thousands of players in the ultimate adventure.
            </p>
            <div className="flex items-center gap-2">
              <a href="https://discord.gg/s7CETJXYhf" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#5865F2]/10 hover:bg-[#5865F2]/20 rounded-lg text-[#5865F2] transition-colors">
                <DiscordIcon className="w-5 h-5" />
              </a>
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 transition-colors">
                <GoogleIcon className="w-5 h-5" />
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
                  <Link to={link.path} className="text-sm text-muted hover:text-green-400 transition-colors">{link.label}</Link>
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
                  <Link to={link.path} className="text-sm text-muted hover:text-green-400 transition-colors">{link.label}</Link>
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
                  <Link to={link.path} className="text-sm text-muted hover:text-green-400 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-heading font-bold text-white mb-4">Server IP</h3>
            <div className="bg-card border border-border rounded-lg p-3">
              <p className="text-xs text-muted mb-1">Connect Now</p>
              <p className="font-heading font-bold text-sm text-green-400">play.bhukkadsmp.com</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-glow" />
                <span className="text-xs text-green-400">1,247 online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">&copy; {new Date().getFullYear()} BhukkadSMP. All rights reserved. Not affiliated with Mojang Studios.</p>
          <div className="flex items-center gap-3 sm:gap-5">
            <Link to="/rules" className="text-sm text-gray-400 hover:text-green-400 transition-colors font-medium">Rules</Link>
            <span className="text-border text-xs">|</span>
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-green-400 transition-colors font-medium">Privacy Policy</Link>
            <span className="text-border text-xs">|</span>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-green-400 transition-colors font-medium">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
