"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useSyncExternalStore } from "react";
import { NetworkScene } from "@/components/three/NetworkScene";
import { useReducedMotion } from "@/lib/useReducedMotion";

const MOBILE_QUERY = "(max-width: 768px)";

function subscribeToMobileQuery(callback: () => void) {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function useIsMobile() {
  return useSyncExternalStore(
    subscribeToMobileQuery,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false
  );
}

/**
 * Hero centerpiece. Renders a live Three.js scene where supported, and a
 * static gradient fallback for reduced-motion users or if WebGL/Canvas
 * initialization fails — the hero never depends on the scene to look good.
 */
export function HeroScene() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [hasError, setHasError] = useState(false);

  if (prefersReducedMotion || hasError) {
    return <StaticFallback />;
  }

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            "webglcontextlost",
            () => setHasError(true),
            { once: true }
          );
        }}
        onError={() => setHasError(true)}
      >
        <Suspense fallback={null}>
          <NetworkScene nodeCount={isMobile ? 26 : 64} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function StaticFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-60"
      style={{
        background:
          "radial-gradient(45% 45% at 70% 30%, var(--glow-accent), transparent 60%), radial-gradient(35% 35% at 20% 70%, var(--glow-accent-secondary), transparent 60%)",
      }}
    />
  );
}
