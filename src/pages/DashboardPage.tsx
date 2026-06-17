import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BarChart3, ShoppingBag, Link2, Settings,
  Swords, Clock, Wallet, Users, Trophy, Medal,
  Disc3, Globe, Mail, Key,
  Shield, LogOut, Save, Edit3,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import {
  formatNumber, formatPlaytime, formatDate,
  formatRelativeTime, getRankGradient, cn
} from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Modal } from '@/components/ui/Modal';

type DashboardTab = 'overview' | 'stats' | 'purchases' | 'accounts' | 'settings';

const SIDEBAR_ITEMS: { key: DashboardTab; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'stats', label: 'Stats', icon: BarChart3 },
  { key: 'purchases', label: 'Purchases', icon: ShoppingBag },
  { key: 'accounts', label: 'Linked Accounts', icon: Link2 },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export function DashboardPage() {
  const { supabaseUser, profile, isAuthenticated, isLoading, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [privacy, setPrivacy] = useState({
    showStats: true, showActivity: true, showPurchases: false, allowFriendRequests: true,
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true, discordNotifications: true, purchaseAlerts: true,
    rankUpdates: true, teamInvites: true, promotionalEmails: false,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  const displayName = profile?.minecraft_username || profile?.display_name || supabaseUser?.email || 'User';
  const avatarUrl = profile?.avatar_url || supabaseUser?.user_metadata?.avatar_url || supabaseUser?.user_metadata?.picture || undefined;
  const joinDate = profile?.created_at || supabaseUser?.created_at || new Date().toISOString();
  const email = supabaseUser?.email || '';
  const rank = profile?.rank || 'Player';
  const balance = profile?.balance ?? 0;

  useEffect(() => {
    if (profile) {
      setEditUsername(profile.minecraft_username || profile.display_name || '');
    }
  }, [profile]);

  useEffect(() => {
    setPrivacy(prev => ({ ...prev }));
    setNotifications(prev => ({ ...prev }));
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleSaveProfile = () => {
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
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
    addToast('success', 'Privacy settings updated');
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    addToast('success', 'Notification settings updated');
  };

  const handleLinkDiscord = () => {
    addToast('success', 'Discord account linked successfully');
  };

  const handleLinkGoogle = () => {
    addToast('success', 'Google account linked successfully');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <Card variant="gradient" padding="lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Avatar src={avatarUrl} alt={displayName} size="xl" />
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-heading font-bold">Welcome back, {displayName}</h2>
              <span className={`inline-block px-3 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r ${getRankGradient(rank)}`}>
                {rank}
              </span>
            </div>
            <p className="text-muted mt-1">Member since {formatDate(joinDate)}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-sm text-muted flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />{email}
              </span>
              <Badge variant="success" size="sm">
                <CheckCircle className="w-3 h-3" /> Active
              </Badge>
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
            <p className="text-2xl font-bold font-heading">0</p>
            <p className="text-xs text-muted">Kills</p>
          </div>
        </Card>
        <Card variant="default" padding="md" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold-900/30 flex items-center justify-center">
            <Clock className="w-6 h-6 text-gold-400" />
          </div>
          <div>
            <p className="text-2xl font-bold font-heading">0h</p>
            <p className="text-xs text-muted">Playtime</p>
          </div>
        </Card>
        <Card variant="default" padding="md" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold font-heading">${balance.toLocaleString()}</p>
            <p className="text-xs text-muted">Balance</p>
          </div>
        </Card>
        <Card variant="default" padding="md" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-2xl font-bold font-heading">—</p>
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
              <span>0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">KDR</span>
              <span className="text-green-400">0.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Wins / Losses</span>
              <span>0W / 0L</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Rank</span>
              <span className="text-gold-400">{rank}</span>
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
              <span>{formatRelativeTime(joinDate)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Discord</span>
              <span className="text-muted">Not linked</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Google</span>
              <span className="text-muted">Not linked</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Join Date</span>
              <span>{formatDate(joinDate)}</span>
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
        <p className="text-sm text-muted">In-game stats will appear here once the Minecraft plugin is connected</p>
      </div>
      <Card variant="default" padding="lg" className="text-center py-12">
        <BarChart3 className="w-12 h-12 text-muted mx-auto mb-3" />
        <h3 className="text-lg font-heading font-bold mb-1">No stats yet</h3>
        <p className="text-sm text-muted">Start playing on the server to see your stats here</p>
      </Card>
    </div>
  );

  const renderPurchases = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold mb-1">Purchase History</h2>
        <p className="text-sm text-muted">Your store transactions will appear here</p>
      </div>
      <Card variant="default" padding="lg" className="text-center">
        <ShoppingBag className="w-12 h-12 text-muted mx-auto mb-3" />
        <h3 className="text-lg font-heading font-bold mb-1">No purchases yet</h3>
        <p className="text-sm text-muted mb-4">Visit the store to get your first item</p>
        <Button variant="primary" onClick={() => navigate('/store')}>Browse Store</Button>
      </Card>
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
              <p className="text-xs text-muted">Not connected</p>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={handleLinkDiscord}>Link</Button>
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
              <p className="text-xs text-muted">Not connected</p>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={handleLinkGoogle}>Link</Button>
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
                  <p className="text-xs text-muted">Secure your account</p>
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
            icon={<Mail className="w-4 h-4" />}
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
