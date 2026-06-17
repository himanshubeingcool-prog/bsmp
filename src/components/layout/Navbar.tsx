import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, ShoppingCart, ChevronDown, User, LogOut,
  Store, Trophy, Users, Swords, Key, Package, Shield, HeadphonesIcon, Settings, LayoutDashboard
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar } from '@/components/ui/Avatar';

const NAV_ITEMS = [
  { label: 'Store', path: '/store', icon: Store },
  { label: 'Ranks', path: '/ranks', icon: Shield },
  { label: 'Keys', path: '/keys', icon: Key },
  { label: 'Crates', path: '/crates', icon: Package },
  { label: 'Leaderboards', path: '/leaderboards', icon: Trophy },
  { label: 'Teams', path: '/teams', icon: Users },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { supabaseUser, profile, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const displayName = profile?.minecraft_username || profile?.display_name || supabaseUser?.user_metadata?.full_name || supabaseUser?.email || 'User';
  const avatarUrl = profile?.avatar_url || supabaseUser?.user_metadata?.avatar_url || supabaseUser?.user_metadata?.picture || undefined;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-xl border-b border-border" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-500 to-gold-500 flex items-center justify-center font-heading font-bold text-xs sm:text-sm text-stone-950 group-hover:scale-105 transition-transform">
              B
            </div>
            <div>
              <span className="font-heading font-bold text-sm sm:text-base bg-gradient-to-r from-green-400 to-gold-400 bg-clip-text text-transparent">BhukkadSMP</span>
              <span className="hidden sm:block text-[10px] text-muted -mt-0.5">Premium Survival</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {[
              { label: 'Home', path: '/' },
              ...NAV_ITEMS,
              { label: 'Support', path: '/support' },
            ].map(item => {
              const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
              const Icon = (item as any).icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group px-3 py-2"
                >
                  <span className={`relative z-10 flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-green-400' : 'text-gray-300 group-hover:text-white'}`}>
                    {Icon && <Icon className="w-4 h-4" />}
                    {item.label}
                  </span>
                  <span className={`absolute bottom-0 left-1/2 h-0.5 bg-green-400 rounded-full transition-all duration-300 -translate-x-1/2 ${isActive ? 'w-4/5' : 'w-0 group-hover:w-3/5'}`} />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/store" className="relative p-1.5 sm:p-2 text-gray-400 hover:text-green-400 transition-colors">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-500 rounded-full text-[9px] sm:text-[10px] font-bold flex items-center justify-center text-stone-950">3</span>
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Avatar src={avatarUrl} alt={displayName} size="sm" />
                  <span className="hidden sm:block text-sm font-medium max-w-[120px] truncate">{displayName}</span>
                  <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-gray-500" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-xl shadow-2xl z-20 overflow-hidden animate-scale-in">
                      <div className="p-3 border-b border-border">
                        <p className="text-sm font-medium truncate">{displayName}</p>
                        <p className="text-xs text-muted truncate">{supabaseUser?.email}</p>
                      </div>
                      <div className="p-1">
                        <Link to="/dashboard" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors">
                          <LayoutDashboard className="w-4 h-4 text-gray-400" />
                          Dashboard
                        </Link>
                        <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors">
                          <User className="w-4 h-4 text-gray-400" />
                          Profile
                        </Link>
                        <Link to="/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-white/5 transition-colors">
                          <Settings className="w-4 h-4 text-gray-400" />
                          Settings
                        </Link>
                        <button onClick={() => { logout(); setUserMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-white/5 text-red-400 transition-colors cursor-pointer">
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-green-600 hover:bg-green-500 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all shadow-lg shadow-green-600/20">
                Login
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-stone-950/95 backdrop-blur-xl border-b border-border animate-slide-up">
          <div className="p-4 space-y-1">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">Home</Link>
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
                  <Icon className="w-4 h-4 text-gray-400" />
                  {item.label}
                </Link>
              );
            })}
            <Link to="/support" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
              <HeadphonesIcon className="w-4 h-4 text-gray-400" />
              Support
            </Link>
            {isAuthenticated ? (
              <>
                <hr className="border-border my-2" />
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
                  <LayoutDashboard className="w-4 h-4 text-gray-400" />
                  Dashboard
                </Link>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
                  <User className="w-4 h-4 text-gray-400" />
                  Profile
                </Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-white/5 transition-colors cursor-pointer">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <hr className="border-border my-2" />
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-green-400 hover:bg-green-500/10 transition-colors">Login / Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
