import { usePortfolioData } from '../queries/usePortfolioData';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial, Tetrahedron } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
  Color,
  MathUtils,
  type Group,
  type PointLight,
  type Points as ThreePoints,
  type PointsMaterial,
} from 'three';

type PointerState = {
  x: number;
  y: number;
};

type PointerRef = {
  current: PointerState;
};

const skillGroups = [
  {
    title: 'Languages',
    accent: 'from-cyan-400/20 via-sky-400/10 to-transparent',
    border: 'border-cyan-300/20',
    color: '#22d3ee',
    items: ['JavaScript (ES6+)', 'HTML', 'CSS', 'Python (Basic)', 'C++ (Basic)'],
  },
  {
    title: 'Frontend Development',
    accent: 'from-emerald-400/20 via-teal-400/10 to-transparent',
    border: 'border-emerald-300/20',
    color: '#34d399',
    items: ['React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Material UI (MUI)'],
  },
  {
    title: 'State Data Management',
    accent: 'from-amber-400/20 via-orange-400/10 to-transparent',
    border: 'border-amber-300/20',
    color: '#f59e0b',
    items: ['Redux Toolkit', 'React Query (TanStack Query)', 'Axios'],
  },
  {
    title: 'Backend (Basic)',
    accent: 'from-fuchsia-400/20 via-pink-400/10 to-transparent',
    border: 'border-fuchsia-300/20',
    color: '#e879f9',
    items: ['Django REST Framework', 'REST API Integration'],
  },
  {
    title: 'Tools & Technologies',
    accent: 'from-violet-400/20 via-indigo-400/10 to-transparent',
    border: 'border-violet-300/20',
    color: '#a78bfa',
    items: [
      'Git',
      'GitHub',
      'Postman',
      'Docker (Basic)',
      'ESLint',
      'Prettier',
      'Husky',
      'lint-staged',
    ],
  },
  {
    title: 'Mapping & Visualization',
    accent: 'from-rose-400/20 via-red-400/10 to-transparent',
    border: 'border-rose-300/20',
    color: '#fb7185',
    items: ['Mapbox GL JS', 'Mapbox Studio'],
  },
  {
    title: 'Systems',
    accent: 'from-slate-200/15 via-slate-400/10 to-transparent',
    border: 'border-slate-200/15',
    color: '#e2e8f0',
    items: ['Linux (CLI, basic system operations)', 'Windows'],
  },
] as const;

function PointerLight({ activeColor, pointerRef }: { activeColor: string; pointerRef: PointerRef }) {
  const lightRef = useRef<PointLight>(null);

  useFrame(({ clock }) => {
    if (!lightRef.current) return;

    const pointer = pointerRef.current;

    lightRef.current.position.x = MathUtils.lerp(lightRef.current.position.x, pointer.x * 4, 0.08);
    lightRef.current.position.y = MathUtils.lerp(lightRef.current.position.y, pointer.y * 2.5, 0.08);
    lightRef.current.intensity = 18 + Math.sin(clock.elapsedTime * 2) * 5;
  });

  return <pointLight ref={lightRef} position={[0, 0, 3]} intensity={18} color={activeColor} />;
}

function ReactiveParticles({ activeColor, pointerRef }: { activeColor: string; pointerRef: PointerRef }) {
  const pointsRef = useRef<ThreePoints>(null);
  const materialRef = useRef<PointsMaterial>(null);
  const activeColorRef = useRef(new Color(activeColor));
  const pointerTintRef = useRef(new Color(activeColor));
  const mixedColorRef = useRef(new Color(activeColor));

  const positions = useMemo(() => {
    const particleCount = 620;
    const nextPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const radius = 2.4 + Math.random() * 4.8;
      const angle = Math.random() * Math.PI * 2;
      const depth = (Math.random() - 0.5) * 4.5;

      nextPositions[i * 3] = Math.cos(angle) * radius;
      nextPositions[i * 3 + 1] = Math.sin(angle) * radius * 0.45 + (Math.random() - 0.5) * 1.8;
      nextPositions[i * 3 + 2] = depth;
    }

    return nextPositions;
  }, []);

  useEffect(() => {
    activeColorRef.current.set(activeColor);
  }, [activeColor]);

  useFrame(({ clock }, delta) => {
    const pointer = pointerRef.current;

    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * (0.05 + Math.abs(pointer.x) * 0.04);
      pointsRef.current.rotation.x = MathUtils.lerp(pointsRef.current.rotation.x, pointer.y * 0.28, 0.05);
      pointsRef.current.position.x = MathUtils.lerp(pointsRef.current.position.x, pointer.x * 0.25, 0.05);
    }

    if (materialRef.current) {
      pointerTintRef.current.setHSL(
        MathUtils.euclideanModulo(0.54 + pointer.x * 0.12 + clock.elapsedTime * 0.025, 1),
        0.82,
        0.66,
      );
      mixedColorRef.current.copy(activeColorRef.current).lerp(pointerTintRef.current, 0.5);
      materialRef.current.color.lerp(mixedColorRef.current, 0.08);
      materialRef.current.opacity = MathUtils.lerp(
        materialRef.current.opacity,
        0.28 + Math.abs(pointer.y) * 0.38,
        0.08,
      );
      materialRef.current.size = MathUtils.lerp(
        materialRef.current.size,
        0.025 + Math.abs(pointer.x) * 0.02,
        0.08,
      );
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
        color={activeColor}
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.42}
      />
    </points>
  );
}

function EnergyRings({ activeColor, pointerRef }: { activeColor: string; pointerRef: PointerRef }) {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;

    const pointer = pointerRef.current;

    groupRef.current.rotation.z += delta * 0.14;
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.38, 0.06);
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, pointer.y * -0.24, 0.06);
    groupRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.4) * 0.035);
  });

  return (
    <group ref={groupRef} position={[0.65, 0.05, -1.1]}>
      {[2.1, 2.75, 3.35].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2.6, index * 0.45, index * 0.28]}>
          <torusGeometry args={[radius, 0.01 + index * 0.004, 18, 180]} />
          <meshBasicMaterial
            color={activeColor}
            transparent
            opacity={0.32 - index * 0.06}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingPrisms({ activeColor, pointerRef }: { activeColor: string; pointerRef: PointerRef }) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const pointer = pointerRef.current;

    groupRef.current.rotation.y += delta * 0.1;
    groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, pointer.x * -0.35, 0.06);
    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, pointer.y * -0.2, 0.06);
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.7} rotationIntensity={1.4} floatIntensity={2.3}>
        <Icosahedron args={[0.9, 1]} position={[-2.1, 0.75, 0.15]}>
          <MeshDistortMaterial
            color={activeColor}
            emissive={activeColor}
            emissiveIntensity={0.55}
            roughness={0.18}
            metalness={0.45}
            distort={0.22}
            speed={2.4}
            transparent
            opacity={0.62}
          />
        </Icosahedron>
      </Float>
      <Float speed={2.15} rotationIntensity={1.8} floatIntensity={2}>
        <Tetrahedron args={[0.72, 0]} position={[2.2, -0.55, 0.3]} rotation={[0.4, 0.2, 0.1]}>
          <meshStandardMaterial
            color="#f8fafc"
            emissive={activeColor}
            emissiveIntensity={0.45}
            roughness={0.24}
            metalness={0.5}
            transparent
            opacity={0.72}
          />
        </Tetrahedron>
      </Float>
    </group>
  );
}

function SkillsScene({ activeColor, pointerRef }: { activeColor: string; pointerRef: PointerRef }) {
  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 48 }} dpr={[1, 1.7]}>
      <color attach="background" args={['#020617']} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 2, 4]} intensity={1.3} color="#e0f2fe" />
      <PointerLight activeColor={activeColor} pointerRef={pointerRef} />
      <ReactiveParticles activeColor={activeColor} pointerRef={pointerRef} />
      <EnergyRings activeColor={activeColor} pointerRef={pointerRef} />
      <FloatingPrisms activeColor={activeColor} pointerRef={pointerRef} />
    </Canvas>
  );
}

function Skills() {
  const { data, isLoading } = usePortfolioData();
  const pointerRef = useRef<PointerState>({ x: 0, y: 0 });
  const [activeColor, setActiveColor] = useState<string>(skillGroups[0].color);

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

        pointerRef.current.x = MathUtils.clamp(x, -1, 1);
        pointerRef.current.y = MathUtils.clamp(y, -1, 1);

        event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
      }}
      style={
        {
          '--pointer-x': '50%',
          '--pointer-y': '24%',
        } as CSSProperties
      }
      className="relative mb-8 overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-950 px-5 py-10 shadow-[0_30px_90px_-45px_rgba(14,165,233,0.6)] sm:px-7 lg:px-9"
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <SkillsScene activeColor={activeColor} pointerRef={pointerRef} />
      </div>
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), ${activeColor}30, transparent 30%), linear-gradient(180deg, rgba(2, 6, 23, 0.24), rgba(2, 6, 23, 0.92) 62%, rgba(2, 6, 23, 0.98))`,
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative">
        <div className="mb-9 grid gap-7 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-cyan-200"
            >
              Interactive Skill Matrix
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl"
            >
              Skills that shift with the work in motion.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="max-w-xl text-sm leading-7 text-slate-300 md:text-base"
          >
            A practical toolkit shaped by shipping interfaces, integrating APIs, and building
            reliable frontend systems. Move the pointer around the section and hover a stack to
            tint the scene.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="mb-6 grid gap-3 sm:grid-cols-3"
        >
          {[
            ['UI Systems', 'React, styling, reusable views'],
            ['Data Flow', 'Queries, stores, API contracts'],
            ['Geo Interfaces', 'Maps, layers, visualization'],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-[1.25rem] border border-white/10 bg-white/7 px-4 py-4 backdrop-blur-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                {label}
              </p>
              <p className="mt-2 text-sm font-medium text-white">{value}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              onPointerEnter={() => setActiveColor(group.color)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + index * 0.07 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`group relative overflow-hidden rounded-[1.75rem] border bg-slate-950/64 p-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.95)] backdrop-blur-xl transition-colors duration-300 ${group.border}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${group.accent} opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at var(--pointer-x) var(--pointer-y), ${group.color}24, transparent 42%)`,
                }}
              />
              <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm text-slate-100 shadow-inner shadow-white/5 transition duration-300 group-hover:border-white/20 group-hover:bg-white/12"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Skills;
