import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ---------- Orbiting geometric shapes around center ---------- */
function OrbitRing() {
  const groupRef = useRef();
  const count = 12;

  const shapes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.2 + Math.sin(i * 1.7) * 0.4;
      const yOff = Math.sin(i * 2.3) * 0.6;
      const type = i % 4; // 0=octa, 1=tetra, 2=icosa, 3=box
      const scale = 0.06 + (Math.sin(i * 3.1) * 0.5 + 0.5) * 0.06;
      const speed = 0.3 + (Math.sin(i * 4.7) * 0.5 + 0.5) * 0.4;
      const color = i % 3 === 0 ? "#F5A623" : "#7C5CFF";
      arr.push({ angle, radius, yOff, type, scale, speed, color, baseAngle: angle });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1;
    groupRef.current.children.forEach((mesh, i) => {
      const s = shapes[i];
      const a = s.baseAngle + t * s.speed * 0.15;
      mesh.position.x = Math.cos(a) * s.radius;
      mesh.position.z = Math.sin(a) * s.radius;
      mesh.position.y = s.yOff + Math.sin(t * s.speed + i) * 0.3;
      mesh.rotation.x = t * 0.5;
      mesh.rotation.z = t * 0.3;
    });
  });

  const getGeometry = (type) => {
    switch (type) {
      case 0: return <octahedronGeometry args={[1, 0]} />;
      case 1: return <tetrahedronGeometry args={[1, 0]} />;
      case 2: return <icosahedronGeometry args={[1, 0]} />;
      default: return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <mesh key={i} scale={s.scale}>
          {getGeometry(s.type)}
          <meshBasicMaterial
            color={s.color}
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Glowing center orb ---------- */
function GlowOrb() {
  const ref = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.08);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.6 + Math.sin(t * 0.8) * 0.2);
      glowRef.current.material.opacity = 0.06 + Math.sin(t * 1.2) * 0.03;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#7C5CFF" transparent opacity={0.15} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#7C5CFF" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

/* ---------- DNA-like double helix lines ---------- */
function HelixLines() {
  const ref = useRef();
  const count = 80;

  const { posA, posB } = useMemo(() => {
    const a = new Float32Array(count * 3);
    const b = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const y = (i / count) * 8 - 4;
      const r = 1.2;
      a[i * 3] = Math.cos(t) * r;
      a[i * 3 + 1] = y;
      a[i * 3 + 2] = Math.sin(t) * r - 3;

      b[i * 3] = Math.cos(t + Math.PI) * r;
      b[i * 3 + 1] = y;
      b[i * 3 + 2] = Math.sin(t + Math.PI) * r - 3;
    }
    return { posA: a, posB: b };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={ref} position={[5, 0, -4]}>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={posA} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#7C5CFF" transparent opacity={0.15} />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={posB} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#F5A623" transparent opacity={0.1} />
      </line>
    </group>
  );
}

/* ---------- Mouse-reactive floating cubes ---------- */
function FloatingCubes() {
  const groupRef = useRef();
  const cubeCount = 6;

  const cubes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < cubeCount; i++) {
      arr.push({
        pos: [
          Math.sin(i * 2.7) * 5,
          Math.sin(i * 1.9) * 2.5,
          -2 - (Math.sin(i * 3.8) * 0.5 + 0.5) * 5,
        ],
        scale: 0.08 + (Math.sin(i * 5.1) * 0.5 + 0.5) * 0.12,
        rotSpeed: 0.3 + (Math.sin(i * 6.3) * 0.5 + 0.5) * 0.7,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((mesh, i) => {
      const c = cubes[i];
      const t = state.clock.elapsedTime;
      mesh.rotation.x = t * c.rotSpeed;
      mesh.rotation.y = t * c.rotSpeed * 0.7;
      mesh.position.y = c.pos[1] + Math.sin(t * 0.6 + i * 2) * 0.4;
      // Mouse parallax
      mesh.position.x = c.pos[0] + state.mouse.x * 0.3 * (i % 2 === 0 ? 1 : -1);
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map((c, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh position={c.pos} scale={c.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#7C5CFF" : "#F5A623"}
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ---------- Main exported scene ---------- */
export default function HeroScene({ className, style }) {
  return (
    <div className={`hero-scene w-full h-full ${className || ""}`} style={style} aria-hidden="true">
      <Canvas
        style={{ width: "100%", height: "100%", display: "block" }}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, dpr: [1, 2] }}
        dpr={[1, 2]}
      >
        <OrbitRing />
        <GlowOrb />
        <HelixLines />
        <FloatingCubes />
      </Canvas>
    </div>
  );
}
