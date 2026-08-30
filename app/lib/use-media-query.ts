"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook built on useSyncExternalStore.
 * Avoids the "set state synchronously inside useEffect" lint issue and
 * avoids hydration mismatches by returning `false` on the server snapshot.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => subscribe(query, onStoreChange),
    () => getSnapshot(query),
    () => false
  );
}

function subscribe(query: string, callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(query: string) {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
