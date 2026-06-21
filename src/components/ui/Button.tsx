import { useRef, useState, type ButtonHTMLAttributes, type ReactNode, type MouseEvent } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  noRipple?: boolean;
}

interface RippleData {
  x: number;
  y: number;
  id: number;
}

export function Button({
  variant = 'primary', size = 'md', loading, icon, fullWidth, children,
  disabled, className = '', noRipple, ...props
}: ButtonProps) {
  const [ripples, setRipples] = useState<RippleData[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const counterRef = useRef(0);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading || noRipple) return;
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = counterRef.current++;
    setRipples(prev => [...prev, { x, y, id }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
  };

  const variants: Record<string, string> = {
    primary: 'bg-gradient-to-b from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white shadow-lg shadow-cyan-600/20 hover:shadow-cyan-500/30 active:from-cyan-700 active:to-cyan-800',
    secondary: 'bg-card hover:bg-card-hover text-gray-100 border border-border hover:border-border-light active:bg-card',
    ghost: 'bg-transparent hover:bg-white/5 text-gray-300 hover:text-white active:bg-white/10',
    danger: 'bg-gradient-to-b from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-600/20 active:from-red-700 active:to-red-800',
    gold: 'bg-gradient-to-b from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-stone-950 font-semibold shadow-lg shadow-gold-600/20 hover:shadow-gold-500/30 active:from-gold-600 active:to-gold-700',
  };

  const sizes: Record<string, string> = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <button
      ref={btnRef}
      className={`
        relative overflow-hidden inline-flex items-center justify-center font-medium rounded-xl
        transition-all duration-150 ease-out cursor-pointer select-none
        active:scale-[0.97]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${loading ? 'pointer-events-none' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        <span className="w-4 h-4 shrink-0">{icon}</span>
      ) : null}
      {children}
      {ripples.map(r => (
        <span
          key={r.id}
          className="absolute pointer-events-none rounded-full animate-ripple"
          style={{
            left: r.x - 10,
            top: r.y - 10,
            width: 20,
            height: 20,
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
          }}
        />
      ))}
    </button>
  );
}
