# Aryan Dahal — personal website

Built with Next.js (static export) and Tailwind CSS. Deployed to GitHub Pages
by `.github/workflows/deploy.yml` on every push to `main`.

## Edit your content

Almost everything lives in **`app/lib/site-data.ts`**:

- `person.email` — **set your real email here.** The email button and the
  contact form appear automatically once it is filled in.
- `communities` — Discord links shown in the hero, contact section and footer.
- `hero`, `about`, `facts`, `projects`, `skillGroups` — the text on the home page.

Forum posts live in `app/lib/forum-data.ts` (add an entry to `threads`).

## Visitor customization

The "Customize" button (bottom-left) lets visitors change theme, accent colour,
font, text size, corners, spacing, page width, background and animations.
Choices are stored in the visitor's browser. Code: `app/components/preferences.tsx`.

## Icons and photos

- Website icon: `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`
  (plus `public/icon-32.png`, `public/icon-192.png`, `public/apple-touch-icon.png`)
- Hero photo: `public/images/aryan-portrait.jpg`

## Run locally

```bash
npm install
npm run dev
```
