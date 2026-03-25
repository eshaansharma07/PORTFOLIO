"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Points, PointMaterial, Sphere, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function HologramCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    mesh.rotation.y = state.clock.elapsedTime * 0.25;
    mesh.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.12;
    mesh.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.12;
  });

  return (
    <Float speed={2.4} rotationIntensity={0.8} floatIntensity={1.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 18]} />
        <MeshDistortMaterial
          color="#5ef2ff"
          emissive="#ff4fd8"
          emissiveIntensity={1}
          roughness={0.08}
          metalness={0.7}
          distort={0.36}
          speed={2.4}
          transparent
          opacity={0.88}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const positions = useMemo(() => {
    const array = new Float32Array(1200 * 3);
    for (let index = 0; index < array.length; index += 3) {
      array[index] = (Math.random() - 0.5) * 15;
      array[index + 1] = (Math.random() - 0.5) * 10;
      array[index + 2] = (Math.random() - 0.5) * 15;
    }
    return array;
  }, []);

  return (
    <Points positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#c4fbff" size={0.035} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

function Orbitals() {
  return (
    <>
      <Sphere args={[2.05, 64, 64]} scale={1}>
        <meshBasicMaterial color="#5ef2ff" wireframe transparent opacity={0.2} />
      </Sphere>
      <Sphere args={[2.45, 64, 64]} scale={[1.15, 0.55, 1.15]} rotation={[Math.PI / 2.2, 0, 0]}>
        <meshBasicMaterial color="#ff4fd8" wireframe transparent opacity={0.16} />
      </Sphere>
    </>
  );
}

export function HeroScene() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(94,242,255,0.1),transparent_55%)] md:h-[560px]">
      <Canvas camera={{ position: [0, 0, 5.6], fov: 50 }}>
        <color attach="background" args={["#050816"]} />
        <fog attach="fog" args={["#050816", 6, 14]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 4, 2]} intensity={2.4} color="#ffffff" />
        <pointLight position={[-3, 1, 3]} intensity={20} color="#5ef2ff" />
        <pointLight position={[2, -2, 3]} intensity={12} color="#ff4fd8" />
        <Stars radius={80} depth={40} count={3000} factor={4} saturation={0} fade speed={0.8} />
        <ParticleField />
        <Orbitals />
        <HologramCore />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.7} enablePan={false} />
      </Canvas>
    </div>
  );
}
