"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { allCategories, threadPrefixes } from "../../lib/forum-data";
import { ChevronDownIcon } from "../icons";
import { Button, Card } from "../ui";

interface FormErrors {
  category?: string;
  title?: string;
  content?: string;
}

export function NewThreadForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const presetCategory = searchParams?.get("category") ?? "";

  const [category, setCategory] = useState(presetCategory);
  const [prefix, setPrefix] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const postableCategories = allCategories.filter((c) => !c.staffOnly);

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!category) next.category = "Choose a category.";
    if (title.trim().length < 6) next.title = "Title needs to be at least 6 characters.";
    if (content.trim().length < 20) next.content = "Content needs to be at least 20 characters.";
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // No backend yet — in a connected build this would POST to /threads and
    // redirect to the created thread's real slug.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="flex flex-col items-center gap-4 p-10 text-center">
        <h2 className="text-lg font-medium text-fg">Thread queued</h2>
        <p className="max-w-sm text-sm text-muted">
          This forum isn&apos;t connected to a backend yet, so your thread wasn&apos;t actually
          published — but the form, validation, and category are working end to end.
        </p>
        <Button
          onClick={() => router.push(category ? `/forums/${category}` : "/forums")}
        >
          Back to category
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Card className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="mb-1.5 block text-xs font-medium text-muted">
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-xl border border-line bg-bg/60 px-4 py-2.5 pr-9 text-sm text-fg focus:border-accent/60 focus:outline-none"
              >
                <option value="">Select a category…</option>
                {postableCategories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                width={15}
                height={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
            {errors.category ? (
              <p className="mt-1.5 text-xs text-[#e08f7f]">{errors.category}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="prefix" className="mb-1.5 block text-xs font-medium text-muted">
              Prefix / tag <span className="text-muted/60">(optional)</span>
            </label>
            <div className="relative">
              <select
                id="prefix"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full appearance-none rounded-xl border border-line bg-bg/60 px-4 py-2.5 pr-9 text-sm text-fg focus:border-accent/60 focus:outline-none"
              >
                <option value="">No prefix</option>
                {threadPrefixes.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <ChevronDownIcon
                width={15}
                height={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="title" className="mb-1.5 block text-xs font-medium text-muted">
            Thread title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your thread a clear, specific title"
            className="w-full rounded-xl border border-line bg-bg/60 px-4 py-2.5 text-sm text-fg placeholder:text-muted focus:border-accent/60 focus:outline-none"
          />
          {errors.title ? <p className="mt-1.5 text-xs text-[#e08f7f]">{errors.title}</p> : null}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="content" className="block text-xs font-medium text-muted">
              Content
            </label>
            <button
              type="button"
              onClick={() => setPreview((p) => !p)}
              className="font-mono text-xs text-accent transition-opacity hover:opacity-70"
            >
              {preview ? "Edit" : "Preview"}
            </button>
          </div>

          {preview ? (
            <div className="min-h-[10rem] rounded-xl border border-line bg-bg/60 px-4 py-3 text-sm leading-7 text-fg/90">
              {content.trim() ? (
                content
                  .split("\n")
                  .filter(Boolean)
                  .map((line, i) => <p key={i}>{line}</p>)
              ) : (
                <p className="text-muted">Nothing to preview yet.</p>
              )}
            </div>
          ) : (
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={9}
              placeholder="Write your post…"
              className="w-full resize-y rounded-xl border border-line bg-bg/60 px-4 py-3 text-sm leading-6 text-fg placeholder:text-muted focus:border-accent/60 focus:outline-none"
            />
          )}
          {errors.content ? (
            <p className="mt-1.5 text-xs text-[#e08f7f]">{errors.content}</p>
          ) : null}
        </div>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit">Post Thread</Button>
      </div>
    </form>
  );
}
