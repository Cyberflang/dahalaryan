# Aryan Dahal

Website: <https://dahalaryan.com.np>

This repository holds the website I publish at my domain. It is a small Next.js project and is deployed as a static site on GitHub Pages.

## Run it locally

Use Node.js 22.18 or newer.

```sh
npm ci
npm run dev
```

Then open <http://localhost:3000>.

## Before publishing

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

The build is written to `out/`. GitHub Actions publishes that directory when changes are pushed to `main`. The workflow can also be started manually from the Actions tab.

## Where things live

- `app/page.tsx` — page content
- `app/layout.tsx` — document metadata and shared layout
- `app/globals.css` — layout, colours and responsive styles
- `app/components/site-preferences.tsx` — display preferences
- `public/` — images, icons and domain configuration

The site does not have accounts, a database, or a visitor-message service. Display preferences are kept in the visitor's browser. Keep credentials and local environment files out of this repository.
