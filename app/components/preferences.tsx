"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { CheckIcon, CloseIcon, MoonIcon, SlidersIcon, SunIcon } from "./icons";

// ---------------------------------------------------------------------------
// Visitor preferences. Everything here is saved in the visitor's own browser
// (localStorage) and applied to <html> as data-attributes + CSS variables.
// ---------------------------------------------------------------------------

export type Prefs = {
  theme: "dark" | "light" | "system";
  accent: string;
  font: "sans" | "serif" | "mono";
  size: "sm" | "md" | "lg";
  radius: "sharp" | "soft" | "round";
  density: "compact" | "comfortable" | "spacious";
  width: "narrow" | "normal" | "wide";
  bg: "dots" | "grid" | "glow" | "none";
  motion: "on" | "off";
};

export const defaultPrefs: Prefs = {
  theme: "dark",
  accent: "#e0a94a",
  font: "sans",
  size: "md",
  radius: "soft",
  density: "comfortable",
  width: "normal",
  bg: "dots",
  motion: "on",
};

const STORAGE_KEY = "prefs-v1";

declare global {
  interface Window {
    __applyPrefs?: (prefs: Prefs) => void;
  }
}

/**
 * Runs in <head> before first paint so the page never flashes the wrong
 * look. It also defines window.__applyPrefs, which the panel below reuses so
 * there is only one implementation of "how preferences become styles".
 */
export const prefsInitScript = `
(function () {
  var KEY = '${STORAGE_KEY}';
  var D = ${JSON.stringify(defaultPrefs)};
  function rgb(h) {
    return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  }
  function lum(c) {
    var a = c.map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  window.__applyPrefs = function (p) {
    var r = document.documentElement;
    var t = p.theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
      : p.theme;
    r.setAttribute('data-theme', t);
    r.setAttribute('data-font', p.font);
    r.setAttribute('data-size', p.size);
    r.setAttribute('data-radius', p.radius);
    r.setAttribute('data-density', p.density);
    r.setAttribute('data-width', p.width);
    r.setAttribute('data-bg', p.bg);
    r.setAttribute('data-motion', p.motion);
    var c = /^#[0-9a-f]{6}$/i.test(p.accent) ? rgb(p.accent) : rgb(D.accent);
    if (t === 'light') c = c.map(function (v) { return Math.round(v * 0.62); });
    r.style.setProperty('--accent', 'rgb(' + c.join(',') + ')');
    r.style.setProperty('--on-accent', lum(c) > 0.3 ? '#0b0c0e' : '#ffffff');
  };
  var p = {};
  for (var k in D) p[k] = D[k];
  try {
    var s = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (s) for (var k2 in D) if (s[k2]) p[k2] = s[k2];
  } catch (e) {}
  window.__applyPrefs(p);
})();
`;

// --- tiny external store -----------------------------------------------------

let cache: Prefs = defaultPrefs;
let loaded = false;
const listeners = new Set<() => void>();

function read(): Prefs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultPrefs, ...JSON.parse(raw) };
  } catch {
    // storage unavailable or corrupt — fall back to defaults
  }
  return defaultPrefs;
}

function getSnapshot(): Prefs {
  if (!loaded && typeof window !== "undefined") {
    cache = read();
    loaded = true;
  }
  return cache;
}

function getServerSnapshot(): Prefs {
  return defaultPrefs;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function notify() {
  listeners.forEach((l) => l());
}

function save(next: Prefs) {
  cache = next;
  loaded = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // still applies for this visit
  }
  window.__applyPrefs?.(next);
  notify();
}

export function usePrefs() {
  const prefs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    prefs,
    set: (patch: Partial<Prefs>) => save({ ...getSnapshot(), ...patch }),
    reset: () => save(defaultPrefs),
  };
}

function getResolvedTheme(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

// ---------------------------------------------------------------------------
// Quick light/dark toggle (used in the nav)
// ---------------------------------------------------------------------------

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { set } = usePrefs();
  const resolved = useSyncExternalStore(subscribe, getResolvedTheme, () => "dark" as const);
  const isDark = resolved === "dark";

  return (
    <button
      type="button"
      onClick={() => set({ theme: isDark ? "light" : "dark" })}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${className}`}
    >
      {isDark ? <SunIcon width={16} height={16} /> : <MoonIcon width={16} height={16} />}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Customize panel
// ---------------------------------------------------------------------------

const accents = [
  { name: "Amber", value: "#e0a94a" },
  { name: "Orange", value: "#f0824b" },
  { name: "Rose", value: "#f06a8d" },
  { name: "Violet", value: "#a07cf5" },
  { name: "Blue", value: "#5b9cf5" },
  { name: "Cyan", value: "#3cc7d6" },
  { name: "Green", value: "#4cc38a" },
  { name: "Lime", value: "#a3d84a" },
];

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-4">
      <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">{label}</p>
      {children}
    </div>
  );
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <Group label={label}>
      <div role="radiogroup" aria-label={label} className="flex gap-1.5">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              className={`flex-1 rounded-lg border px-2 py-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                active
                  ? "border-accent bg-accent/10 text-fg"
                  : "border-line text-muted hover:border-accent/50 hover:text-fg"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </Group>
  );
}

export function CustomizeButton() {
  const { prefs, set, reset } = usePrefs();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep "System" theme in sync with the device setting while the page is open.
  useEffect(() => {
    if (prefs.theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      window.__applyPrefs?.(getSnapshot());
      notify();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [prefs.theme]);

  const isCustomAccent = !accents.some((a) => a.value.toLowerCase() === prefs.accent.toLowerCase());

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed bottom-6 left-5 z-40 inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface/90 px-4 text-sm text-fg shadow-lg backdrop-blur-md transition-colors hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 sm:bottom-8 sm:left-8"
      >
        <SlidersIcon width={16} height={16} />
        Customize
      </button>

      {open ? (
        <button
          type="button"
          aria-label="Close customize panel"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 cursor-default bg-black/40"
        />
      ) : null}

      <aside
        role="dialog"
        aria-label="Customize this website"
        inert={!open}
        className={`fixed inset-y-0 right-0 z-[60] flex w-[min(92vw,22rem)] flex-col border-l border-line bg-bg shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-4 px-5 pb-4 pt-5">
          <div>
            <h2 className="text-base font-medium text-fg">Customize this site</h2>
            <p className="mt-1 text-xs leading-5 text-muted">
              Make it yours. Your choices are saved on this device.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-fg"
          >
            <CloseIcon width={16} height={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-6">
          <Segmented
            label="Theme"
            value={prefs.theme}
            onChange={(theme) => set({ theme })}
            options={[
              { value: "dark", label: "Dark" },
              { value: "light", label: "Light" },
              { value: "system", label: "System" },
            ]}
          />

          <Group label="Accent colour">
            <div className="flex flex-wrap items-center gap-2">
              {accents.map((a) => {
                const active = a.value.toLowerCase() === prefs.accent.toLowerCase();
                return (
                  <button
                    key={a.value}
                    type="button"
                    aria-label={a.name}
                    aria-pressed={active}
                    onClick={() => set({ accent: a.value })}
                    style={{ backgroundColor: a.value }}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full border-2 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                      active ? "border-fg" : "border-transparent"
                    }`}
                  >
                    {active ? <CheckIcon width={14} height={14} className="text-[#0b0c0e]" /> : null}
                  </button>
                );
              })}
              <label
                className={`relative inline-flex h-8 cursor-pointer items-center gap-2 rounded-full border px-3 text-xs transition-colors ${
                  isCustomAccent ? "border-accent text-fg" : "border-line text-muted hover:text-fg"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rounded-full border border-line"
                  style={{ backgroundColor: prefs.accent }}
                />
                Custom
                <input
                  type="color"
                  value={prefs.accent}
                  onChange={(e) => set({ accent: e.target.value })}
                  aria-label="Pick a custom accent colour"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </label>
            </div>
          </Group>

          <Segmented
            label="Font"
            value={prefs.font}
            onChange={(font) => set({ font })}
            options={[
              { value: "sans", label: "Modern" },
              { value: "serif", label: "Classic" },
              { value: "mono", label: "Code" },
            ]}
          />

          <Segmented
            label="Text size"
            value={prefs.size}
            onChange={(size) => set({ size })}
            options={[
              { value: "sm", label: "Small" },
              { value: "md", label: "Default" },
              { value: "lg", label: "Large" },
            ]}
          />

          <Segmented
            label="Corners"
            value={prefs.radius}
            onChange={(radius) => set({ radius })}
            options={[
              { value: "sharp", label: "Sharp" },
              { value: "soft", label: "Soft" },
              { value: "round", label: "Round" },
            ]}
          />

          <Segmented
            label="Spacing"
            value={prefs.density}
            onChange={(density) => set({ density })}
            options={[
              { value: "compact", label: "Compact" },
              { value: "comfortable", label: "Default" },
              { value: "spacious", label: "Roomy" },
            ]}
          />

          <Segmented
            label="Page width"
            value={prefs.width}
            onChange={(width) => set({ width })}
            options={[
              { value: "narrow", label: "Narrow" },
              { value: "normal", label: "Default" },
              { value: "wide", label: "Wide" },
            ]}
          />

          <Segmented
            label="Background"
            value={prefs.bg}
            onChange={(bg) => set({ bg })}
            options={[
              { value: "dots", label: "Dots" },
              { value: "grid", label: "Grid" },
              { value: "glow", label: "Glow" },
              { value: "none", label: "None" },
            ]}
          />

          <Segmented
            label="Animations"
            value={prefs.motion}
            onChange={(motion) => set({ motion })}
            options={[
              { value: "on", label: "On" },
              { value: "off", label: "Off" },
            ]}
          />
        </div>

        <div className="border-t border-line px-5 py-4">
          <button
            type="button"
            onClick={reset}
            className="w-full rounded-full border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-accent/60 hover:text-fg"
          >
            Reset to defaults
          </button>
        </div>
      </aside>
    </>
  );
}
