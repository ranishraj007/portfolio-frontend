import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type RefObject } from 'react';
import { Color, MathUtils, type Group, type Points as ThreePoints, type PointsMaterial } from 'three';

type PointerState = {
  x: number;
  y: number;
};

function AtmosphereParticles({ pointerRef }: { pointerRef: RefObject<PointerState> }) {
  const pointsRef = useRef<ThreePoints>(null);
  const materialRef = useRef<PointsMaterial>(null);
  const tintRef = useRef(new Color('#22d3ee'));

  const positions = useMemo(() => {
    const count = 900;
    const nextPositions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      nextPositions[index * 3] = (Math.random() - 0.5) * 12;
      nextPositions[index * 3 + 1] = (Math.random() - 0.5) * 8;
      nextPositions[index * 3 + 2] = (Math.random() - 0.5) * 7;
    }

    return nextPositions;
  }, []);

  useFrame(({ clock }, delta) => {
    const pointer = pointerRef.current ?? { x: 0, y: 0 };

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.025;
      pointsRef.current.rotation.x = MathUtils.lerp(pointsRef.current.rotation.x, pointer.y * 0.12, 0.04);
      pointsRef.current.position.x = MathUtils.lerp(pointsRef.current.position.x, pointer.x * 0.18, 0.04);
    }

    if (materialRef.current) {
      tintRef.current.setHSL(MathUtils.euclideanModulo(0.52 + pointer.x * 0.08 + clock.elapsedTime * 0.015, 1), 0.8, 0.62);
      materialRef.current.color.lerp(tintRef.current, 0.04);
      materialRef.current.opacity = MathUtils.lerp(materialRef.current.opacity, 0.14 + Math.abs(pointer.y) * 0.18, 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        transparent
        color="#22d3ee"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.18}
      />
    </points>
  );
}

function AtmosphereRings({ pointerRef }: { pointerRef: RefObject<PointerState> }) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    const pointer = pointerRef.current ?? { x: 0, y: 0 };

    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.035;
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.16, 0.04);
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, pointer.y * -0.12, 0.04);
  });

  return (
    <group ref={groupRef} position={[0, 0, -2.2]}>
      {[2.7, 3.6, 4.55].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2.5, index * 0.5, index * 0.2]}>
          <torusGeometry args={[radius, 0.006, 12, 160]} />
          <meshBasicMaterial color={index === 1 ? '#f97316' : '#22d3ee'} transparent opacity={0.1} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function SiteAtmosphere() {
  const pointerRef = useRef<PointerState>({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-70">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.55} />
        <pointLight position={[2.5, 1.5, 2.5]} intensity={8} color="#22d3ee" />
        <pointLight position={[-2.5, -1.4, 2]} intensity={5} color="#f97316" />
        <AtmosphereParticles pointerRef={pointerRef} />
        <AtmosphereRings pointerRef={pointerRef} />
      </Canvas>
    </div>
  );
}

export default SiteAtmosphere;
