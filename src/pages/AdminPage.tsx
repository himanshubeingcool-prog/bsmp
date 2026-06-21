import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Users, Package, ShoppingCart, Trophy,
  Settings, BarChart3, Shield, Search, MoreVertical,
  ChevronLeft, LogOut
} from 'lucide-react';

const ADMIN_NAV = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'leaderboards', label: 'Leaderboards', icon: Trophy },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const MOCK_USERS = [
  { id: 1, username: 'xBlaze_Knight', email: 'blaze@example.com', rank: 'MVP+', balance: 15250, status: 'active', joinDate: '2024-03-12' },
  { id: 2, username: 'ShadowStrike_', email: 'shadow@example.com', rank: 'Elite', balance: 28400, status: 'active', joinDate: '2024-02-08' },
  { id: 3, username: 'NightHawk42', email: 'hawk@example.com', rank: 'Immortal', balance: 42100, status: 'active', joinDate: '2024-01-15' },
  { id: 4, username: 'DragonSlayer99', email: 'dragon@example.com', rank: 'Legend', balance: 98700, status: 'active', joinDate: '2023-11-20' },
  { id: 5, username: 'BannedUser', email: 'banned@example.com', rank: 'Player', balance: 0, status: 'banned', joinDate: '2024-05-01' },
  { id: 6, username: 'NewPlayer42', email: 'new@example.com', rank: 'Player', balance: 250, status: 'pending', joinDate: '2024-10-01' },
];

const MOCK_ORDERS = [
  { id: 'ORD-001', user: 'xBlaze_Knight', product: 'MVP+ Rank', amount: 34.99, date: '2024-09-28', status: 'completed' },
  { id: 'ORD-002', user: 'ShadowStrike_', product: 'Mythic Crate', amount: 59.99, date: '2024-09-27', status: 'completed' },
  { id: 'ORD-003', user: 'PixelWarrior', product: 'Epic Key Bundle', amount: 14.99, date: '2024-09-26', status: 'pending' },
  { id: 'ORD-004', user: 'IcePhoenix_', product: 'Legendary Rank', amount: 99.99, date: '2024-09-25', status: 'refunded' },
  { id: 'ORD-005', user: 'FrostByte_OG', product: 'VIP Rank', amount: 9.99, date: '2024-09-24', status: 'completed' },
];

const MOCK_PRODUCTS = [
  { id: 1, name: 'VIP Rank', category: 'ranks', price: 9.99, sales: 847, revenue: 8461.53, stock: true },
  { id: 2, name: 'MVP Rank', category: 'ranks', price: 19.99, sales: 523, revenue: 10454.77, stock: true },
  { id: 3, name: 'Mythic Crate', category: 'crates', price: 59.99, sales: 234, revenue: 14037.66, stock: true },
  { id: 4, name: 'Legendary Key Bundle', category: 'bundles', price: 19.99, sales: 891, revenue: 17811.09, stock: true },
  { id: 5, name: '25,000 Coins', category: 'coins', price: 49.99, sales: 1567, revenue: 78337.33, stock: true },
];

function StatCard({ title, value, change, icon: Icon }: { title: string; value: string; change: string; icon: any }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted">{title}</span>
        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-cyan-400" />
        </div>
      </div>
      <p className="text-2xl font-heading font-bold text-white">{value}</p>
      <p className="text-xs text-cyan-400 mt-1">{change}</p>
    </div>
  );
}

function DataTable({ headers, rows, renderRow }: { headers: string[]; rows: any[]; renderRow: (row: any) => React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {headers.map(h => (
              <th key={h} className="text-left py-3 px-3 text-muted font-medium text-xs uppercase tracking-wider">{h}</th>
            ))}
            <th className="py-3 px-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/50 hover:bg-white/5 transition-colors">
              {renderRow(row)}
              <td className="py-3 px-3">
                <button className="p-1 text-gray-500 hover:text-white transition-colors cursor-pointer">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Users" value="84,721" change="+12.5% this month" icon={Users} />
              <StatCard title="Revenue" value="$84,234" change="+18.3% this month" icon={BarChart3} />
              <StatCard title="Orders" value="4,892" change="+8.1% this month" icon={ShoppingCart} />
              <StatCard title="Online Players" value="1,247" change="Peak: 3,421" icon={LayoutDashboard} />
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
              <h3 className="text-sm font-heading font-bold text-white mb-4">Revenue Overview</h3>
              <div className="h-48 flex items-end gap-2">
                {[40, 65, 45, 80, 55, 70, 90, 75, 85, 60, 95, 100].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-cyan-500/20 rounded-t" style={{ height: `${h}%` }}>
                      <div className="w-full h-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t opacity-80" style={{ height: `${h}%` }} />
                    </div>
                    <span className="text-[10px] text-muted">W{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-white">User Management</h3>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input className="bg-surface border border-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500" placeholder="Search users..." />
              </div>
            </div>
            <DataTable
              headers={['User', 'Email', 'Rank', 'Balance', 'Status', 'Joined']}
              rows={MOCK_USERS}
              renderRow={(u: any) => (
                <>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-800 flex items-center justify-center text-xs font-bold">{u.username[0]}</div>
                      <span className="font-medium text-white">{u.username}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-muted">{u.email}</td>
                  <td className="py-3 px-3">
                    <span className={`text-xs font-medium ${u.rank === 'Legend' ? 'text-red-400' : u.rank === 'Immortal' ? 'text-orange-400' : u.rank === 'Elite' ? 'text-yellow-400' : u.rank === 'MVP+' ? 'text-purple-400' : 'text-gray-400'}`}>{u.rank}</span>
                  </td>
                  <td className="py-3 px-3 text-muted">${u.balance.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                      u.status === 'active' ? 'bg-cyan-900/40 text-cyan-400' :
                      u.status === 'banned' ? 'bg-red-900/40 text-red-400' :
                      'bg-yellow-900/40 text-yellow-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-cyan-400' : u.status === 'banned' ? 'bg-red-400' : 'bg-yellow-400'}`} />
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-muted">{u.joinDate}</td>
                </>
              )}
            />
          </div>
        );

      case 'products':
        return (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-white">Product Management</h3>
              <button className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs rounded-lg transition-colors cursor-pointer">+ Add Product</button>
            </div>
            <DataTable
              headers={['Product', 'Category', 'Price', 'Sales', 'Revenue', 'Stock']}
              rows={MOCK_PRODUCTS}
              renderRow={(p: any) => (
                <>
                  <td className="py-3 px-3 font-medium text-white">{p.name}</td>
                  <td className="py-3 px-3"><span className="text-xs capitalize text-muted">{p.category}</span></td>
                  <td className="py-3 px-3 text-muted">${p.price.toFixed(2)}</td>
                  <td className="py-3 px-3 text-muted">{p.sales.toLocaleString()}</td>
                  <td className="py-3 px-3 text-cyan-400">${p.revenue.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <span className={`text-xs ${p.stock ? 'text-cyan-400' : 'text-red-400'}`}>{p.stock ? 'In Stock' : 'Out'}</span>
                  </td>
                </>
              )}
            />
          </div>
        );

      case 'orders':
        return (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-heading font-bold text-white">Order Management</h3>
            </div>
            <DataTable
              headers={['Order ID', 'User', 'Product', 'Amount', 'Date', 'Status']}
              rows={MOCK_ORDERS}
              renderRow={(o: any) => (
                <>
                  <td className="py-3 px-3 font-mono text-xs text-white">{o.id}</td>
                  <td className="py-3 px-3 text-muted">{o.user}</td>
                  <td className="py-3 px-3 text-white">{o.product}</td>
                  <td className="py-3 px-3 text-muted">${o.amount.toFixed(2)}</td>
                  <td className="py-3 px-3 text-muted">{o.date}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                      o.status === 'completed' ? 'bg-cyan-900/40 text-cyan-400' :
                      o.status === 'pending' ? 'bg-yellow-900/40 text-yellow-400' :
                      'bg-red-900/40 text-red-400'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                </>
              )}
            />
          </div>
        );

      case 'leaderboards':
        return (
          <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <h3 className="text-sm font-heading font-bold text-white mb-4">Leaderboard Management</h3>
            <p className="text-sm text-muted mb-4">Configure leaderboard reset schedules and review player standings.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Kills Leaderboard', entries: '8,472', lastReset: 'Oct 1, 2024' },
                { label: 'Balance Leaderboard', entries: '6,234', lastReset: 'Oct 1, 2024' },
                { label: 'Playtime Leaderboard', entries: '7,891', lastReset: 'Oct 1, 2024' },
              ].map(item => (
                <div key={item.label} className="bg-surface border border-border rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white mb-2">{item.label}</h4>
                  <p className="text-xs text-muted">{item.entries} entries</p>
                  <p className="text-xs text-muted">Last reset: {item.lastReset}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
              <h3 className="text-sm font-heading font-bold text-white mb-4">Player Analytics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Avg Playtime', value: '4.2 hrs' },
                  { label: 'New Players/Day', value: '234' },
                  { label: 'Avg Session', value: '47 min' },
                  { label: 'Retention Rate', value: '68%' },
                ].map(s => (
                  <div key={s.label} className="bg-surface border border-border rounded-lg p-3">
                    <p className="text-xs text-muted mb-1">{s.label}</p>
                    <p className="text-lg font-heading font-bold text-white">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
              <h3 className="text-sm font-heading font-bold text-white mb-4">Top Purchased Categories</h3>
              <div className="space-y-3">
                {[
                  { category: 'Ranks', percentage: 35, color: 'bg-cyan-500' },
                  { category: 'Coins', percentage: 28, color: 'bg-gold-500' },
                  { category: 'Keys & Crates', percentage: 22, color: 'bg-purple-500' },
                  { category: 'Cosmetics', percentage: 10, color: 'bg-blue-500' },
                  { category: 'Boosters', percentage: 5, color: 'bg-orange-500' },
                ].map(item => (
                  <div key={item.category}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted">{item.category}</span>
                      <span className="text-white">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-6">
            <h3 className="text-sm font-heading font-bold text-white">Admin Settings</h3>
            {[
              { label: 'Maintenance Mode', desc: 'Prevent players from joining while you make changes' },
              { label: 'Auto-Rank Sync', desc: 'Automatically sync ranks with purchase system' },
              { label: 'Leaderboard Auto-Reset', desc: 'Reset leaderboards on the 1st of each month' },
              { label: 'New Registrations', desc: 'Allow new players to register accounts' },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-3 border-b border-border/50">
                <div>
                  <p className="text-sm font-medium text-white">{s.label}</p>
                  <p className="text-xs text-muted">{s.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-10 h-5 bg-surface border border-border rounded-full peer peer-checked:bg-cyan-600 peer-checked:border-cyan-500 transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex">
      <aside className="hidden lg:flex flex-col w-64 bg-surface border-r border-border">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4 text-gray-400" />
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-gold-500 flex items-center justify-center font-heading font-bold text-xs text-stone-950">B</div>
            <span className="font-heading font-bold text-sm">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {ADMIN_NAV.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            <LogOut className="w-4 h-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-surface border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between lg:justify-end">
          <button onClick={() => setActiveTab('overview')} className="lg:hidden text-sm text-muted hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="w-2 h-2 rounded-full bg-cyan-500 absolute -top-0.5 -right-0.5" />
              <Shield className="w-5 h-5 text-gray-400" />
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-xs font-bold">A</div>
          </div>
        </header>
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-heading font-bold text-white mb-6 capitalize">
              {activeTab}
              <span className="block text-xs text-muted font-body font-normal mt-0.5">Admin Dashboard</span>
            </h2>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
