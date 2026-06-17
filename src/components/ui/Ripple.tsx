import { useRef, useState, type ReactNode, type MouseEvent } from 'react';

interface Ripple {
  x: number;
  y: number;
  id: number;
  size: number;
}

interface RippleProps {
  children: ReactNode;
  className?: string;
  color?: string;
  disabled?: boolean;
}

export function Ripple({ children, className = '', color = 'rgba(255,255,255,0.3)', disabled }: RippleProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const size = Math.max(rect.width, rect.height) * 1.5;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = counterRef.current++;
    setRipples(prev => [...prev, { x, y, id, size }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 600);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}
