import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  User, Swords, Clock, Wallet, Trophy,
  Users, ShoppingBag, Shield, Settings,
  Key, LogOut, Save, Edit3,
  CheckCircle, Calendar,
  Disc3, Globe, Mail,
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

type ProfileTab = 'profile' | 'edit' | 'settings';

const AVATAR_COLORS = [
  '#22c55e', '#eab308', '#3b82f6', '#a855f7', '#ef4444',
  '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16',
];

export function ProfilePage() {
  const { supabaseUser, profile, isAuthenticated, isLoading, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { username } = useParams();

  const [activeTab, setActiveTab] = useState<ProfileTab>('profile');
  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');
  const [avatarColor, setAvatarColor] = useState('#22c55e');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [privacy, setPrivacy] = useState({
    showStats: true, showActivity: true, showPurchases: false, allowFriendRequests: true,
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true, discordNotifications: true, purchaseAlerts: true,
    rankUpdates: true, teamInvites: true, promotionalEmails: false,
  });

  const displayName = profile?.minecraft_username || profile?.display_name || supabaseUser?.email || 'User';
  const avatarUrl = profile?.avatar_url || supabaseUser?.user_metadata?.avatar_url || supabaseUser?.user_metadata?.picture || undefined;
  const joinDate = profile?.created_at || supabaseUser?.created_at || new Date().toISOString();
  const email = supabaseUser?.email || '';
  const rank = profile?.rank || 'Player';
  const balance = profile?.balance ?? 0;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (profile) {
      setEditUsername(profile.minecraft_username || profile.display_name || '');
    }
  }, [profile]);

  const isOwner = !username || username === displayName;

  const handleSaveProfile = () => {
    addToast('success', 'Profile updated successfully');
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

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const renderProfile = () => (
    <div className="space-y-6">
      <Card variant="gradient" padding="lg" className="text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <Avatar src={avatarUrl} alt={displayName} size="xl" status="online" />
          <div className="flex-1">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <h1 className="text-2xl sm:text-3xl font-heading font-bold">{displayName}</h1>
              <span className={`inline-block px-3 py-0.5 text-xs font-bold rounded-full bg-gradient-to-r ${getRankGradient(rank)}`}>
                {rank}
              </span>
            </div>
            <p className="text-muted mt-1 flex items-center gap-1.5 justify-center sm:justify-start">
              <Calendar className="w-3.5 h-3.5" />
              Member since {formatDate(joinDate)}
            </p>
            <div className="flex items-center gap-3 mt-2 justify-center sm:justify-start">
              <Badge variant="success" size="sm">
                <CheckCircle className="w-3 h-3" /> Online
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {privacy.showStats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card variant="default" padding="md" className="text-center">
            <Swords className="w-5 h-5 text-green-400 mx-auto mb-2" />
            <p className="text-xl font-bold font-heading">0</p>
            <p className="text-xs text-muted">Kills</p>
          </Card>
          <Card variant="default" padding="md" className="text-center">
            <Clock className="w-5 h-5 text-gold-400 mx-auto mb-2" />
            <p className="text-xl font-bold font-heading">0h</p>
            <p className="text-xs text-muted">Playtime</p>
          </Card>
          <Card variant="default" padding="md" className="text-center">
            <Trophy className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <p className="text-xl font-bold font-heading">0</p>
            <p className="text-xs text-muted">Wins</p>
          </Card>
          <Card variant="default" padding="md" className="text-center">
            <Wallet className="w-5 h-5 text-purple-400 mx-auto mb-2" />
            <p className="text-xl font-bold font-heading">${balance.toLocaleString()}</p>
            <p className="text-xs text-muted">Balance</p>
          </Card>
        </div>
      )}

      <Card variant="default" padding="md">
        <h3 className="font-heading font-bold text-sm mb-3">Activity</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted">Last Login</span>
            <span>{formatRelativeTime(joinDate)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Status</span>
            <Badge variant="success" size="sm">Online</Badge>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderEdit = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold mb-1">Edit Profile</h2>
        <p className="text-sm text-muted">Customize your public profile</p>
      </div>

      <Card variant="default" padding="md">
        <h3 className="font-heading font-bold text-sm mb-4">Avatar Color</h3>
        <div className="flex flex-wrap gap-3">
          {AVATAR_COLORS.map(color => (
            <button
              key={color}
              onClick={() => setAvatarColor(color)}
              className={cn(
                'w-10 h-10 rounded-full border-2 transition-all cursor-pointer',
                avatarColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Avatar
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${editUsername || displayName}&backgroundColor=${avatarColor.replace('#', '')}`}
            alt={editUsername || displayName}
            size="lg"
          />
          <span className="text-sm text-muted">Preview</span>
        </div>
      </Card>

      <Card variant="default" padding="md">
        <div className="space-y-4">
          <Input
            label="Username"
            value={editUsername}
            onChange={e => setEditUsername(e.target.value)}
            icon={<User className="w-4 h-4" />}
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
          <Button variant="primary" onClick={handleSaveProfile}>
            <Save className="w-4 h-4" /> Save Changes
          </Button>
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

      {isOwner && (
        <div className="pt-4 border-t border-border">
          <Button variant="danger" icon={<LogOut className="w-4 h-4" />} onClick={() => { logout(); navigate('/'); }}>
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );

  const tabs: { key: ProfileTab; label: string; icon: typeof User }[] = [
    { key: 'profile', label: 'Profile', icon: User },
    ...(isOwner ? [
      { key: 'edit' as const, label: 'Edit Profile', icon: Edit3 },
      { key: 'settings' as const, label: 'Settings', icon: Settings },
    ] : []),
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <User className="w-6 h-6 text-green-400" />
          <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-green-400 to-gold-400 bg-clip-text text-transparent">
            {isOwner ? 'My Profile' : `${displayName}'s Profile`}
          </h1>
        </div>

        <div className="flex gap-1 mb-8 p-1 bg-card border border-border rounded-xl overflow-x-auto">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer',
                activeTab === key
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'edit' && renderEdit()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
}
