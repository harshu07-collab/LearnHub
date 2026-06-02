'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const PARTICLE_COUNT = 80;

const particleGeometry = (() => {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.4 + Math.random() * 1.8;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geo;
})();

function KnowledgeGem({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const gemRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mx = mouse.current.x;
    const my = mouse.current.y;

    if (gemRef.current) {
      gemRef.current.rotation.x = Math.sin(t * 0.12) * 0.08 + my * 0.25;
      gemRef.current.rotation.y += 0.004 + mx * 0.008;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -Math.sin(t * 0.1) * 0.06 - my * 0.15;
      wireRef.current.rotation.y -= 0.003 - mx * 0.005;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += 0.002;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI / 3;
      ring2Ref.current.rotation.z -= 0.0025;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.001;
      glowRef.current.rotation.x += 0.0005;
    }

    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const speed = 0.003 + ((i * 0.7) % 0.004);
        const x = pos[i3];
        const y = pos[i3 + 1];
        const z = pos[i3 + 2];
        const radius = Math.sqrt(x * x + y * y + z * z);
        const theta = Math.atan2(y, x) + speed;
        const phi = Math.acos(z / radius) + speed * 0.3;
        pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
        pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        pos[i3 + 2] = radius * Math.cos(phi);
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.025} wireframe />
      </mesh>

      <Float speed={1.0} rotationIntensity={0.05} floatIntensity={0.35}>
        <mesh ref={gemRef}>
          <icosahedronGeometry args={[1, 1]} />
          <meshPhysicalMaterial
            color="#6366f1"
            metalness={0.15}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.08}
            emissive="#818cf8"
            emissiveIntensity={0.12}
          />
        </mesh>
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[1.08, 0]} />
          <meshBasicMaterial color="#a5b4fc" transparent opacity={0.18} wireframe />
        </mesh>
      </Float>

      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.9, 0.018, 16, 80]} />
        <meshPhysicalMaterial
          color="#a78bfa"
          transparent
          opacity={0.3}
          metalness={0.5}
          roughness={0.2}
          emissive="#a78bfa"
          emissiveIntensity={0.04}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.3, 0.015, 16, 80]} />
        <meshPhysicalMaterial
          color="#818cf8"
          transparent
          opacity={0.2}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial
          size={0.035}
          color="#a5b4fc"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function ThreeModel() {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouse.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
  };

  return (
    <div
      className="w-[180px] h-[180px] md:w-[220px] md:h-[220px]"
      onPointerMove={handlePointerMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} intensity={0.6} color="#818cf8" />
        <pointLight position={[-4, -3, 3]} intensity={0.3} color="#6366f1" />
        <spotLight
          position={[0, 5, 5]}
          intensity={0.4}
          color="#a5b4fc"
          angle={0.3}
          penumbra={0.5}
        />
        <KnowledgeGem mouse={mouse} />
      </Canvas>
    </div>
  );
}
