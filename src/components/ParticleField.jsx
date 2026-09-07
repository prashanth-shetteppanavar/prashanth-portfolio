import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaveGrid() {
  const ref = useRef();
  const geomRef = useRef();

  const positions = useMemo(() => {
    return new THREE.PlaneGeometry(20, 16, 40, 30);
  }, []);

  useFrame((state) => {
    if (!geomRef.current) return;
    const pos = geomRef.current.attributes.position;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const wave =
        Math.sin(x * 0.35 + t * 0.7) * 0.28 +
        Math.sin(y * 0.5 + t * 0.5) * 0.18 +
        Math.sin((x + y) * 0.25 + t * 0.9) * 0.12;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
    if (ref.current) {
      ref.current.rotation.z = state.mouse.x * 0.02;
    }
  });

  return (
    <mesh ref={ref} position={[0, -2.6, -6]} rotation={[-1.15, 0, 0]}>
      <primitive object={positions} ref={geomRef} attach="geometry" />
      <meshBasicMaterial color="#7C5CFF" wireframe transparent opacity={0.25} />
    </mesh>
  );
}

function Particles() {
  const ref = useRef();
  const count = 300;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5 + 1;
      arr[i * 3 + 2] = r * Math.cos(phi) - 5;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.012;
    ref.current.rotation.y += state.mouse.x * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#EDEEF2" transparent opacity={0.3} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function ParticleField({ className }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.6, 5], fov: 55 }}
        gl={{ antialias: true, alpha: true, dpr: [1, 1.5] }}
        dpr={[1, 1.5]}
      >
        <WaveGrid />
        <Particles />
      </Canvas>
    </div>
  );
}
