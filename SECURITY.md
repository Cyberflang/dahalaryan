# Security

This repository contains the source for a static personal website.

## Reporting a concern

Please report suspected vulnerabilities privately through GitHub's **Report a vulnerability** feature for this repository. Do not publish exploit details in an issue.

## Security practices

- No visitor accounts, database, contact-message storage, or public API are part of the current site.
- The site does not load third-party analytics, advertising scripts, embedded widgets, or external fonts.
- No secrets or credentials belong in source control.
- Dependencies are installed from the committed lockfile.
- GitHub Actions receives only the permissions required to publish the Pages artifact.
- Changes should pass linting, type checking, tests, and a production build before deployment.

GitHub Pages does not provide a way to set arbitrary HTTP response headers from the repository. The domain is managed through Cloudflare, so configure response headers at the edge before relying on headers such as Content-Security-Policy, X-Content-Type-Options, and Permissions-Policy. Do not add a pretend backend to a static site.

If a backend is introduced later, it must be reviewed separately for authentication, authorization, input validation, abuse controls, secret handling, and logging before it is exposed publicly.

## Cloudflare response headers

The repository cannot set HTTP response headers on GitHub Pages. Add a Cloudflare response-header transform rule for `dahalaryan.com.np/*` with these values:

| Header | Value |
| --- | --- |
| `Content-Security-Policy` | `default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; frame-ancestors 'none'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; upgrade-insecure-requests` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

Only add `Strict-Transport-Security` after confirming every subdomain is served over HTTPS. The policy above permits the inline scripts Next.js emits for its static application, while restricting other resource origins.
