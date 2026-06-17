import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { DoubleSide } from 'three'
import type * as THREE from 'three'
import { Group } from 'three'

interface MinecraftCharacterProps {
  mouseX: number
  mouseY: number
}

function GlowRing({
  innerRadius, outerRadius, color, opacity, position,
}: {
  innerRadius: number
  outerRadius: number
  color: string
  opacity: number
  position: [number, number, number]
}) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[innerRadius, outerRadius, 48]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={DoubleSide} depthWrite={false} />
    </mesh>
  )
}

export function MinecraftCharacter({ mouseX, mouseY }: MinecraftCharacterProps) {
  const groupRef = useRef<Group>(null)
  const headRef = useRef<THREE.Mesh>(null)

  const blinkRef = useRef(0)
  const blinkTimerRef = useRef(Math.random() * 4 + 2)

  useFrame((state, delta) => {
    if (!groupRef.current || !headRef.current) return
    const time = state.clock.elapsedTime

    const targetRotY = mouseX * 0.12
    const targetRotX = mouseY * 0.08
    headRef.current.rotation.y += (targetRotY - headRef.current.rotation.y) * 0.03
    headRef.current.rotation.x += (targetRotX - headRef.current.rotation.x) * 0.03

    groupRef.current.rotation.y += (mouseX * 0.05 - groupRef.current.rotation.y) * 0.02

    const breath = Math.sin(time * 1.2) * 0.015
    groupRef.current.position.y = breath

    groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.01

    blinkRef.current += delta
    if (blinkRef.current > blinkTimerRef.current) {
      blinkRef.current = 0
      blinkTimerRef.current = Math.random() * 4 + 2
    }
    const isBlinking = blinkRef.current < 0.1
    headRef.current.scale.y = isBlinking ? 0.1 : 1
  })

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      {/* Glow aura behind character */}
      <GlowRing innerRadius={0.2} outerRadius={0.55} color="#22c55e" opacity={0.12} position={[0, 0.25, -0.35]} />
      <GlowRing innerRadius={0.1} outerRadius={0.3} color="#eab308" opacity={0.08} position={[0, 0.25, -0.3]} />

      {/* Head */}
      <mesh ref={headRef} position={[0, 0.7, 0]}>
        <boxGeometry args={[0.32, 0.32, 0.32]} />
        <meshStandardMaterial color="#e8b88a" roughness={0.6} />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 0.86, 0]}>
        <boxGeometry args={[0.34, 0.08, 0.34]} />
        <meshStandardMaterial color="#2d1810" roughness={0.8} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.08, 0.72, 0.17]}>
        <boxGeometry args={[0.05, 0.05, 0.03]} />
        <meshStandardMaterial color="#0a0a0f" />
      </mesh>
      <mesh position={[0.08, 0.72, 0.17]}>
        <boxGeometry args={[0.05, 0.05, 0.03]} />
        <meshStandardMaterial color="#0a0a0f" />
      </mesh>
      {/* Eye highlights */}
      <mesh position={[-0.07, 0.73, 0.18]}>
        <boxGeometry args={[0.02, 0.02, 0.01]} />
        <meshBasicMaterial color="#fff" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0.09, 0.73, 0.18]}>
        <boxGeometry args={[0.02, 0.02, 0.01]} />
        <meshBasicMaterial color="#fff" transparent opacity={0.6} />
      </mesh>
      {/* Mouth */}
      <mesh position={[0, 0.64, 0.17]}>
        <boxGeometry args={[0.1, 0.025, 0.025]} />
        <meshStandardMaterial color="#5c3a1e" />
      </mesh>

      {/* Body / Torso */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.24, 0.32, 0.14]} />
        <meshStandardMaterial color="#2563eb" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Belt */}
      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.26, 0.04, 0.15]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} />
      </mesh>
      {/* Belt buckle */}
      <mesh position={[0, 0.22, 0.09]}>
        <boxGeometry args={[0.04, 0.04, 0.02]} />
        <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.3} roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.17, 0.35, 0]}>
        <boxGeometry args={[0.08, 0.28, 0.08]} />
        <meshStandardMaterial color="#2563eb" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Right Arm */}
      <mesh position={[0.17, 0.35, 0]}>
        <boxGeometry args={[0.08, 0.28, 0.08]} />
        <meshStandardMaterial color="#2563eb" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.07, 0.06, 0]}>
        <boxGeometry args={[0.1, 0.28, 0.1]} />
        <meshStandardMaterial color="#374151" roughness={0.7} />
      </mesh>
      {/* Right Leg */}
      <mesh position={[0.07, 0.06, 0]}>
        <boxGeometry args={[0.1, 0.28, 0.1]} />
        <meshStandardMaterial color="#374151" roughness={0.7} />
      </mesh>

      {/* Left Foot */}
      <mesh position={[-0.07, -0.09, 0.02]}>
        <boxGeometry args={[0.12, 0.04, 0.15]} />
        <meshStandardMaterial color="#2d1810" roughness={0.8} />
      </mesh>
      {/* Right Foot */}
      <mesh position={[0.07, -0.09, 0.02]}>
        <boxGeometry args={[0.12, 0.04, 0.15]} />
        <meshStandardMaterial color="#2d1810" roughness={0.8} />
      </mesh>
    </group>
  )
}
