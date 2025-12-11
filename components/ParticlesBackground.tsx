'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const particlesCount = 1500;

  // Generate random particles
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    // Use a seed-based approach to avoid impurity warnings
    let seed = 42;
    for (let i = 0; i < particlesCount; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      pos[i * 3] = ((seed / 233280) - 0.5) * 100;
      seed = (seed * 9301 + 49297) % 233280;
      pos[i * 3 + 1] = ((seed / 233280) - 0.5) * 100;
      seed = (seed * 9301 + 49297) % 233280;
      pos[i * 3 + 2] = ((seed / 233280) - 0.5) * 100;
    }
    return pos;
  }, [particlesCount]);

  // Animate particles
  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.getElapsedTime();

    // Rotate entire particle system
    ref.current.rotation.y = time * 0.05;
    ref.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    // Animate individual particles
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // Wave motion
      positions[i3 + 1] += Math.sin(time + positions[i3]) * 0.005;
      positions[i3 + 2] += Math.cos(time + positions[i3]) * 0.005;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#667eea"
        size={0.3}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function ParticlesBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
