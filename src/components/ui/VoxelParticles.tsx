import { useMemo } from 'react';

interface VoxelParticlesProps {
  /** Number of floating cubes. Keep modest for performance. */
  count?: number;
  className?: string;
}

const PALETTE = [
  'rgba(34, 211, 238, 0.45)',   // emerald (grass/slime)
  'rgba(234, 179, 8, 0.40)',   // gold
  'rgba(56, 189, 248, 0.35)',  // diamond
  'rgba(168, 85, 247, 0.32)',  // amethyst
];

/**
 * Subtle floating voxel cubes for a Minecraft atmosphere.
 * Pure CSS-transform animation (voxel-float) — GPU friendly, no JS per frame.
 * Honors prefers-reduced-motion via the global rule in index.css.
 */
export function VoxelParticles({ count = 14, className = '' }: VoxelParticlesProps) {
  // Deterministic pseudo-random layout so it stays stable across re-renders.
  const cubes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const r = ((i * 9301 + 49297) % 233280) / 233280;
      const r2 = ((i * 4099 + 7919) % 233280) / 233280;
      const r3 = ((i * 2654435 + 40503) % 233280) / 233280;
      const size = 10 + Math.round(r2 * 26);
      return {
        id: i,
        left: Math.round(r * 100),
        top: Math.round(r3 * 100),
        size,
        color: PALETTE[i % PALETTE.length],
        rot: Math.round((r - 0.5) * 40),
        duration: 6 + Math.round(r2 * 8),
        delay: -Math.round(r3 * 8),
        depth: 0.4 + r2 * 0.6,
      };
    });
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {cubes.map((c) => (
        <span
          key={c.id}
          className="absolute animate-voxel-float"
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            width: c.size,
            height: c.size,
            opacity: c.depth,
            background: c.color,
            border: `1px solid ${c.color}`,
            borderRadius: 3,
            boxShadow: `0 0 ${Math.round(c.size * 0.8)}px ${c.color}`,
            backgroundImage:
              'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 40%), linear-gradient(315deg, rgba(0,0,0,0.25) 0%, transparent 40%)',
            ['--vx-rot' as string]: `${c.rot}deg`,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
