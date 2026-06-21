import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  max?: number
}

export function TiltCard({ children, className = '', max = 10 }: TiltCardProps) {
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const sx = useSpring(x, { stiffness: 150, damping: 20 })
  const sy = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const glareX = useTransform(sx, v => `${v * 100}%`)
  const glareY = useTransform(sy, v => `${v * 100}%`)

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left) / r.width)
        y.set((e.clientY - r.top) / r.height)
      }}
      onMouseLeave={() => { x.set(0.5); y.set(0.5) }}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: useTransform([glareX, glareY], ([gx, gy]) =>
            `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.12), transparent 40%)`),
        }}
      />
    </motion.div>
  )
}
