"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { theme } from "@/config/theme";

interface NetworkSceneProps {
  nodeCount: number;
}

/**
 * Deterministic pseudo-random generator (mulberry32) seeded from a fixed
 * value. Used instead of `Math.random` so the node layout is a pure function
 * of `nodeCount` — identical across re-renders — rather than a source of
 * render impurity.
 */
function createRng(seed: number) {
  let state = seed;
  return function next() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * An abstract, slowly-drifting node graph — a visual stand-in for
 * distributed systems / data flowing through an architecture, rather than a
 * decorative rotating primitive. Nodes are instanced (one draw call) and
 * connections between nearby nodes are drawn as a single line-segment
 * geometry, keeping the scene cheap regardless of node count.
 */
export function NetworkScene({ nodeCount }: NetworkSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  const { positions, connections, speeds, phases } = useMemo(() => {
    const rng = createRng(0x9e3779b9 ^ nodeCount);
    const radius = 4.2;
    const pos: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      // Distribute points within a flattened sphere for a "cloud of data" feel.
      const r = radius * Math.cbrt(rng());
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      pos.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.75,
          r * Math.cos(phi) * 0.6
        )
      );
    }

    const maxDistance = 1.7;
    const lines: [number, number][] = [];
    for (let i = 0; i < pos.length; i++) {
      let linkCount = 0;
      for (let j = i + 1; j < pos.length && linkCount < 3; j++) {
        if (pos[i].distanceTo(pos[j]) < maxDistance) {
          lines.push([i, j]);
          linkCount++;
        }
      }
    }

    const speeds = pos.map(() => 0.15 + rng() * 0.25);
    const phases = pos.map(() => rng() * Math.PI * 2);

    return { positions: pos, connections: lines, speeds, phases };
  }, [nodeCount]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(connections.length * 6);
    connections.forEach(([a, b], index) => {
      const pa = positions[a];
      const pb = positions[b];
      linePositions.set([pa.x, pa.y, pa.z, pb.x, pb.y, pb.z], index * 6);
    });
    geometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return geometry;
  }, [connections, positions]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const basePositions = useMemo(() => positions.map((p) => p.clone()), [positions]);
  const baseRotationY = useRef(0);
  const smoothedTiltX = useRef(0);
  const smoothedTiltY = useRef(0);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const mesh = instancedRef.current;
    if (!group || !mesh) return;

    const t = state.clock.elapsedTime;

    // Continuous drift plus a subtle, smoothed parallax tilt toward the pointer.
    baseRotationY.current += delta * 0.05;
    smoothedTiltX.current = THREE.MathUtils.lerp(
      smoothedTiltX.current,
      pointer.current.y * 0.15,
      0.03
    );
    smoothedTiltY.current = THREE.MathUtils.lerp(
      smoothedTiltY.current,
      pointer.current.x * 0.2,
      0.03
    );
    group.rotation.x = smoothedTiltX.current;
    group.rotation.y = baseRotationY.current + smoothedTiltY.current;

    for (let i = 0; i < basePositions.length; i++) {
      const base = basePositions[i];
      const drift = Math.sin(t * speeds[i] + phases[i]) * 0.12;
      dummy.position.set(base.x, base.y + drift, base.z);
      const scale = 0.85 + Math.sin(t * speeds[i] + phases[i]) * 0.25;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const scale = Math.min(viewport.width / 8, 1.15);

  return (
    <group ref={groupRef} scale={scale} position={[1.6, 0, -1.5]}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color={theme.colors.accentSecondary}
          transparent
          opacity={0.12}
        />
      </lineSegments>
      <instancedMesh ref={instancedRef} args={[undefined, undefined, positions.length]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color={theme.colors.accent} transparent opacity={0.65} />
      </instancedMesh>
    </group>
  );
}
