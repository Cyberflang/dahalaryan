"use client";

import { useSyncExternalStore } from "react";

type Listener = () => void;

function subscribe(query: string, callback: Listener): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia(query);

  const handleChange = () => {
    callback();
  };

  mediaQuery.addEventListener("change", handleChange);

  return () => {
    mediaQuery.removeEventListener("change", handleChange);
  };
}

function getSnapshot(query: string): boolean {
  return typeof window !== "undefined" && window.matchMedia(query).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * SSR-safe media query hook using useSyncExternalStore.
 *
 * Returns false during SSR and uses matchMedia in the browser,
 * preventing hydration mismatches.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => getSnapshot(query),
    getServerSnapshot
  );
}

/**
 * Returns true when the user prefers reduced motion.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}