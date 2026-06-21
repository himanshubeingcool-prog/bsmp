export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toLocaleString();
}

export function formatPlaytime(hours: number): string {
  const days = Math.floor(hours / 24);
  const remainingHours = Math.floor(hours % 24);
  const minutes = Math.floor((hours * 60) % 60);
  if (days > 0) return `${days}d ${remainingHours}h`;
  if (remainingHours > 0) return `${remainingHours}h ${minutes}m`;
  return `${minutes}m`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatRelativeTime(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const diff = now.getTime() - then.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getRankColor(tier: string): string {
  const colors: Record<string, string> = {
    Player: 'text-gray-400',
    Voter: 'text-cyan-400',
    VIP: 'text-cyan-500',
    MVP: 'text-cyan-400',
    'MVP+': 'text-cyan-300',
    Elite: 'text-gold-400',
    Immortal: 'text-gold-500',
    Legend: 'text-gold-300',
  };
  return colors[tier] || 'text-gray-400';
}

export function getRankGradient(tier: string): string {
  const gradients: Record<string, string> = {
    Player: 'from-gray-500 to-gray-400',
    Voter: 'from-cyan-500 to-cyan-400',
    VIP: 'from-cyan-400 to-gold-400',
    MVP: 'from-cyan-500 to-cyan-300',
    'MVP+': 'from-cyan-400 to-cyan-200',
    Elite: 'from-gold-600 to-gold-400',
    Immortal: 'from-gold-500 to-cyan-400',
    Legend: 'from-gold-400 to-cyan-400',
  };
  return gradients[tier] || 'from-gray-500 to-gray-400';
}

export function getRarityColor(rarity: string): string {
  const colors: Record<string, string> = {
    common: 'text-gray-400 border-gray-600',
    rare: 'text-blue-400 border-blue-600',
    epic: 'text-purple-400 border-purple-600',
    legendary: 'text-yellow-400 border-yellow-600',
    mythic: 'text-red-400 border-red-600',
  };
  return colors[rarity] || colors.common;
}

export function getRarityBg(rarity: string): string {
  const colors: Record<string, string> = {
    common: 'bg-gray-900/50',
    rare: 'bg-blue-900/30',
    epic: 'bg-purple-900/30',
    legendary: 'bg-yellow-900/30',
    mythic: 'bg-red-900/30',
  };
  return colors[rarity] || colors.common;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function classed(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}
