"use client";
import { LenisRef, ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { useLoaded } from "@/lib/useLoader";

function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const loaded = useLoaded();

  useEffect(() => {
    lenisRef.current?.lenis?.stop();

    if (loaded) {
      lenisRef.current?.lenis?.start();
    }
  }, [loaded]);

  return (
    <ReactLenis root options={{ lerp: 0.3 }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
