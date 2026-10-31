"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./ui";

const fieldClasses =
  "w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-sm text-fg placeholder:text-muted/70 transition-colors focus-visible:border-accent focus-visible:outline-none";

/**
 * Simple contact form. It opens the visitor's email app with the message
 * filled in, so it works on a static site without any backend.
 */
export function ContactForm({ to }: { to: string }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Please add your name and a message.");
      return;
    }
    setError("");
    const subject = `Message from ${name.trim()}`;
    const body = `${message.trim()}\n\n— ${name.trim()}${from.trim() ? ` (${from.trim()})` : ""}`;
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-xs text-muted">
          Your name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className={fieldClasses}
            placeholder="Jane Doe"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs text-muted">
          Your email (optional)
          <input
            type="email"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            autoComplete="email"
            className={fieldClasses}
            placeholder="jane@example.com"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-xs text-muted">
        Message
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className={`${fieldClasses} resize-y`}
          placeholder="Tell me a little about your project or question…"
        />
      </label>
      {error ? (
        <p role="alert" className="text-sm text-accent">
          {error}
        </p>
      ) : null}
      <div>
        <Button type="submit">Send message</Button>
      </div>
    </form>
  );
}
