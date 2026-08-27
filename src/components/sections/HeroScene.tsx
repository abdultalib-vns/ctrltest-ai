import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function GlowSphere({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 4]} />
        <MeshDistortMaterial color={color} transparent opacity={0.45} distort={0.4} speed={2} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function FloatingCodePanel({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[2, 1.2, 0.05]} />
        <meshStandardMaterial color="#10101C" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[2.06, 1.26, 0.02]} />
        <meshStandardMaterial color="#00E5FF" transparent opacity={0.25} emissive="#00E5FF" emissiveIntensity={0.3} />
      </mesh>
      {[0.35, 0.18, 0.01, -0.16, -0.33].map((y, i) => (
        <mesh key={i} position={[-0.2 + i * 0.04, y, 0.03]}>
          <boxGeometry args={[0.5 + Math.random() * 0.7, 0.07, 0.01]} />
          <meshStandardMaterial
            color={["#00E5FF", "#7C3AED", "#00D084", "#F59E0B", "#00E5FF"][i]}
            transparent
            opacity={0.7}
            emissive={["#00E5FF", "#7C3AED", "#00D084", "#F59E0B", "#00E5FF"][i]}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const count = 100;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#00E5FF" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00E5FF" />
        <pointLight position={[-5, -3, 3]} intensity={0.7} color="#7C3AED" />
        
        <GlowSphere position={[3, 1.5, -2]} color="#00E5FF" size={1.4} />
        <GlowSphere position={[-2.5, -1, -1]} color="#7C3AED" size={1} />
        <GlowSphere position={[0.5, 2.5, -3]} color="#00D084" size={0.7} />
        
        <FloatingCodePanel position={[-3.5, 1.5, -1]} rotation={[0.1, 0.4, 0]} />
        <FloatingCodePanel position={[4, -1, -2]} rotation={[-0.1, -0.3, 0.05]} />
        
        <Particles />
      </Canvas>
    </div>
  );
}
