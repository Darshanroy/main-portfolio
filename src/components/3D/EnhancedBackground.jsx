import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, MeshWobbleMaterial, Torus, Octahedron } from '@react-three/drei'
import * as THREE from 'three'

// Stunning Morphing Sphere with Color Shifting
function MorphingSphere({ position, color1, color2, scale = 1, speed = 1, distortSpeed = 2 }) {
    const meshRef = useRef()
    const materialRef = useRef()

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // Complex rotation pattern
        meshRef.current.rotation.x = Math.sin(time * speed * 0.3) * 0.5
        meshRef.current.rotation.y = time * speed * 0.2
        meshRef.current.rotation.z = Math.cos(time * speed * 0.2) * 0.3

        // Pulsing scale effect
        const pulse = 1 + Math.sin(time * speed) * 0.1
        meshRef.current.scale.set(scale * pulse, scale * pulse, scale * pulse)

        // Color shifting between two colors
        if (materialRef.current) {
            const colorLerp = (Math.sin(time * speed * 0.5) + 1) / 2
            const currentColor = new THREE.Color(color1).lerp(new THREE.Color(color2), colorLerp)
            materialRef.current.color = currentColor
            materialRef.current.emissive = currentColor
        }
    })

    return (
        <Float speed={speed * 2} rotationIntensity={0.6} floatIntensity={1.2}>
            <Sphere ref={meshRef} args={[1, 128, 128]} position={position}>
                <MeshDistortMaterial
                    ref={materialRef}
                    color={color1}
                    attach="material"
                    distort={0.6}
                    speed={distortSpeed}
                    roughness={0.1}
                    metalness={0.9}
                    emissive={color1}
                    emissiveIntensity={0.5}
                />
            </Sphere>
        </Float>
    )
}

// Wobbling Torus Ring
function WobblingRing({ position, color1, color2, rotation = [0, 0, 0] }) {
    const meshRef = useRef()
    const materialRef = useRef()

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // Continuous rotation
        meshRef.current.rotation.x += 0.01
        meshRef.current.rotation.y += 0.015
        meshRef.current.rotation.z += 0.005

        // Color shift
        if (materialRef.current) {
            const colorLerp = (Math.sin(time * 0.8) + 1) / 2
            const currentColor = new THREE.Color(color1).lerp(new THREE.Color(color2), colorLerp)
            materialRef.current.color = currentColor
            materialRef.current.emissive = currentColor
        }
    })

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <mesh ref={meshRef} position={position} rotation={rotation}>
                <torusGeometry args={[1.5, 0.4, 32, 100]} />
                <MeshWobbleMaterial
                    ref={materialRef}
                    color={color1}
                    factor={0.8}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                    emissive={color1}
                    emissiveIntensity={0.4}
                />
            </mesh>
        </Float>
    )
}

// Rotating Octahedron
function RotatingOctahedron({ position, color1, color2, scale = 1 }) {
    const meshRef = useRef()
    const materialRef = useRef()

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        // Complex rotation
        meshRef.current.rotation.x = time * 0.5
        meshRef.current.rotation.y = time * 0.7
        meshRef.current.rotation.z = time * 0.3

        // Breathing effect
        const breath = 1 + Math.sin(time * 2) * 0.15
        meshRef.current.scale.set(scale * breath, scale * breath, scale * breath)

        // Color cycling
        if (materialRef.current) {
            const colorLerp = (Math.sin(time * 1.2) + 1) / 2
            const currentColor = new THREE.Color(color1).lerp(new THREE.Color(color2), colorLerp)
            materialRef.current.color = currentColor
            materialRef.current.emissive = currentColor
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
            <mesh ref={meshRef} position={position}>
                <octahedronGeometry args={[1, 0]} />
                <MeshDistortMaterial
                    ref={materialRef}
                    color={color1}
                    distort={0.4}
                    speed={3}
                    roughness={0.15}
                    metalness={0.85}
                    emissive={color1}
                    emissiveIntensity={0.6}
                />
            </mesh>
        </Float>
    )
}

// Orbiting Small Spheres
function OrbitingSpheres({ centerPosition, color, count = 8, radius = 3 }) {
    const groupRef = useRef()

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        groupRef.current.rotation.y = time * 0.5
        groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.2
    })

    const spheres = []
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(angle * 2) * 1

        spheres.push(
            <Sphere key={i} args={[0.15, 32, 32]} position={[x, y, z]}>
                <meshPhongMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                    shininess={100}
                />
            </Sphere>
        )
    }

    return (
        <group ref={groupRef} position={centerPosition}>
            {spheres}
        </group>
    )
}

// Main Background Component
export default function EnhancedBackground() {
    return (
        <div className="fixed inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 75 }}
                gl={{ antialias: true, alpha: true }}
            >
                {/* Enhanced Lighting */}
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#00D9FF" />
                <pointLight position={[-10, -10, -10]} intensity={1.5} color="#B026FF" />
                <pointLight position={[0, 0, 15]} intensity={1} color="#00FF88" />
                <spotLight
                    position={[0, 15, 0]}
                    angle={0.5}
                    penumbra={1}
                    intensity={2}
                    color="#FF6B00"
                    castShadow
                />
                <spotLight
                    position={[15, -5, 5]}
                    angle={0.4}
                    penumbra={1}
                    intensity={1.5}
                    color="#00D9FF"
                />

                {/* STUNNING MORPHING SPHERES ARRANGEMENT */}

                {/* Center Stage - Large Purple/Magenta Sphere */}
                <MorphingSphere
                    position={[0, 0, -5]}
                    color1="#B026FF"
                    color2="#FF00FF"
                    scale={2}
                    speed={0.8}
                    distortSpeed={2.5}
                />

                {/* Left Side - Green/Cyan Sphere */}
                <MorphingSphere
                    position={[-4, 2, -8]}
                    color1="#00FF88"
                    color2="#00D9FF"
                    scale={1.5}
                    speed={1}
                    distortSpeed={2}
                />

                {/* Right Side - Cyan/Purple Sphere */}
                <MorphingSphere
                    position={[5, -2, -10]}
                    color1="#00D9FF"
                    color2="#B026FF"
                    scale={1.8}
                    speed={0.9}
                    distortSpeed={3}
                />

                {/* Top - Orange/Purple Sphere */}
                <MorphingSphere
                    position={[2, 4, -7]}
                    color1="#FF6B00"
                    color2="#B026FF"
                    scale={1.2}
                    speed={1.2}
                    distortSpeed={2.5}
                />

                {/* Bottom Left - Green/Orange Sphere */}
                <MorphingSphere
                    position={[-3, -3, -6]}
                    color1="#00FF88"
                    color2="#FF6B00"
                    scale={1.3}
                    speed={1.1}
                    distortSpeed={2.8}
                />

                {/* Far Back - Large Purple Sphere */}
                <MorphingSphere
                    position={[0, -1, -15]}
                    color1="#B026FF"
                    color2="#00FF88"
                    scale={2.5}
                    speed={0.6}
                    distortSpeed={1.8}
                />

                {/* WOBBLING RINGS */}
                <WobblingRing
                    position={[-6, 0, -12]}
                    color1="#00D9FF"
                    color2="#B026FF"
                    rotation={[Math.PI / 4, 0, 0]}
                />

                <WobblingRing
                    position={[6, 3, -14]}
                    color1="#00FF88"
                    color2="#FF6B00"
                    rotation={[0, Math.PI / 3, Math.PI / 4]}
                />

                {/* ROTATING OCTAHEDRONS */}
                <RotatingOctahedron
                    position={[-5, -4, -9]}
                    color1="#FF6B00"
                    color2="#00D9FF"
                    scale={0.8}
                />

                <RotatingOctahedron
                    position={[4, 5, -11]}
                    color1="#00FF88"
                    color2="#B026FF"
                    scale={1}
                />

                <RotatingOctahedron
                    position={[0, 3, -13]}
                    color1="#B026FF"
                    color2="#00D9FF"
                    scale={0.7}
                />

                {/* ORBITING SPHERES SYSTEMS */}
                <OrbitingSpheres
                    centerPosition={[-7, 2, -10]}
                    color="#00D9FF"
                    count={6}
                    radius={2}
                />

                <OrbitingSpheres
                    centerPosition={[7, -3, -12]}
                    color="#00FF88"
                    count={8}
                    radius={2.5}
                />

                <OrbitingSpheres
                    centerPosition={[0, -5, -8]}
                    color="#B026FF"
                    count={10}
                    radius={1.8}
                />
            </Canvas>

            {/* Enhanced Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark/90 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 pointer-events-none" />
        </div>
    )
}
