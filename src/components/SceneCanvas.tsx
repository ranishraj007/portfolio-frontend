import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Points, PointMaterial, Sphere } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group } from "three";

function OrbCluster() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x += delta * 0.04;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.8} rotationIntensity={1.8} floatIntensity={2.2}>
        <Sphere args={[1.45, 64, 64]} position={[-0.8, 0.2, 0]}>
          <MeshDistortMaterial
            color="#38bdf8"
            emissive="#0f172a"
            emissiveIntensity={0.55}
            roughness={0.08}
            metalness={0.4}
            distort={0.45}
            speed={2.5}
            transparent
            opacity={0.88}
          />
        </Sphere>
      </Float>
      <Float speed={2.4} rotationIntensity={2} floatIntensity={2.8}>
        <Icosahedron args={[0.72, 1]} position={[1.5, 0.9, -0.4]}>
          <MeshDistortMaterial
            color="#f97316"
            emissive="#7c2d12"
            emissiveIntensity={0.8}
            roughness={0.15}
            metalness={0.55}
            distort={0.3}
            speed={3.1}
          />
        </Icosahedron>
      </Float>
      <Float speed={2} rotationIntensity={1.4} floatIntensity={1.8}>
        <Sphere args={[0.45, 32, 32]} position={[0.5, -1.2, 0.9]}>
          <meshStandardMaterial color="#f8fafc" emissive="#67e8f9" emissiveIntensity={0.35} />
        </Sphere>
      </Float>
    </group>
  );
}

function StarField() {
  const points = useMemo(() => {
    const positions = new Float32Array(900);
    for (let i = 0; i < 300; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.4) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  return (
    <Points positions={points} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#e0f2fe" size={0.04} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

function SceneCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 2, 4]} intensity={2.2} color="#7dd3fc" />
        <pointLight position={[-4, -2, 2]} intensity={18} color="#f97316" />
        <StarField />
        <OrbCluster />
      </Canvas>
    </div>
  );
}

export default SceneCanvas;
