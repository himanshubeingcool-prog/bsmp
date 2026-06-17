import { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { MinecraftCharacter } from './MinecraftCharacter'

function FloatingOrb({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={0.5} floatIntensity={0.3}>
      <mesh position={position}>
        <boxGeometry args={[0.04, 0.04, 0.04]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.2} metalness={0.3} />
      </mesh>
    </Float>
  )
}

function Scene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#22c55e" />
      <directionalLight position={[-3, 2, -3]} intensity={0.25} color="#eab308" />
      <pointLight position={[2, 3, 1]} intensity={0.3} color="#22c55e" />
      <pointLight position={[1, -1, 2]} intensity={0.15} color="#eab308" />
      <hemisphereLight args={['#22c55e', '#0a0a0f', 0.2]} />

      {/* Character positioned to the right */}
      <group position={[1.8, 0, -0.3]}>
        <Float speed={0.3} rotationIntensity={0.02} floatIntensity={0.04}>
          <MinecraftCharacter mouseX={mouseX} mouseY={mouseY} />
        </Float>
      </group>

      {/* Floating orbs around character */}
      <FloatingOrb position={[2.4, 0.5, -0.2]} color="#22c55e" />
      <FloatingOrb position={[1.3, -0.3, 0.1]} color="#eab308" />
      <FloatingOrb position={[2.1, -0.1, 0.5]} color="#22c55e" />
      <FloatingOrb position={[1.6, 0.7, 0.3]} color="#eab308" />

      {/* Sparkles on right side */}
      <Sparkles count={30} scale={4} size={1.2} speed={0.15} color="#22c55e" opacity={0.2} noise={0.5} position={[2, 0, -0.5]} />
      <Sparkles count={15} scale={3} size={0.8} speed={0.1} color="#eab308" opacity={0.12} noise={0.3} position={[2, 0, -0.5]} />
    </>
  )
}

export function MinecraftHero3D() {
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMouseX(x)
      setMouseY(y)
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  if (isMobile) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0.3, 0.2, 3.5], fov: 45, near: 0.1, far: 20 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      >
        <Scene mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  )
}
