"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="page-section">
      <div className="wrap page-section__grid">
        <p className="section-label">Error</p>
        <div className="section-body">
          <h1>This page could not load.</h1>
          <p>Please try again.</p>
          <button className="inline-link error-retry" type="button" onClick={() => reset()}>Try again</button>
        </div>
      </div>
    </section>
  );
}
