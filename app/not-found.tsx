import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-section">
      <div className="wrap page-section__grid">
        <p className="section-label">404</p>
        <div className="section-body">
          <h1>That page isn’t here.</h1>
          <p>The address may be incorrect, or the page may have moved.</p>
          <Link className="inline-link" href="/">Return to the homepage <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
