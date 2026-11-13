"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type Theme = "system" | "light" | "dark";
type Accent = "copper" | "blue" | "green" | "violet";

const preferenceEvent = "aryan-site-preferences-change";
const accents: { id: Accent; label: string; color: string }[] = [
  { id: "copper", label: "Copper", color: "#c47a52" },
  { id: "blue", label: "Blue", color: "#6c9ed6" },
  { id: "green", label: "Green", color: "#80a98b" },
  { id: "violet", label: "Violet", color: "#a18bd0" },
];

function subscribe(callback: () => void) {
  window.addEventListener(preferenceEvent, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(preferenceEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function getTheme(): Theme {
  try {
    const value = localStorage.getItem("aryan-site-theme");
    return value === "light" || value === "dark" ? value : "system";
  } catch {
    return "system";
  }
}

function getAccent(): Accent {
  try {
    const value = localStorage.getItem("aryan-site-accent");
    return accents.some((item) => item.id === value) ? (value as Accent) : "copper";
  } catch {
    return "copper";
  }
}

function savePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event(preferenceEvent));
  } catch {
    // The current page still works if browser storage is unavailable.
  }
}

export default function SitePreferences() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "system");
  const accent = useSyncExternalStore(subscribe, getAccent, () => "copper");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.accent = accent;
  }, [theme, accent]);

  // Keep the panel's open state local; it does not need to be persisted.
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div className="preferences">
      <button
        className="preferences__trigger"
        type="button"
        aria-expanded={panelOpen}
        aria-controls="site-preferences-panel"
        onClick={() => setPanelOpen((value) => !value)}
      >
        <span className="preferences__glyph" aria-hidden="true">◐</span>
        <span>Display</span>
      </button>
      {panelOpen && (
        <section className="preferences__panel" id="site-preferences-panel" aria-label="Display settings">
          <div className="preferences__heading">
            <div>
              <p className="preferences__eyebrow">Your view</p>
              <h2>Display settings</h2>
            </div>
            <button className="preferences__close" type="button" onClick={() => setPanelOpen(false)} aria-label="Close display settings">×</button>
          </div>
          <fieldset className="preferences__group">
            <legend>Appearance</legend>
            <div className="preferences__segmented">
              {(["system", "light", "dark"] as const).map((value) => (
                <button key={value} type="button" aria-pressed={theme === value} onClick={() => savePreference("aryan-site-theme", value)}>
                  {value === "system" ? "System" : value === "light" ? "Light" : "Dark"}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="preferences__group">
            <legend>Accent colour</legend>
            <div className="preferences__swatches">
              {accents.map((item) => (
                <button
                  key={item.id}
                  className="preferences__swatch"
                  type="button"
                  aria-label={`${item.label} accent`}
                  aria-pressed={accent === item.id}
                  onClick={() => savePreference("aryan-site-accent", item.id)}
                >
                  <span style={{ backgroundColor: item.color }} />
                </button>
              ))}
            </div>
          </fieldset>
          <p className="preferences__note">Your choices are saved in this browser.</p>
        </section>
      )}
    </div>
  );
}

