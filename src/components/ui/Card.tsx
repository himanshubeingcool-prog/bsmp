import { useRef, type HTMLAttributes, type ReactNode, type MouseEvent, useState } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'highlight';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  tilt?: boolean;
  glowOnHover?: boolean;
  children: ReactNode;
}

export function Card({
  variant = 'default', hover, padding = 'md', tilt, glowOnHover, children, className = '', ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tilt && !glowOnHover) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (glowOnHover) {
      setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    }

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (tilt && cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  const variants: Record<string, string> = {
    default: 'bg-card border border-border',
    glass: 'glass-card',
    gradient: 'bg-gradient-to-br from-green-900/20 to-gold-900/20 border border-green-500/10',
    highlight: 'bg-card border border-green-500/20 shadow-lg shadow-green-500/5',
  };

  const paddings: Record<string, string> = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      ref={cardRef}
      className={`
        relative rounded-xl transition-all duration-200
        ${variants[variant]}
        ${paddings[padding]}
        ${hover ? 'hover-lift hover-glow cursor-pointer active:scale-[0.98]' : ''}
        ${tilt ? 'transition-transform duration-200 ease-out' : ''}
        ${className}
      `}
      style={tilt ? { transformStyle: 'preserve-3d' } : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      {glowOnHover && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(34, 197, 94, 0.08) 0%, transparent 60%)`,
          }}
        />
      )}
    </div>
  );
}
