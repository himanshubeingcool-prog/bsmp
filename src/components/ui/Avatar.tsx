interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  status?: 'online' | 'offline' | 'away';
}

export function Avatar({ src, alt = '', size = 'md', className = '', status }: AvatarProps) {
  const sizes: Record<string, string> = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const statusSizes: Record<string, string> = {
    sm: 'w-2.5 h-2.5 right-0 bottom-0',
    md: 'w-3 h-3 right-0 bottom-0',
    lg: 'w-3.5 h-3.5 right-0.5 bottom-0.5',
    xl: 'w-4 h-4 right-0.5 bottom-0.5',
  };

  const statusColors: Record<string, string> = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
  };

  return (
    <div className={`relative shrink-0 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizes[size]} rounded-full object-cover bg-card border-2 border-border`}
          onError={e => {
            (e.target as HTMLImageElement).style.display = 'none';
            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
          }}
        />
      ) : null}
      <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center font-bold text-white border-2 border-border ${src ? 'hidden' : ''}`}>
        {alt.charAt(0).toUpperCase()}
      </div>
      {status && (
        <span className={`absolute ${statusSizes[size]} rounded-full border-2 border-stone-950 ${statusColors[status]}`} />
      )}
    </div>
  );
}
