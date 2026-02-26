"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// 3D Gaussian mixture parameters (3 components)
interface GaussianComponent {
  mean: readonly [number, number, number];
  sigma: readonly [number, number, number];
  weight: number;
}

const COMPONENTS: GaussianComponent[] = [
  { mean: [0.7, 0.1, 0.5], sigma: [0.35, 0.3, 0.35], weight: 0.4 },
  { mean: [-0.6, -0.1, -0.4], sigma: [0.3, 0.28, 0.35], weight: 0.35 },
  { mean: [-0.1, 0.15, -0.6], sigma: [0.4, 0.3, 0.3], weight: 0.25 },
];

const POINT_COUNT = 400;

// Box-Muller transform
function randn(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Sample points from the 3D Gaussian mixture
function samplePoints(count: number): { positions: Float32Array; densities: Float32Array } {
  const positions = new Float32Array(count * 3);
  const densities = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Pick a component based on weights
    const r = Math.random();
    let cumWeight = 0;
    let comp = COMPONENTS[0];
    for (const c of COMPONENTS) {
      cumWeight += c.weight;
      if (r <= cumWeight) { comp = c; break; }
    }

    // Sample from chosen Gaussian
    const x = comp.mean[0] + randn() * comp.sigma[0];
    const y = comp.mean[1] + randn() * comp.sigma[1];
    const z = comp.mean[2] + randn() * comp.sigma[2];
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Compute density at this point (sum of all components)
    let d = 0;
    for (const c of COMPONENTS) {
      const dx = x - c.mean[0], dy = y - c.mean[1], dz = z - c.mean[2];
      const exponent = -(dx * dx) / (2 * c.sigma[0] ** 2)
                       - (dy * dy) / (2 * c.sigma[1] ** 2)
                       - (dz * dz) / (2 * c.sigma[2] ** 2);
      d += c.weight * Math.exp(exponent);
    }
    densities[i] = d;
  }

  return { positions, densities };
}

function PointCloud() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const { positions: pos, densities } = samplePoints(POINT_COUNT);
    const col = new Float32Array(POINT_COUNT * 3);

    // Normalize densities for color mapping
    let maxD = 0;
    for (let i = 0; i < POINT_COUNT; i++) {
      if (densities[i] > maxD) maxD = densities[i];
    }

    // Blue (#3b82f6) → Cyan (#22d3ee) gradient by density
    const lowR = 0x3b / 255, lowG = 0x82 / 255, lowB = 0xf6 / 255;
    const highR = 0x22 / 255, highG = 0xd3 / 255, highB = 0xee / 255;

    for (let i = 0; i < POINT_COUNT; i++) {
      const t = maxD > 0 ? densities[i] / maxD : 0;
      col[i * 3] = lowR + (highR - lowR) * t;
      col[i * 3 + 1] = lowG + (highG - lowG) * t;
      col[i * 3 + 2] = lowB + (highB - lowB) * t;
    }

    return { positions: pos, colors: col };
  }, []);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function ContourEllipsoids() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Subtle breathing animation
    groupRef.current.children.forEach((child, i) => {
      const breath = 1.0 + 0.04 * Math.sin(t * 0.8 + i * 2.1);
      const comp = COMPONENTS[i];
      child.scale.set(
        comp.sigma[0] * 2.0 * breath,
        comp.sigma[1] * 2.0 * breath,
        comp.sigma[2] * 2.0 * breath,
      );
    });
  });

  return (
    <group ref={groupRef}>
      {COMPONENTS.map((comp, i) => (
        <mesh
          key={i}
          position={[comp.mean[0], comp.mean[1], comp.mean[2]]}
          scale={[comp.sigma[0] * 2.0, comp.sigma[1] * 2.0, comp.sigma[2] * 2.0]}
        >
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial
            color="#60a5fa"
            wireframe
            transparent
            opacity={0.15 + i * 0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const baseR = 2.2;
    const rot = t * 0.08;
    const bobY = 0.3 + Math.sin(t * 0.15) * 0.2;

    camera.position.x = baseR * Math.cos(rot);
    camera.position.y = bobY;
    camera.position.z = baseR * Math.sin(rot);
    camera.lookAt(0, 0.05, 0);
  });

  return null;
}

export default function DensitySurface() {
  return (
    <>
      <PointCloud />
      <ContourEllipsoids />
      <CameraRig />
    </>
  );
}
