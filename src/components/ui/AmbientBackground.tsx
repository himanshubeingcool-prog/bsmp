import { motion } from 'framer-motion';
import { VoxelParticles } from '@/components/ui/VoxelParticles';

interface AmbientBackgroundProps {
  /** Accent for the floating orbs. */
  accent?: 'cyan' | 'gold' | 'mixed';
  /** Number of floating voxel cubes. */
  voxels?: number;
  className?: string;
}

const ORB_PRESETS = {
  cyan: ['bg-cyan-500/5', 'bg-cyan-500/5', 'bg-cyan-500/5'],
  gold: ['bg-gold-500/5', 'bg-gold-500/5', 'bg-gold-500/5'],
  mixed: ['bg-cyan-500/5', 'bg-gold-500/5', 'bg-cyan-500/5'],
} as const;

/**
 * Shared ambient page backdrop: slow drifting blurred orbs + floating voxel
 * cubes. Purely decorative (pointer-events-none, aria-hidden) and honors
 * prefers-reduced-motion through the global rule in index.css.
 *
 * Drop it as the first child of a `relative overflow-hidden` page wrapper.
 */
export function AmbientBackground({ accent = 'mixed', voxels = 10, className = '' }: AmbientBackgroundProps) {
  const orbs = ORB_PRESETS[accent];

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      <div className={`absolute -top-20 -left-20 w-72 h-72 ${orbs[0]} rounded-full blur-3xl animate-float`} style={{ animationDelay: '0s', animationDuration: '8s' }} />
      <div className={`absolute top-1/3 -right-32 w-96 h-96 ${orbs[1]} rounded-full blur-3xl animate-float`} style={{ animationDelay: '2s', animationDuration: '10s' }} />
      <div className={`absolute -bottom-40 left-1/3 w-80 h-80 ${orbs[2]} rounded-full blur-3xl animate-float`} style={{ animationDelay: '4s', animationDuration: '12s' }} />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <VoxelParticles count={voxels} />
      </motion.div>
    </div>
  );
}
