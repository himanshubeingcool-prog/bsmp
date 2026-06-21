interface IconProps {
  className?: string;
}

export function DiscordIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 00-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 00-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.08.22.17.33.25c.04.03.04.09-.01.11c-.52.3-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.67 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.87-.95-1.87-2.12s.82-2.12 1.87-2.12c1.06 0 1.9.95 1.87 2.12c0 1.17-.84 2.12-1.87 2.12zm6.96 0c-1.03 0-1.87-.95-1.87-2.12s.82-2.12 1.87-2.12c1.06 0 1.9.95 1.87 2.12c0 1.17-.84 2.12-1.87 2.12z" />
    </svg>
  );
}

export function GoogleIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export function MinecraftIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 2v20h16V2H4zm2 2h12v16H6V4zm2 2v2h2V6H8zm4 0v2h2V6h-2zm4 0v2h2V6h-2zM8 10v2h2v-2H8zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zM8 14v2h2v-2H8zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zM8 18v2h2v-2H8zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z" />
    </svg>
  );
}

export function MinecraftLogo({ className = '' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <rect x="4" y="4" width="56" height="56" rx="8" fill="currentColor" className="text-cyan-600" />
      <rect x="12" y="12" width="40" height="40" rx="4" fill="currentColor" className="text-cyan-500" />
      <rect x="16" y="16" width="8" height="8" rx="1" fill="currentColor" className="text-gold-400" />
      <rect x="28" y="16" width="8" height="8" rx="1" fill="currentColor" className="text-cyan-300" />
      <rect x="40" y="16" width="8" height="8" rx="1" fill="currentColor" className="text-cyan-400" />
      <rect x="16" y="28" width="8" height="8" rx="1" fill="currentColor" className="text-cyan-300" />
      <rect x="28" y="28" width="8" height="8" rx="1" fill="currentColor" className="text-gold-500" />
      <rect x="40" y="28" width="8" height="8" rx="1" fill="currentColor" className="text-cyan-300" />
      <rect x="16" y="40" width="8" height="8" rx="1" fill="currentColor" className="text-cyan-400" />
      <rect x="28" y="40" width="8" height="8" rx="1" fill="currentColor" className="text-cyan-300" />
      <rect x="40" y="40" width="8" height="8" rx="1" fill="currentColor" className="text-gold-400" />
    </svg>
  );
}
