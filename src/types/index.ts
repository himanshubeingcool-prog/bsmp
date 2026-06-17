export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  rank: RankTier;
  balance: number;
  coins: number;
  gems: number;
  stats: PlayerStats;
  team: Team | null;
  discordLinked: boolean;
  googleLinked: boolean;
  discordId?: string;
  googleId?: string;
  joinDate: string;
  lastLogin: string;
  verified: boolean;
  purchases: Purchase[];
  privacySettings: PrivacySettings;
  notificationSettings: NotificationSettings;
}

export interface PlayerStats {
  kills: number;
  deaths: number;
  kdr: number;
  playtime: number;
  wins: number;
  losses: number;
  gamesPlayed: number;
  blocksPlaced: number;
  blocksBroken: number;
  mobsKilled: number;
  distanceTraveled: number;
}

export interface PrivacySettings {
  showStats: boolean;
  showActivity: boolean;
  showPurchases: boolean;
  allowFriendRequests: boolean;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  discordNotifications: boolean;
  purchaseAlerts: boolean;
  rankUpdates: boolean;
  teamInvites: boolean;
  promotionalEmails: boolean;
}

export type RankTier = 'Player' | 'Voter' | 'VIP' | 'MVP' | 'MVP+' | 'Elite' | 'Immortal' | 'Legend';

export interface Rank {
  id: string;
  name: RankTier;
  price: number;
  color: string;
  description: string;
  perks: string[];
  badge: string;
  monthlyPrice?: number;
  popular?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  salePrice?: number;
  image: string;
  features: string[];
  inStock: boolean;
  popular?: boolean;
  discount?: number;
}

export type ProductCategory = 'ranks' | 'keys' | 'crates' | 'coins' | 'bundles' | 'cosmetics' | 'boosters' | 'tokens';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Purchase {
  id: string;
  productId: string;
  productName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'refunded';
  paymentMethod: string;
}

export interface Team {
  id: string;
  name: string;
  tag: string;
  logo: string;
  description: string;
  members: number;
  leader: string;
  wins: number;
  losses: number;
  points: number;
  rank: number;
  createdDate: string;
  recruiting: boolean;
  requirements: string[];
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  value: number;
  change: 'up' | 'down' | 'same';
  tier: RankTier;
}

export interface Crate {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rewards: CrateReward[];
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
}

export interface CrateReward {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  chance: number;
  image: string;
}

export interface KeyBundle {
  id: string;
  name: string;
  keys: number;
  price: number;
  discount: number;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: 'open' | 'closed' | 'pending';
  date: string;
  lastUpdate: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  author: string;
  content: string;
  date: string;
  isStaff: boolean;
}

export interface ServerStats {
  onlinePlayers: number;
  peakPlayers: number;
  totalRegistered: number;
  totalServers: number;
  uptime: number;
  tps: number;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

export interface LeaderboardFilter {
  type: 'kills' | 'deaths' | 'kdr' | 'playtime' | 'balance' | 'wins';
  period: 'monthly' | 'alltime';
  page: number;
}
