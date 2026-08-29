"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouchDevice, usePrefersReducedMotion } from "../lib/use-media-query";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();
  const enabled = !isTouch && !prefersReducedMotion;

  useEffect(() => {
    if (!enabled) return;

    let ringX = 0;
    let ringY = 0;
    let targetX = 0;
    let targetY = 0;
    let scale = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
      if (!active) setActive(true);
    };

    const onDown = () => {
      scale = 0.75;
    };
    const onUp = () => {
      scale = 1;
    };
    const onLeave = () => setActive(false);

    const animate = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled, active]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50 transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
