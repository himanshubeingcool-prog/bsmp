import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BarChart3, ShoppingBag, Link2, Settings,
  Swords, Clock, Wallet, Users, Trophy, Medal,
  Disc3, Globe, User as UserIcon, Mail, Calendar,
  ChevronRight, Eye, EyeOff, Bell, BellOff,
  Shield, Key, LogOut, Save, X, Edit3,
  CheckCircle, AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { MOCK_USER } from '@/lib/mock-data';
import {
  formatNumber, formatPlaytime, formatDate,
  formatRelativeTime, getRankColor, getRankGradient, cn
} from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';
import type { User } from '@/types';

type DashboardTab = 'overview' | 'stats' | 'purchases' | 'accounts' | 'settings';

const SIDEBAR_ITEMS: { key: DashboardTab; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'stats', label: 'Stats', icon: BarChart3 },
  { key: 'purchases', label: 'Purchases', icon: ShoppingBag },
  { key: 'accounts', label: 'Linked Accounts', icon: Link2 },
  { key: 'settings', label: 'Settings', icon: Settings },
];

const STATS_ROWS: { label: string; key: keyof typeof MOCK_USER_STATS; icon: typeof Swords }[] = [
  { label: 'Kills', key: 'kills', icon: Swords },
  { label: 'Deaths', key: 'deaths', icon: Swords },
  { label: 'KDR', key: 'kdr', icon: Medal },
  { label: 'Wins', key: 'wins', icon: Trophy },
  { label: 'Losses', key: 'losses', icon: Trophy },
  { label: 'Games Played', key: 'gamesPlayed', icon: BarChart3 },
  { label: 'Blocks Placed', key: 'blocksPlaced', icon: BarChart3 },
  { label: 'Blocks Broken', key: 'blocksBroken', icon: BarChart3 },
  { label: 'Mobs Killed', key: 'mobsKilled', icon: Swords },
  { label: 'Distance Traveled', key: 'distanceTraveled', icon: BarChart3 },
];

const MOCK_USER_STATS = {
  kills: 2847, deaths: 1532, kdr: 1.86, playtime: 1248,
  wins: 342, losses: 189, gamesPlayed: 531,
  blocksPlaced: 45231, blocksBroken: 38912,
  mobsKilled: 12453, distanceTraveled: 84521,
};

export function DashboardPage() {
  const { supabaseUser, profile, isAuthenticated, isLoading, logout } = useAuth();
  const user = MOCK_USER; // Use mock data for extended fields; replace with real data later
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [privacy, setPrivacy] = useState(user?.privacySettings ?? {
    showStats: true, showActivity: true, showPurchases: false, allowFriendRequests: true,
  });
  const [notifications, setNotifications] = useState(user?.notificationSettings ?? {
    emailNotifications: true, discordNotifications: true, purchaseAlerts: true,
    rankUpdates: true, teamInvites: true, promotionalEmails: false,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setEditUsername(user.username);
      setPrivacy(user.privacySettings);
      setNotifications(user.notificationSettings);
    }
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSaveProfile = () => {
    addToast('success', 'Updated successfully');
    addToast('success', 'Profile updated successfully');
    setShowEditModal(false);
  };

  const handleChangePassword = () => {
    if (!passwords.new || passwords.new.length < 6) {
      addToast('error', 'Password must be at least 6 characters');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      addToast('error', 'Passwords do not match');
      return;
    }
    addToast('success', 'Password changed successfully');
    setPasswords({ current: '', new: '', confirm: '' });
    setShowPasswordForm(false);
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    const next = { ...privacy, [key]: !privacy[key] };
    setPrivacy(next);
    addToast('success', 'Updated successfully');
    addToast('success', 'Privacy settings updated');
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    const next = { ...notifications, [key]: !notifications[key] };
    setNotifications(next);
    addToast('success', 'Updated successfully');
    addToast('success', 'Notification settings updated');
  };

  const handleLinkDiscord = () => {
    addToast('success', 'Updated successfully');
    addToast('success', 'Discord account linked successfully');
  };

  const handleUnlinkDiscord = () => {
    addToast('success', 'Updated successfully');
    addToast('success', 'Discord account unlinked');
  };

  const handleLinkGoogle = () => {
    addToast('success', 'Updated successfully');
    addToast('success', 'Google account linked successfully');
  };

  const handleUnlinkGoogle = () => {
    addToast('success', 'Updated successfully');
    addToast('success', 'Google account unlinked');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <Card variant="gradient" padding="lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar src={user.avatar} alt={user.username} size="xl" />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-heading font-bold">Welcome back, {user.username}</h2>
              <span className={`inline-block px-3 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r ${getRankGradient(user.rank)}`}>
                {user.rank}
              </span>
            </div>
            <p className="text-muted mt-1">Member since {formatDate(user.joinDate)}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-muted flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />{user.email}
              </span>
              {user.verified && (
                <Badge variant="success" size="sm">
                  <CheckCircle className="w-3 h-3" /> Verified
                </Badge>
              )}
            </div>
          </div>
          <Button variant="secondary" size="sm" icon={<Edit3 className="w-4 h-4" />} onClick={() => setShowEditModal(true)}>
            Edit Profile
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="default" padding="md" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center">
            <Swords className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <p className="text-2xl font-bold font-heading">{formatNumber(user.stats?.kills ?? 0)}</p>
            <p className="text-xs text-muted">Kills</p>
          </div>
        </Card>
        <Card variant="default" padding="md" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold-900/30 flex items-center justify-center">
            <Clock className="w-6 h-6 text-gold-400" />
          </div>
          <div>
            <p className="text-2xl font-bold font-heading">{formatPlaytime(user.stats?.playtime ?? 0)}</p>
            <p className="text-xs text-muted">Playtime</p>
          </div>
        </Card>
        <Card variant="default" padding="md" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold font-heading">${user.balance.toLocaleString()}</p>
            <p className="text-xs text-muted">Balance</p>
          </div>
        </Card>
        <Card variant="default" padding="md" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-2xl font-bold font-heading">{user.team ? user.team.name : 'None'}</p>
            <p className="text-xs text-muted">Team</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card variant="default" padding="md">
          <h3 className="font-heading font-bold text-sm mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Deaths</span>
              <span>{formatNumber(user.stats?.deaths ?? 0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">KDR</span>
              <span className="text-green-400">{user.stats?.kdr?.toFixed(2) ?? 'N/A'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Wins / Losses</span>
              <span>{user.stats?.wins ?? 0}W / {user.stats?.losses ?? 0}L</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Coins</span>
              <span className="text-gold-400">{formatNumber(user.coins)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Gems</span>
              <span className="text-cyan-400">{formatNumber(user.gems)}</span>
            </div>
          </div>
        </Card>
        <Card variant="default" padding="md">
          <h3 className="font-heading font-bold text-sm mb-3">Account Info</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Status</span>
              <Badge variant="success" size="sm">Online</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Last Login</span>
              <span>{formatRelativeTime(user.lastLogin)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Discord</span>
              <span className={user.discordLinked ? 'text-green-400' : 'text-muted'}>
                {user.discordLinked ? 'Linked' : 'Not linked'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Google</span>
              <span className={user.googleLinked ? 'text-green-400' : 'text-muted'}>
                {user.googleLinked ? 'Linked' : 'Not linked'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Join Date</span>
              <span>{formatDate(user.joinDate)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold mb-1">Detailed Statistics</h2>
        <p className="text-sm text-muted">All your in-game stats at a glance</p>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Stat</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody>
              {STATS_ROWS.map(({ label, key, icon: Icon }, i) => (
                <tr key={key} className="border-b border-border/50 hover:bg-white/5 transition-colors animate-slide-up" style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-muted" />
                      <span className="text-sm">{label}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-medium">
                      {key === 'kdr' ? (user.stats?.kdr ?? 0).toFixed(2) :
                       key === 'distanceTraveled' ? formatNumber(user.stats?.distanceTraveled ?? 0) :
                       key === 'playtime' ? formatPlaytime(user.stats?.playtime ?? 0) :
                       formatNumber(user.stats?.[key as keyof typeof MOCK_USER_STATS] ?? 0)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderPurchases = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold mb-1">Purchase History</h2>
        <p className="text-sm text-muted">All your store transactions</p>
      </div>
      {user.purchases.length > 0 ? (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Product</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Amount</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Date</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-muted uppercase tracking-wider">Payment</th>
                </tr>
              </thead>
              <tbody>
                {user.purchases.map((p, i) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-white/5 transition-colors animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium">{p.productName}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm">${p.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-sm text-muted">{formatDate(p.date)}</td>
                    <td className="px-4 py-3 text-right">
                      <Badge
                        variant={p.status === 'completed' ? 'success' : p.status === 'pending' ? 'warning' : 'danger'}
                        size="sm"
                      >
                        {p.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-muted">{p.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card variant="default" padding="lg" className="text-center">
          <ShoppingBag className="w-12 h-12 text-muted mx-auto mb-3" />
          <h3 className="text-lg font-heading font-bold mb-1">No purchases yet</h3>
          <p className="text-sm text-muted mb-4">Visit the store to get your first item</p>
          <Button variant="primary" onClick={() => navigate('/store')}>Browse Store</Button>
        </Card>
      )}
    </div>
  );

  const renderAccounts = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold mb-1">Linked Accounts</h2>
        <p className="text-sm text-muted">Connect your accounts for a seamless experience</p>
      </div>

      <Card variant="default" padding="md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-900/30 flex items-center justify-center">
              <Disc3 className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm">Discord</h3>
              <p className="text-xs text-muted">{user.discordLinked ? `Linked (${user.discordId})` : 'Not connected'}</p>
            </div>
          </div>
          {user.discordLinked ? (
            <Button variant="danger" size="sm" onClick={handleUnlinkDiscord}>Unlink</Button>
          ) : (
            <Button variant="primary" size="sm" onClick={handleLinkDiscord}>Link</Button>
          )}
        </div>
      </Card>

      <Card variant="default" padding="md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center">
              <Globe className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm">Google</h3>
              <p className="text-xs text-muted">{user.googleLinked ? 'Connected' : 'Not connected'}</p>
            </div>
          </div>
          {user.googleLinked ? (
            <Button variant="danger" size="sm" onClick={handleUnlinkGoogle}>Unlink</Button>
          ) : (
            <Button variant="primary" size="sm" onClick={handleLinkGoogle}>Link</Button>
          )}
        </div>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-heading font-bold mb-1">Settings</h2>
        <p className="text-sm text-muted">Manage your account preferences</p>
      </div>

      <div>
        <h3 className="text-sm font-heading font-bold text-muted uppercase tracking-wider mb-4">Privacy Settings</h3>
        <div className="space-y-3">
          {[
            { key: 'showStats' as const, label: 'Show Stats', desc: 'Display your stats on your public profile' },
            { key: 'showActivity' as const, label: 'Show Activity', desc: 'Show your online status and activity' },
            { key: 'showPurchases' as const, label: 'Show Purchases', desc: 'Display your recent purchases on your profile' },
            { key: 'allowFriendRequests' as const, label: 'Allow Friend Requests', desc: 'Allow other players to send you friend requests' },
          ].map(({ key, label, desc }) => (
            <Card key={key} variant="default" padding="sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted">{desc}</p>
                </div>
                <button
                  onClick={() => togglePrivacy(key)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    privacy[key] ? 'bg-green-600' : 'bg-gray-700'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    privacy[key] ? 'translate-x-5' : ''
                  }`} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-heading font-bold text-muted uppercase tracking-wider mb-4">Notification Settings</h3>
        <div className="space-y-3">
          {[
            { key: 'emailNotifications' as const, label: 'Email Notifications', desc: 'Receive notifications via email' },
            { key: 'discordNotifications' as const, label: 'Discord Notifications', desc: 'Receive notifications on Discord' },
            { key: 'purchaseAlerts' as const, label: 'Purchase Alerts', desc: 'Get alerts for your purchases' },
            { key: 'rankUpdates' as const, label: 'Rank Updates', desc: 'Get notified about rank changes' },
            { key: 'teamInvites' as const, label: 'Team Invites', desc: 'Receive team invitation requests' },
            { key: 'promotionalEmails' as const, label: 'Promotional Emails', desc: 'Receive promotional offers and updates' },
          ].map(({ key, label, desc }) => (
            <Card key={key} variant="default" padding="sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted">{desc}</p>
                </div>
                <button
                  onClick={() => toggleNotification(key)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    notifications[key] ? 'bg-green-600' : 'bg-gray-700'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    notifications[key] ? 'translate-x-5' : ''
                  }`} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-heading font-bold text-muted uppercase tracking-wider mb-4">Security</h3>
        <Card variant="default" padding="md">
          {showPasswordForm ? (
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-sm">Change Password</h4>
              <Input
                label="Current Password"
                type="password"
                value={passwords.current}
                onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
              />
              <Input
                label="New Password"
                type="password"
                value={passwords.new}
                onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))}
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={passwords.confirm}
                onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
              />
              <div className="flex gap-2">
                <Button variant="primary" onClick={handleChangePassword}>
                  <Save className="w-4 h-4" /> Update Password
                </Button>
                <Button variant="ghost" onClick={() => { setShowPasswordForm(false); setPasswords({ current: '', new: '', confirm: '' }); }}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center">
                  <Key className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm">Password</h4>
                  <p className="text-xs text-muted">Last changed 30 days ago</p>
                </div>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setShowPasswordForm(true)}>
                <Shield className="w-4 h-4" /> Change
              </Button>
            </div>
          )}
        </Card>
      </div>

      <div className="pt-4 border-t border-border">
        <Button variant="danger" icon={<LogOut className="w-4 h-4" />} onClick={() => { logout(); navigate('/'); }}>
          Sign Out
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'stats': return renderStats();
      case 'purchases': return renderPurchases();
      case 'accounts': return renderAccounts();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard className="w-6 h-6 text-green-400" />
          <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-green-400 to-gold-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-56 shrink-0">
            <nav className="flex lg:flex-col gap-1 p-1 bg-card border border-border rounded-xl lg:sticky lg:top-24 overflow-x-auto">
              {SIDEBAR_ITEMS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer',
                    activeTab === key
                      ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </div>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Profile" size="md">
        <div className="space-y-4">
          <Input
            label="Username"
            value={editUsername}
            onChange={e => setEditUsername(e.target.value)}
            icon={<UserIcon className="w-4 h-4" />}
          />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Bio</label>
            <textarea
              value={editBio}
              onChange={e => setEditBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
              className="w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 resize-none"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="primary" onClick={handleSaveProfile}>
              <Save className="w-4 h-4" /> Save Changes
            </Button>
            <Button variant="ghost" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
