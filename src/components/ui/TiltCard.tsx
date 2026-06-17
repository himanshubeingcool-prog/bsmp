import { useRef, type ReactNode, type MouseEvent, useState } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltDegree?: number;
  perspective?: number;
  disabled?: boolean;
}

export function TiltCard({
  children, className = '', tiltDegree = 5, perspective = 800, disabled
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -tiltDegree;
    const rotateY = ((x - centerX) / centerX) * tiltDegree;
    card.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
    setGlow({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(34, 197, 94, 0.12) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}
