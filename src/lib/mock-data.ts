import {
  User, Rank, Product, Team, LeaderboardEntry, Crate, CrateReward,
  KeyBundle, FAQItem, ServerStats, Purchase, PlayerStats
} from '@/types';

export const MOCK_USER: User = {
  id: '1',
  username: 'xBlaze_Knight',
  email: 'blaze@example.com',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Blaze&backgroundColor=ffd700',
  rank: 'MVP+',
  balance: 15250,
  coins: 34200,
  gems: 1280,
  stats: {
    kills: 2847,
    deaths: 1532,
    kdr: 1.86,
    playtime: 1248,
    wins: 342,
    losses: 189,
    gamesPlayed: 531,
    blocksPlaced: 45231,
    blocksBroken: 38912,
    mobsKilled: 12453,
    distanceTraveled: 84521,
  },
  team: {
    id: 't1',
    name: 'Phoenix Rising',
    tag: 'PHNX',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Phoenix&backgroundColor=ff6b35',
    description: 'A competitive team focused on PvP and survival excellence.',
    members: 42,
    leader: 'xBlaze_Knight',
    wins: 156,
    losses: 89,
    points: 12450,
    rank: 3,
    createdDate: '2024-06-15',
    recruiting: true,
    requirements: ['1.5+ KDR', '100+ hours playtime', 'Discord required'],
  },
  discordLinked: true,
  googleLinked: false,
  discordId: '123456789012345678',
  joinDate: '2024-03-12',
  lastLogin: new Date().toISOString(),
  verified: true,
  purchases: [
    { id: 'p1', productId: 'rank-mvp', productName: 'MVP Rank', amount: 29.99, date: '2024-08-15T10:30:00', status: 'completed', paymentMethod: 'Discord' },
    { id: 'p2', productId: 'key-bundle-1', productName: 'Legendary Key Bundle', amount: 19.99, date: '2024-09-01T14:20:00', status: 'completed', paymentMethod: 'Google Pay' },
    { id: 'p3', productId: 'crate-mythic', productName: 'Mythic Crate', amount: 49.99, date: '2024-09-10T08:45:00', status: 'completed', paymentMethod: 'Card' },
    { id: 'p4', productId: 'coins-5000', productName: '5000 Coins Pack', amount: 9.99, date: '2024-09-18T16:00:00', status: 'completed', paymentMethod: 'Discord' },
    { id: 'p5', productId: 'booster-xp', productName: '2x XP Booster (7d)', amount: 14.99, date: '2024-09-25T12:15:00', status: 'pending', paymentMethod: 'Card' },
  ],
  privacySettings: {
    showStats: true,
    showActivity: true,
    showPurchases: false,
    allowFriendRequests: true,
  },
  notificationSettings: {
    emailNotifications: true,
    discordNotifications: true,
    purchaseAlerts: true,
    rankUpdates: true,
    teamInvites: true,
    promotionalEmails: false,
  },
};

export const RANKS: Rank[] = [
  { id: 'rank-voter', name: 'Voter', price: 0, color: '#22c55e', description: 'Free rank for voting on server lists.', perks: ['/fly in spawn', '2x vote rewards', 'Green name color', 'Access to vote-only rewards'], badge: 'V', popular: false },
  { id: 'rank-vip', name: 'VIP', price: 9.99, color: '#34d399', description: 'Get started with premium perks.', perks: ['/fly everywhere', '/hat command', '/craft command', '/ec (enderchest)', '3x vote rewards', 'VIP chat color'], badge: 'VIP', monthlyPrice: 4.99, popular: false },
  { id: 'rank-mvp', name: 'MVP', price: 19.99, color: '#22d3ee', description: 'The most popular rank on BhukkadSMP.', perks: ['All VIP perks', '/feed', '/heal', '/near command', '/ptime command', '4x vote rewards', 'Access to /pv', 'MVP chat prefix'], badge: 'MVP', monthlyPrice: 9.99, popular: true },
  { id: 'rank-mvpp', name: 'MVP+', price: 34.99, color: '#a78bfa', description: 'Premium experience with exclusive perks.', perks: ['All MVP perks', '/nickname', '/skull command', '/workbench', '/anvil', '5x vote rewards', 'Custom join message', 'Exclusive MVP+ prefix', 'Animated name tag'], badge: 'MVP+', monthlyPrice: 14.99, popular: false },
  { id: 'rank-elite', name: 'Elite', price: 59.99, color: '#fbbf24', description: 'Elite treatment with maximum perks.', perks: ['All MVP+ perks', '/gamemode spectator', '/teleport command', '/weather command', '/time command', '6x vote rewards', 'Elite chat prefix [ELITE]', 'Colored name in tab', 'Nickname colors', 'Priority queue access'], badge: 'E', monthlyPrice: 24.99, popular: false },
  { id: 'rank-immortal', name: 'Immortal', price: 99.99, color: '#fb923c', description: 'Immortal status with god-like powers.', perks: ['All Elite perks', '/gamemode creative (limited)', '/god command', '/top command', '/jump command', '7x vote rewards', 'Immortal chat prefix [IMMORTAL]', 'Firework join effect', 'Custom tag colors', 'Beta feature access', 'Exclusive Discord role'], badge: 'I', monthlyPrice: 39.99, popular: true },
  { id: 'rank-legend', name: 'Legend', price: 199.99, color: '#f87171', description: 'The ultimate rank. Become a legend.', perks: ['All Immortal perks', 'Lifetime rank (no expiry)', '/fly in all worlds', '10x vote rewards', 'Legend chat prefix [LEGEND]', 'Custom particle trail', 'Custom name tag glow', 'Access to all future perks', 'Dedicated Discord category', 'Priority support', 'Weekly reward crates', 'Personalized server item'], badge: 'L', popular: false },
];

export const PRODUCTS: Product[] = [
  { id: 'coins-1000', name: '1,000 Coins', description: 'Get 1,000 coins to spend in-game on items, perks, and more.', category: 'coins', price: 4.99, image: '💰', features: ['Instant delivery', 'No cooldown'], inStock: true },
  { id: 'coins-5000', name: '5,000 Coins', description: 'A solid coin bundle for serious players.', category: 'coins', price: 19.99, salePrice: 14.99, image: '💰', features: ['Instant delivery', 'Best value for small packs', 'Bonus 200 coins'], inStock: true, discount: 25 },
  { id: 'coins-25000', name: '25,000 Coins', description: 'Massive coin bundle for the dedicated player.', category: 'coins', price: 79.99, salePrice: 49.99, image: '💰', features: ['Instant delivery', 'Best value', 'Bonus 2,500 coins'], inStock: true, discount: 38, popular: true },
  { id: 'key-basic', name: 'Basic Key', description: 'Open a basic crate for common to rare rewards.', category: 'keys', price: 1.99, image: '🔑', features: ['Common to rare rewards', 'Direct delivery'], inStock: true },
  { id: 'key-rare', name: 'Rare Key', description: 'Better loot with higher chance of rare items.', category: 'keys', price: 4.99, image: '🔑', features: ['Rare to epic rewards', 'Higher drop rates'], inStock: true },
  { id: 'key-epic', name: 'Epic Key', description: 'For serious crate openers seeking epic loot.', category: 'keys', price: 9.99, image: '🔑', features: ['Epic to legendary rewards', 'Epic guaranteed'], inStock: true, popular: true },
  { id: 'key-legendary', name: 'Legendary Key', description: 'The best key for the best rewards.', category: 'keys', price: 24.99, image: '🔑', features: ['Legendary+ rewards', 'Mythic chance'], inStock: true },
  { id: 'key-bundle-1', name: 'Key Bundle (10+2 Free)', description: '10 keys of your choice + 2 bonus keys free!', category: 'bundles', price: 19.99, image: '🎁', features: ['Choose key type', '2 free bonus keys', 'Bulk discount'], inStock: true, popular: true, discount: 17 },
  { id: 'key-bundle-2', name: 'Ultimate Key Bundle (25+10)', description: '25 keys + 10 bonus keys. Best value bundle.', category: 'bundles', price: 39.99, image: '🎁', features: ['All key types available', '10 free bonus keys', '40% savings'], inStock: true, discount: 33 },
  { id: 'crate-basic', name: 'Basic Crate', description: 'Starter crate with common and uncommon loot.', category: 'crates', price: 2.99, image: '📦', features: ['Common-uncommon loot', 'Basic cosmetics'], inStock: true },
  { id: 'crate-epic', name: 'Epic Crate', description: 'Epic crate with rare and epic rewards inside.', category: 'crates', price: 14.99, image: '📦', features: ['Rare-epic loot', 'Epic cosmetics', 'Mounts chance'], inStock: true, popular: true },
  { id: 'crate-legendary', name: 'Legendary Crate', description: 'Contains legendary items with high drop rates.', category: 'crates', price: 34.99, image: '📦', features: ['Legendary guaranteed', 'Epic cosmetics', 'Pet chance', 'Particle effects'], inStock: true },
  { id: 'crate-mythic', name: 'Mythic Crate', description: 'The rarest crate with mythic-tier rewards. Only the luckiest open these.', category: 'crates', price: 59.99, image: '📦', features: ['Mythic guaranteed', 'Rarest cosmetics', 'Exclusive pets', 'Global announcement', 'Legendary+ guaranteed'], inStock: true, popular: true, discount: 15 },
  { id: 'cosmetic-aura', name: 'Aura Effect Pack', description: 'Stand out with unique aura effects around your character.', category: 'cosmetics', price: 12.99, image: '✨', features: ['5 aura effects', 'Configurable colors', 'Toggle on/off'], inStock: true },
  { id: 'cosmetic-trails', name: 'Particle Trail Pack', description: 'Leave a trail of particles as you move through the world.', category: 'cosmetics', price: 14.99, image: '🌟', features: ['10 trail effects', 'Adjustable density', 'Performance-friendly'], inStock: true, popular: true },
  { id: 'cosmetic-pet', name: 'Exotic Pet Bundle', description: 'Adorable pets that follow you on your adventures.', category: 'cosmetics', price: 24.99, image: '🐉', features: ['8 unique pets', 'Pet naming', 'Pet sounds toggle'], inStock: true, discount: 20 },
  { id: 'booster-xp', name: '2x XP Booster (7 Days)', description: 'Double all XP gained for 7 days.', category: 'boosters', price: 14.99, image: '⚡', features: ['Double XP', 'Stackable', 'Pauseable'], inStock: true },
  { id: 'booster-drop', name: '2x Drop Booster (7 Days)', description: 'Double all mob and block drops for 7 days.', category: 'boosters', price: 19.99, image: '📈', features: ['Double drops', 'Affects all mobs', 'Affects mining'], inStock: true, popular: true },
  { id: 'booster-all', name: 'Ultimate Booster Pack (30 Days)', description: 'Everything boosted: XP, drops, and coins for 30 days.', category: 'boosters', price: 49.99, salePrice: 34.99, image: '🔥', features: ['3x XP', '3x Drops', '3x Coins', '30 day duration'], inStock: true, discount: 30 },
  { id: 'token-100', name: '100 Server Tokens', description: 'Server tokens for special server-wide events and features.', category: 'tokens', price: 9.99, image: '🪙', features: ['Redeem for events', 'Transferable', 'Never expire'], inStock: true },
  { id: 'token-500', name: '500 Server Tokens', description: 'Bundle of tokens for active event participants.', category: 'tokens', price: 39.99, image: '🪙', features: ['Best token value', 'Event priority access'], inStock: true, popular: true },
];

export const LEADERBOARD_DATA: Record<string, LeaderboardEntry[]> = {
  kills: [
    { rank: 1, username: 'xBlaze_Knight', avatar: '', value: 2847, change: 'up', tier: 'MVP+' },
    { rank: 2, username: 'ShadowStrike_', avatar: '', value: 2654, change: 'up', tier: 'Elite' },
    { rank: 3, username: 'NightHawk42', avatar: '', value: 2431, change: 'down', tier: 'Immortal' },
    { rank: 4, username: 'DragonSlayer99', avatar: '', value: 2189, change: 'same', tier: 'Legend' },
    { rank: 5, username: 'PixelWarrior', avatar: '', value: 1987, change: 'up', tier: 'MVP+' },
    { rank: 6, username: 'CyberWolf_X', avatar: '', value: 1756, change: 'down', tier: 'MVP' },
    { rank: 7, username: 'IcePhoenix_', avatar: '', value: 1543, change: 'up', tier: 'Elite' },
    { rank: 8, username: 'ThunderBolt7', avatar: '', value: 1321, change: 'same', tier: 'VIP' },
    { rank: 9, username: 'FrostByte_OG', avatar: '', value: 1189, change: 'down', tier: 'VIP' },
    { rank: 10, username: 'Arcane_Mage', avatar: '', value: 987, change: 'up', tier: 'Voter' },
  ],
  deaths: [
    { rank: 1, username: 'NoobSlayer99', avatar: '', value: 3421, change: 'up', tier: 'Player' },
    { rank: 2, username: 'FellOffCliff', avatar: '', value: 2876, change: 'up', tier: 'Voter' },
    { rank: 3, username: 'LavaDiver_', avatar: '', value: 2543, change: 'down', tier: 'Player' },
    { rank: 4, username: 'CreeperFood', avatar: '', value: 2198, change: 'same', tier: 'Player' },
    { rank: 5, username: 'BedExploder', avatar: '', value: 1876, change: 'up', tier: 'VIP' },
    { rank: 6, username: 'xBlaze_Knight', avatar: '', value: 1532, change: 'down', tier: 'MVP+' },
    { rank: 7, username: 'ShadowStrike_', avatar: '', value: 1421, change: 'up', tier: 'Elite' },
    { rank: 8, username: 'NightHawk42', avatar: '', value: 1287, change: 'same', tier: 'Immortal' },
    { rank: 9, username: 'DragonSlayer99', avatar: '', value: 1109, change: 'down', tier: 'Legend' },
    { rank: 10, username: 'PixelWarrior', avatar: '', value: 987, change: 'up', tier: 'MVP+' },
  ],
  kdr: [
    { rank: 1, username: 'DragonSlayer99', avatar: '', value: 5.42, change: 'up', tier: 'Legend' },
    { rank: 2, username: 'NightHawk42', avatar: '', value: 4.87, change: 'down', tier: 'Immortal' },
    { rank: 3, username: 'xBlaze_Knight', avatar: '', value: 3.86, change: 'up', tier: 'MVP+' },
    { rank: 4, username: 'ShadowStrike_', avatar: '', value: 3.54, change: 'same', tier: 'Elite' },
    { rank: 5, username: 'Arcane_Mage', avatar: '', value: 3.12, change: 'up', tier: 'Voter' },
    { rank: 6, username: 'PixelWarrior', avatar: '', value: 2.87, change: 'down', tier: 'MVP+' },
    { rank: 7, username: 'CyberWolf_X', avatar: '', value: 2.54, change: 'up', tier: 'MVP' },
    { rank: 8, username: 'ThunderBolt7', avatar: '', value: 2.21, change: 'same', tier: 'VIP' },
    { rank: 9, username: 'IcePhoenix_', avatar: '', value: 1.98, change: 'down', tier: 'Elite' },
    { rank: 10, username: 'FrostByte_OG', avatar: '', value: 1.76, change: 'up', tier: 'VIP' },
  ],
  playtime: [
    { rank: 1, username: 'DragonSlayer99', avatar: '', value: 2847, change: 'up', tier: 'Legend' },
    { rank: 2, username: 'NightHawk42', avatar: '', value: 2654, change: 'same', tier: 'Immortal' },
    { rank: 3, username: 'xBlaze_Knight', avatar: '', value: 1248, change: 'up', tier: 'MVP+' },
    { rank: 4, username: 'ShadowStrike_', avatar: '', value: 1187, change: 'down', tier: 'Elite' },
    { rank: 5, username: 'PixelWarrior', avatar: '', value: 1098, change: 'up', tier: 'MVP+' },
    { rank: 6, username: 'CyberWolf_X', avatar: '', value: 987, change: 'same', tier: 'MVP' },
    { rank: 7, username: 'IcePhoenix_', avatar: '', value: 876, change: 'down', tier: 'Elite' },
    { rank: 8, username: 'FrostByte_OG', avatar: '', value: 765, change: 'up', tier: 'VIP' },
    { rank: 9, username: 'ThunderBolt7', avatar: '', value: 654, change: 'up', tier: 'VIP' },
    { rank: 10, username: 'Arcane_Mage', avatar: '', value: 543, change: 'down', tier: 'Voter' },
  ],
  balance: [
    { rank: 1, username: 'DragonSlayer99', avatar: '', value: 284700, change: 'up', tier: 'Legend' },
    { rank: 2, username: 'NightHawk42', avatar: '', value: 195400, change: 'same', tier: 'Immortal' },
    { rank: 3, username: 'xBlaze_Knight', avatar: '', value: 152500, change: 'down', tier: 'MVP+' },
    { rank: 4, username: 'ShadowStrike_', avatar: '', value: 124800, change: 'up', tier: 'Elite' },
    { rank: 5, username: 'PixelWarrior', avatar: '', value: 98700, change: 'up', tier: 'MVP+' },
    { rank: 6, username: 'CyberWolf_X', avatar: '', value: 85400, change: 'down', tier: 'MVP' },
    { rank: 7, username: 'IcePhoenix_', avatar: '', value: 72300, change: 'same', tier: 'Elite' },
    { rank: 8, username: 'ThunderBolt7', avatar: '', value: 61200, change: 'up', tier: 'VIP' },
    { rank: 9, username: 'FrostByte_OG', avatar: '', value: 54800, change: 'down', tier: 'VIP' },
    { rank: 10, username: 'Arcane_Mage', avatar: '', value: 43200, change: 'up', tier: 'Voter' },
  ],
  wins: [
    { rank: 1, username: 'DragonSlayer99', avatar: '', value: 892, change: 'up', tier: 'Legend' },
    { rank: 2, username: 'NightHawk42', avatar: '', value: 756, change: 'up', tier: 'Immortal' },
    { rank: 3, username: 'xBlaze_Knight', avatar: '', value: 342, change: 'same', tier: 'MVP+' },
    { rank: 4, username: 'ShadowStrike_', avatar: '', value: 298, change: 'down', tier: 'Elite' },
    { rank: 5, username: 'PixelWarrior', avatar: '', value: 254, change: 'up', tier: 'MVP+' },
    { rank: 6, username: 'IcePhoenix_', avatar: '', value: 198, change: 'up', tier: 'Elite' },
    { rank: 7, username: 'CyberWolf_X', avatar: '', value: 176, change: 'down', tier: 'MVP' },
    { rank: 8, username: 'ThunderBolt7', avatar: '', value: 154, change: 'same', tier: 'VIP' },
    { rank: 9, username: 'FrostByte_OG', avatar: '', value: 132, change: 'up', tier: 'VIP' },
    { rank: 10, username: 'Arcane_Mage', avatar: '', value: 98, change: 'down', tier: 'Voter' },
  ],
};

export const TEAMS: Team[] = [
  { id: 't1', name: 'Phoenix Rising', tag: 'PHNX', logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Phoenix&backgroundColor=ff6b35', description: 'A competitive team focused on PvP and survival excellence. We dominate the leaderboards and build massive bases.', members: 42, leader: 'xBlaze_Knight', wins: 156, losses: 89, points: 12450, rank: 3, createdDate: '2024-06-15', recruiting: true, requirements: ['1.5+ KDR', '100+ hours playtime', 'Discord required'] },
  { id: 't2', name: 'Shadow Legion', tag: 'SHDW', logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Shadow&backgroundColor=6b21a8', description: 'Elite PvP squad. We strike from the shadows and claim victory.', members: 28, leader: 'NightHawk42', wins: 234, losses: 67, points: 15230, rank: 1, createdDate: '2024-04-20', recruiting: false, requirements: ['2.5+ KDR', '500+ kills', 'Must have MVP+ or higher'] },
  { id: 't3', name: 'Crystal Guild', tag: 'CRYS', logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Crystal&backgroundColor=06b6d4', description: 'Builders and traders. We focus on economy, building, and community projects.', members: 56, leader: 'PixelWarrior', wins: 98, losses: 112, points: 8760, rank: 5, createdDate: '2024-03-10', recruiting: true, requirements: ['Active on Discord', 'Builder rank or higher'] },
  { id: 't4', name: 'Dragon Empire', tag: 'DRGN', logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Dragon&backgroundColor=dc2626', description: 'The most powerful force on the server. We bow to no one.', members: 15, leader: 'DragonSlayer99', wins: 312, losses: 23, points: 18900, rank: 2, createdDate: '2024-01-05', recruiting: false, requirements: ['Legend rank only', 'Invite only', '4.0+ KDR'] },
  { id: 't5', name: 'Frost Wolves', tag: 'FROST', logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Frost&backgroundColor=0891b2', description: 'Survival specialists who thrive in the harshest conditions.', members: 34, leader: 'IcePhoenix_', wins: 187, losses: 76, points: 11100, rank: 4, createdDate: '2024-05-01', recruiting: true, requirements: ['1.0+ KDR', 'Discord required', 'Team oriented'] },
  { id: 't6', name: 'Storm Breakers', tag: 'STOR', logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=Storm&backgroundColor=ca8a04', description: 'New team looking to make a name. Fast rising through the ranks.', members: 23, leader: 'ThunderBolt7', wins: 67, losses: 54, points: 5430, rank: 6, createdDate: '2024-08-01', recruiting: true, requirements: ['Any rank welcome', 'Active player', 'Willing to learn'] },
];

export const CRATES: Crate[] = [
  {
    id: 'crate-basic', name: 'Basic Crate', description: 'Starter crate filled with common and uncommon loot to help you get started.', price: 2.99, image: '📦', rarity: 'common',
    rewards: [
      { id: 'cr1', name: 'Iron Armor Set', rarity: 'common', chance: 30, image: '🛡️' },
      { id: 'cr2', name: 'Golden Apple (x3)', rarity: 'common', chance: 25, image: '🍎' },
      { id: 'cr3', name: '20 XP Bottles', rarity: 'common', chance: 20, image: '🧪' },
      { id: 'cr4', name: 'Diamond Pickaxe', rarity: 'rare', chance: 15, image: '⛏️' },
      { id: 'cr5', name: 'Enchanted Book', rarity: 'rare', chance: 8, image: '📖' },
      { id: 'cr6', name: 'Basic Rank Tag', rarity: 'epic', chance: 2, image: '🏷️' },
    ]
  },
  {
    id: 'crate-epic', name: 'Epic Crate', description: 'Rare and epic rewards including exclusive cosmetics and powerful gear.', price: 14.99, image: '📦', rarity: 'epic',
    rewards: [
      { id: 'cr7', name: 'Diamond Armor Set', rarity: 'rare', chance: 30, image: '🛡️' },
      { id: 'cr8', name: 'Netherite Scrap (x2)', rarity: 'rare', chance: 22, image: '🔥' },
      { id: 'cr9', name: '50 XP Bottles', rarity: 'rare', chance: 18, image: '🧪' },
      { id: 'cr10', name: 'Epic Sword Skin', rarity: 'epic', chance: 15, image: '🗡️' },
      { id: 'cr11', name: 'Mount: Ghost Horse', rarity: 'epic', chance: 10, image: '🐴' },
      { id: 'cr12', name: 'Legendary Enchant Book', rarity: 'legendary', chance: 4, image: '📖' },
      { id: 'cr13', name: 'Exclusive Particle Effect', rarity: 'legendary', chance: 1, image: '✨' },
    ]
  },
  {
    id: 'crate-legendary', name: 'Legendary Crate', description: 'Guaranteed legendary items with a chance at mythic-tier loot.', price: 34.99, image: '📦', rarity: 'legendary',
    rewards: [
      { id: 'cr14', name: 'Netherite Armor Set', rarity: 'epic', chance: 30, image: '🛡️' },
      { id: 'cr15', name: 'Beacon', rarity: 'epic', chance: 20, image: '💎' },
      { id: 'cr16', name: 'Elytra', rarity: 'epic', chance: 15, image: '🪶' },
      { id: 'cr17', name: 'Legendary Pet: Dragon', rarity: 'legendary', chance: 18, image: '🐉' },
      { id: 'cr18', name: 'Custom Aura Effect', rarity: 'legendary', chance: 12, image: '✨' },
      { id: 'cr19', name: 'Mythic Rank Tag', rarity: 'mythic', chance: 4, image: '👑' },
      { id: 'cr20', name: 'Lifetime Booster', rarity: 'mythic', chance: 1, image: '♾️' },
    ]
  },
  {
    id: 'crate-mythic', name: 'Mythic Crate', description: 'The ultimate crate. Only the luckiest and richest can unlock these mythical rewards.', price: 59.99, image: '📦', rarity: 'mythic',
    rewards: [
      { id: 'cr21', name: 'Legendary Pet: Dragon', rarity: 'legendary', chance: 25, image: '🐉' },
      { id: 'cr22', name: 'Mythic Armor Set', rarity: 'legendary', chance: 20, image: '🛡️' },
      { id: 'cr23', name: 'Custom Particle Aura', rarity: 'legendary', chance: 18, image: '✨' },
      { id: 'cr24', name: 'Global Announcement Tag', rarity: 'legendary', chance: 15, image: '📢' },
      { id: 'cr25', name: 'Mythic Sword: Stormbreaker', rarity: 'mythic', chance: 12, image: '⚔️' },
      { id: 'cr26', name: 'Exclusive Flying Mount', rarity: 'mythic', chance: 7, image: '🦅' },
      { id: 'cr27', name: 'Legend Rank Upgrade Voucher', rarity: 'mythic', chance: 3, image: '👑' },
    ]
  },
];

export const KEY_BUNDLES: KeyBundle[] = [
  { id: 'bundle-basic', name: 'Starter Pack', keys: 5, price: 7.99, discount: 20, image: '🔑' },
  { id: 'bundle-popular', name: 'Popular Pack', keys: 10, price: 14.99, discount: 25, image: '🔑' },
  { id: 'bundle-ultra', name: 'Ultra Pack', keys: 25, price: 29.99, discount: 40, image: '🔑' },
  { id: 'bundle-mega', name: 'Mega Pack', keys: 50, price: 49.99, discount: 50, image: '🔑' },
  { id: 'bundle-ultimate', name: 'Ultimate Pack', keys: 100, price: 79.99, discount: 60, image: '🔑' },
];

export const FAQ_DATA: FAQItem[] = [
  { id: 'faq1', question: 'How do I join BhukkadSMP?', answer: 'Open Minecraft, go to Multiplayer, click Add Server, enter the IP play.bhukkadsmp.fun, and click Join.', category: 'Getting Started' },
  { id: 'faq2', question: 'Is BhukkadSMP free to play?', answer: 'Yes! BhukkadSMP is completely free to play. We offer optional ranks and store items that enhance your experience but are never required.', category: 'Getting Started' },
  { id: 'faq3', question: 'What version of Minecraft does the server use?', answer: 'BhukkadSMP runs on Minecraft 1.21++.', category: 'Getting Started' },
  { id: 'faq4', question: 'How do I purchase a rank?', answer: 'Visit our Store page, select the rank you want, add it to your cart, and complete checkout. Ranks are delivered instantly to your account.', category: 'Purchases' },
  { id: 'faq5', question: 'My purchase is not showing up. What do I do?', answer: 'First, try rejoining the server. If it still hasn\'t arrived, contact Support through our website or Discord with your transaction ID.', category: 'Purchases' },
  { id: 'faq6', question: 'Can I get a refund?', answer: 'All purchases are final unless the product was not delivered. Please see our Refund Policy for full details.', category: 'Purchases' },
  { id: 'faq7', question: 'What is CPvP Battle Royale?', answer: 'Asia\'s first CPvP Battle Royale mode. Drop into custom arenas, loot gear, and fight to be the last player standing.', category: 'Gameplay' },
  { id: 'faq8', question: 'How do leaderboards work?', answer: 'Leaderboards track various stats including kills, wins, KDR, and playtime. Compete for the top spot on Asia\'s leaderboards.', category: 'Gameplay' },
  { id: 'faq9', question: 'How do I practice PvP?', answer: 'Join our Practice PvP arenas to hone your skills. Use /practice to enter the practice mode with custom kits and arenas.', category: 'Gameplay' },
  { id: 'faq10', question: 'How do I link my Discord account?', answer: 'Go to your Profile page, click on Linked Accounts, and click the Discord button. You\'ll be redirected to authorize the connection.', category: 'Account' },
  { id: 'faq11', question: 'How do I report a player?', answer: 'Use /report <player> <reason> in-game or open a Support ticket on our website. Include evidence like screenshots for faster processing.', category: 'Rules' },
];

export const SERVER_STATS: ServerStats = {
  onlinePlayers: 1247,
  peakPlayers: 3421,
  totalRegistered: 84721,
  totalServers: 7,
  uptime: 99.8,
  tps: 19.8,
};

export const RECENT_PURCHASES = [
  { username: 'xBlaze_Knight', item: 'MVP+ Rank', amount: 34.99, date: new Date(Date.now() - 300000).toISOString(), avatar: '' },
  { username: 'ShadowStrike_', item: 'Mythic Crate', amount: 59.99, date: new Date(Date.now() - 600000).toISOString(), avatar: '' },
  { username: 'PixelWarrior', item: '25,000 Coins Pack', amount: 49.99, date: new Date(Date.now() - 1200000).toISOString(), avatar: '' },
  { username: 'IcePhoenix_', item: 'Ultimate Booster Pack', amount: 34.99, date: new Date(Date.now() - 1800000).toISOString(), avatar: '' },
  { username: 'FrostByte_OG', item: 'Legendary Key Bundle', amount: 19.99, date: new Date(Date.now() - 2400000).toISOString(), avatar: '' },
  { username: 'Arcane_Mage', item: 'VIP Rank', amount: 9.99, date: new Date(Date.now() - 3600000).toISOString(), avatar: '' },
  { username: 'ThunderBolt7', item: 'Cosmetic Pet Bundle', amount: 24.99, date: new Date(Date.now() - 4800000).toISOString(), avatar: '' },
];

export const CATEGORY_ICONS: Record<string, string> = {
  ranks: '⭐',
  keys: '🔑',
  crates: '📦',
  coins: '💰',
  bundles: '🎁',
  cosmetics: '✨',
  boosters: '⚡',
  tokens: '🪙',
};
