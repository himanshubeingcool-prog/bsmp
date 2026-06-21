import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { DoubleSide } from 'three'
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

// ===== Enderman proportions (in "pixels", scaled to scene units) =====
// The Enderman is tall and spindly: small 8x8x8 head, slim 8x12x4 torso,
// and very long thin 2x30x2 arms and legs. Everything is near-black with a
// faint purple sheen and glowing magenta eyes — End-realm vibes.
const U = 0.04 // one Minecraft pixel in scene units

const BODY = '#2a2733'       // dark grey-purple, reads against the near-black bg
const BODY_NOISE = '#3a3550' // lighter purple-tinted noise blocks
const LIMB = '#211f29'       // limbs a touch darker
const EYE = '#e23bff'        // iconic magenta eye glow
const EYE_CORE = '#ff9bff'   // hot inner core

// Small deterministic set of "texture noise" blocks scattered on the torso,
// echoing the Enderman's mottled speckle. Stable across renders.
function useNoiseBlocks(seed: number, count: number, w: number, h: number, d: number) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const r = ((i * 9301 + seed * 49297) % 233280) / 233280
      const r2 = ((i * 4099 + seed * 7919) % 233280) / 233280
      const r3 = ((i * 26041 + seed * 40503) % 233280) / 233280
      return {
        id: i,
        x: (r - 0.5) * w * 0.7,
        y: (r2 - 0.5) * h * 0.8,
        face: r3 > 0.5 ? d / 2 + 0.001 : -(d / 2 + 0.001),
        size: (0.8 + r3 * 1.4) * U,
      }
    })
  }, [seed, count, w, h, d])
}

export function MinecraftCharacter({ mouseX, mouseY }: MinecraftCharacterProps) {
  const groupRef = useRef<Group>(null)
  const headRef = useRef<Group>(null)
  const leftArmRef = useRef<Group>(null)
  const rightArmRef = useRef<Group>(null)
  const leftLegRef = useRef<Group>(null)
  const rightLegRef = useRef<Group>(null)
  const eyesRef = useRef<Group>(null)

  const blinkRef = useRef(0)
  const blinkTimerRef = useRef(Math.random() * 5 + 3)

  // Spring-damped cursor targets so motion eases in/out instead of snapping.
  const headYaw = useRef({ v: 0, vel: 0 })
  const headPitch = useRef({ v: 0, vel: 0 })
  const bodyYaw = useRef({ v: 0, vel: 0 })
  const lean = useRef({ v: 0, vel: 0 })

  // Frame-rate independent damped spring step.
  function spring(s: { v: number; vel: number }, target: number, stiffness: number, damping: number, dt: number) {
    const force = (target - s.v) * stiffness
    s.vel = (s.vel + force * dt) * Math.exp(-damping * dt)
    s.v += s.vel * dt
    return s.v
  }

  useFrame((state, delta) => {
    if (!groupRef.current || !headRef.current) return
    const time = state.clock.elapsedTime
    const dt = Math.min(delta, 1 / 30)

    // --- Cursor-driven motion: the Enderman fixes its stare on you ---
    spring(headYaw.current, mouseX * 0.7, 95, 14, dt)
    spring(headPitch.current, -mouseY * 0.45, 95, 14, dt)
    spring(bodyYaw.current, mouseX * 0.3, 55, 13, dt)
    spring(lean.current, mouseX * 0.1, 45, 12, dt)

    headRef.current.rotation.y = headYaw.current.v
    headRef.current.rotation.x = headPitch.current.v
    groupRef.current.rotation.y = bodyYaw.current.v

    // --- Idle life: slow, eerie sway (taller body = slower bob) ---
    const breath = Math.sin(time * 1.0) * 0.02
    groupRef.current.position.y = breath
    groupRef.current.rotation.z = lean.current.v + Math.sin(time * 0.45) * 0.008

    // Long limbs sway gently from shoulders/hips; a touch more when reaching.
    const reach = Math.abs(mouseX) * 0.12
    const swing = Math.sin(time * 1.1) * (0.06 + reach)
    if (leftArmRef.current) leftArmRef.current.rotation.x = swing
    if (rightArmRef.current) rightArmRef.current.rotation.x = -swing
    if (leftLegRef.current) leftLegRef.current.rotation.x = -swing * 0.4
    if (rightLegRef.current) rightLegRef.current.rotation.x = swing * 0.4

    // --- Eye flicker: rare, quick blink of the glow ---
    blinkRef.current += delta
    if (blinkRef.current > blinkTimerRef.current) {
      blinkRef.current = 0
      blinkTimerRef.current = Math.random() * 5 + 3
    }
    const isBlinking = blinkRef.current < 0.08
    if (eyesRef.current) eyesRef.current.scale.y = isBlinking ? 0.1 : 1
  })

  // Dimensions (scene units) — note the very long limbs.
  const head = 8 * U
  const bodyW = 8 * U
  const bodyH = 12 * U
  const bodyD = 4 * U
  const limbW = 2 * U       // very thin
  const limbH = 30 * U      // very long

  // Y anchors: legs occupy 0..limbH, then torso, then head on top.
  const legTop = limbH
  const bodyCenterY = legTop + bodyH / 2
  const bodyTopY = legTop + bodyH

  const bodyNoise = useNoiseBlocks(1, 10, bodyW, bodyH, bodyD)

  return (
    <group ref={groupRef} position={[0, -1.05, 0]} scale={0.95}>
      {/* Eerie End-purple aura behind the Enderman */}
      <GlowRing innerRadius={0.18} outerRadius={0.62} color="#a855f7" opacity={0.14} position={[0, bodyCenterY, -0.35]} />
      <GlowRing innerRadius={0.08} outerRadius={0.34} color="#e23bff" opacity={0.1} position={[0, bodyCenterY, -0.3]} />

      {/* ===== Head (pivots from neck) — small cube with glowing eyes ===== */}
      <group ref={headRef} position={[0, bodyTopY, 0]}>
        <group position={[0, head / 2, 0]}>
          {/* Skull */}
          <mesh>
            <boxGeometry args={[head, head, head]} />
            <meshStandardMaterial color={BODY} roughness={0.95} metalness={0.05} />
          </mesh>
          {/* faint purple speckle on the face/sides */}
          <mesh position={[-head * 0.28, head * 0.18, head / 2 + 0.001]}>
            <boxGeometry args={[1.5 * U, 1.5 * U, 0.01]} />
            <meshStandardMaterial color={BODY_NOISE} roughness={0.9} />
          </mesh>
          <mesh position={[head * 0.3, -head * 0.2, head / 2 + 0.001]}>
            <boxGeometry args={[1 * U, 1 * U, 0.01]} />
            <meshStandardMaterial color={BODY_NOISE} roughness={0.9} />
          </mesh>

          {/* Eyes — wide glowing magenta bars, grouped so they flicker together */}
          <group ref={eyesRef} position={[0, head * 0.08, head / 2 + 0.002]}>
            {/* left eye */}
            <mesh position={[-2.1 * U, 0, 0]}>
              <boxGeometry args={[2.4 * U, 1.4 * U, 0.02]} />
              <meshStandardMaterial color={EYE} emissive={EYE} emissiveIntensity={2.6} toneMapped={false} />
            </mesh>
            <mesh position={[-2.1 * U, 0, 0.012]}>
              <boxGeometry args={[1.2 * U, 0.7 * U, 0.02]} />
              <meshStandardMaterial color={EYE_CORE} emissive={EYE_CORE} emissiveIntensity={3} toneMapped={false} />
            </mesh>
            {/* right eye */}
            <mesh position={[2.1 * U, 0, 0]}>
              <boxGeometry args={[2.4 * U, 1.4 * U, 0.02]} />
              <meshStandardMaterial color={EYE} emissive={EYE} emissiveIntensity={2.6} toneMapped={false} />
            </mesh>
            <mesh position={[2.1 * U, 0, 0.012]}>
              <boxGeometry args={[1.2 * U, 0.7 * U, 0.02]} />
              <meshStandardMaterial color={EYE_CORE} emissive={EYE_CORE} emissiveIntensity={3} toneMapped={false} />
            </mesh>
            {/* dark bridge between eyes */}
            <mesh position={[0, 0, 0.004]}>
              <boxGeometry args={[1.8 * U, 1.4 * U, 0.02]} />
              <meshStandardMaterial color={BODY} roughness={1} />
            </mesh>
          </group>

          {/* eye light spills magenta onto the chest */}
          <pointLight position={[0, 0, 0.2]} intensity={0.6} distance={1.2} color={EYE} />
        </group>
      </group>

      {/* ===== Torso ===== */}
      <mesh position={[0, bodyCenterY, 0]}>
        <boxGeometry args={[bodyW, bodyH, bodyD]} />
        <meshStandardMaterial color={BODY} roughness={0.95} metalness={0.05} />
      </mesh>
      {/* scattered purple-tint noise blocks on the torso */}
      {bodyNoise.map((b) => (
        <mesh key={b.id} position={[b.x, bodyCenterY + b.y, b.face]}>
          <boxGeometry args={[b.size, b.size, 0.01]} />
          <meshStandardMaterial color={BODY_NOISE} roughness={0.9} />
        </mesh>
      ))}

      {/* ===== Arms (pivot from shoulder) — long and thin, hang to ankles ===== */}
      <group ref={leftArmRef} position={[-(bodyW / 2 + limbW / 2), bodyTopY - 0.5 * U, 0]}>
        <mesh position={[0, -limbH / 2, 0]}>
          <boxGeometry args={[limbW, limbH, limbW]} />
          <meshStandardMaterial color={LIMB} roughness={0.95} />
        </mesh>
      </group>
      <group ref={rightArmRef} position={[bodyW / 2 + limbW / 2, bodyTopY - 0.5 * U, 0]}>
        <mesh position={[0, -limbH / 2, 0]}>
          <boxGeometry args={[limbW, limbH, limbW]} />
          <meshStandardMaterial color={LIMB} roughness={0.95} />
        </mesh>
      </group>

      {/* ===== Legs (pivot from hip) — long, splayed slightly ===== */}
      <group ref={leftLegRef} position={[-(bodyW / 2 - limbW), legTop, 0]} rotation={[0, 0, 0.05]}>
        <mesh position={[0, -limbH / 2, 0]}>
          <boxGeometry args={[limbW, limbH, limbW]} />
          <meshStandardMaterial color={LIMB} roughness={0.95} />
        </mesh>
      </group>
      <group ref={rightLegRef} position={[bodyW / 2 - limbW, legTop, 0]} rotation={[0, 0, -0.05]}>
        <mesh position={[0, -limbH / 2, 0]}>
          <boxGeometry args={[limbW, limbH, limbW]} />
          <meshStandardMaterial color={LIMB} roughness={0.95} />
        </mesh>
      </group>
    </group>
  )
}
