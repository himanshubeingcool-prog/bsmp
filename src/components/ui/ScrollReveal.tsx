import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
  distance?: number;
}

export function ScrollReveal({
  children, className = '', delay = 0, direction = 'up',
  duration = 0.5, once = true, distance = 40,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, ...directionOffset[direction] }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
