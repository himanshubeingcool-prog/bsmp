import type { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'gold' | 'premium';
  size?: 'sm' | 'md';
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', size = 'sm', children, className = '' }: BadgeProps) {
  const variants: Record<string, string> = {
    default: 'bg-gray-800 text-gray-300 border-gray-700',
    success: 'bg-green-900/40 text-green-400 border-green-500/30',
    warning: 'bg-yellow-900/40 text-yellow-400 border-yellow-500/30',
    danger: 'bg-red-900/40 text-red-400 border-red-500/30',
    info: 'bg-blue-900/40 text-blue-400 border-blue-500/30',
    gold: 'bg-gold-900/40 text-gold-400 border-gold-500/30',
    premium: 'bg-gradient-to-r from-green-900/40 to-gold-900/40 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-gold-400 border-green-500/20',
  };

  const sizes: Record<string, string> = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
