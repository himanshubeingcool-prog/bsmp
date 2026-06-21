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
      {/* Moody End-realm lighting — dim, purple-tinted, rim-lit */}
      <ambientLight intensity={0.35} color="#b39ddb" />
      <directionalLight position={[4, 6, 5]} intensity={0.55} color="#cfd8ff" />
      <directionalLight position={[-4, 3, -2]} intensity={0.5} color="#a855f7" />
      <pointLight position={[3, 2, 2]} intensity={0.4} color="#e23bff" />
      <pointLight position={[1.5, -1, 2]} intensity={0.3} color="#7c3aed" />
      <hemisphereLight args={['#9b5de5', '#05050a', 0.3]} />

      {/* Enderman positioned to the right, sized to the hero */}
      <group position={[1.9, -0.35, -0.2]}>
        <Float speed={0.35} rotationIntensity={0.025} floatIntensity={0.05}>
          <MinecraftCharacter mouseX={mouseX} mouseY={mouseY} />
        </Float>
      </group>

      {/* Floating End-portal motes around the Enderman */}
      <FloatingOrb position={[2.4, 0.5, -0.2]} color="#e23bff" />
      <FloatingOrb position={[1.3, -0.3, 0.1]} color="#a855f7" />
      <FloatingOrb position={[2.1, -0.1, 0.5]} color="#c026d3" />
      <FloatingOrb position={[1.6, 0.7, 0.3]} color="#7c3aed" />

      {/* Teleport-particle sparkles drifting on the right */}
      <Sparkles count={40} scale={5} size={1.4} speed={0.2} color="#d946ef" opacity={0.35} noise={0.6} position={[2, 0.2, -0.5]} />
      <Sparkles count={20} scale={3.5} size={0.9} speed={0.12} color="#a855f7" opacity={0.2} noise={0.4} position={[2, 0, -0.5]} />
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
        camera={{ position: [0.3, 0.65, 5.0], fov: 42, near: 0.1, far: 20 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      >
        <Scene mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  )
}
