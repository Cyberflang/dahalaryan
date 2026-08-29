"use client";

import { useState, type FormEvent } from "react";
import { LockIcon } from "../icons";
import { Button, Card } from "../ui";

export function ReplyComposer({ locked = false }: { locked?: boolean }) {
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (content.trim().length < 2) {
      setError("Write a little more before posting.");
      return;
    }
    setError("");
    // No backend yet — this is where a POST /threads/:id/posts call would go.
    setSubmitted(true);
    setContent("");
  }

  if (locked) {
    return (
      <Card className="flex items-center gap-3 p-5 text-sm text-muted">
        <LockIcon width={16} height={16} className="shrink-0 text-muted" />
        This thread is locked. New replies aren&apos;t allowed.
      </Card>
    );
  }

  return (
    <Card className="p-5 sm:p-6">
      <h2 className="text-sm font-medium text-fg">Post a reply</h2>

      {submitted ? (
        <p className="mt-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-accent">
          Your reply was queued. Once the forum is connected to a backend, it&apos;ll post for real.
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError("");
          }}
          rows={5}
          placeholder="Share your thoughts…"
          aria-label="Reply content"
          aria-invalid={Boolean(error)}
          className="w-full resize-y rounded-xl border border-line bg-bg/60 px-4 py-3 text-sm leading-6 text-fg placeholder:text-muted focus:border-accent/60 focus:outline-none"
        />
        {error ? <p className="mt-2 text-xs text-[#e08f7f]">{error}</p> : null}

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-muted">Be respectful — see the forum rules.</p>
          <Button type="submit">Post Reply</Button>
        </div>
      </form>
    </Card>
  );
}
