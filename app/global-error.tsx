"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: "3rem", background: "#f5f4f0", color: "#20201d", fontFamily: "Arial, sans-serif" }}>
        <main>
          <h1>Something went wrong.</h1>
          <p>This page could not load. Please try again.</p>
          <button type="button" onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  );
}
