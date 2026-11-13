import Image from "next/image";

const links = [
  { label: "GitHub", detail: "Code and public repositories", href: "https://github.com/Cyberflang", external: true },
];

export default function Home() {
  return (
    <>
      <section className="masthead wrap" aria-labelledby="intro-title">
        <div className="masthead__main">
          <p className="eyebrow">Nepal</p>
          <h1 id="intro-title">Aryan Dahal</h1>
          <p className="masthead__intro">
            I’m Aryan Dahal, based in Nepal. This is where I keep my public details and links.
          </p>
          <div className="masthead__rule" />
          <p className="masthead__detail">
            I keep the page short and update it when there’s something I want to share.
          </p>
          <a className="inline-link" href="#about">More about me <span aria-hidden="true">↓</span></a>
        </div>
        <figure className="portrait">
          <Image
            src="/images/aryan-portrait.jpg"
            alt="Aryan Dahal"
            width={960}
            height={1200}
            priority
            sizes="(max-width: 760px) 84vw, 410px"
          />
          <figcaption>Aryan Dahal</figcaption>
        </figure>
      </section>

      <section className="page-section" id="about" aria-labelledby="about-title">
        <div className="wrap page-section__grid">
          <p className="section-label">01</p>
          <div className="section-body">
            <h2 id="about-title">About</h2>
            <p>
              I’m based in Nepal. I keep this site updated with the details I want to share publicly.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section" id="elsewhere" aria-labelledby="elsewhere-title">
        <div className="wrap page-section__grid">
          <p className="section-label">02</p>
          <div className="section-body">
            <h2 id="elsewhere-title">Elsewhere</h2>
            <ul className="link-list">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>
                    <span>{link.label}</span>
                    <small>{link.detail}</small>
                    <span className="link-list__arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
