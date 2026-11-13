import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");
const exists = (path) => existsSync(join(root, path));

test("the custom domain is configured for the static host", () => {
  assert.equal(read("public/CNAME").trim(), "dahalaryan.com.np");
  assert.match(read("app/layout.tsx"), /https:\/\/dahalaryan\.com\.np/);
});

test("the homepage uses personal first-person copy without template labels", () => {
  const page = read("app/page.tsx");
  assert.match(page, /I’m Aryan Dahal/);
  assert.match(page, /Aryan Dahal/);
  assert.doesNotMatch(page, /Personal website|A little about me|Get in touch|Sample heading/i);
  for (const term of ["Discord bots", "Minecraft", "Node.js", "Cyflixel", "Creativity", "Skills", "Résumé"]) {
    assert.equal(page.toLowerCase().includes(term.toLowerCase()), false, `${term} should not appear on the homepage`);
  }
});

test("display preferences include system, light, dark and saved accent choices", () => {
  const component = read("app/components/site-preferences.tsx");
  const css = read("app/globals.css");
  for (const theme of ["system", "light", "dark"]) assert.ok(component.includes(`"${theme}"`));
  for (const accent of ["copper", "blue", "green", "violet"]) assert.ok(component.includes(`"${accent}"`));
  assert.match(component, /localStorage\.setItem/);
  assert.match(css, /prefers-color-scheme/);
});

test("unused backend, CMS and portfolio routes are removed", () => {
  for (const path of ["worker", "public/admin", "app/resume", "app/writing", "content", "app/components/customize.tsx"]) {
    assert.equal(exists(path), false, `${path} should have been removed`);
  }
});

test("static metadata routes are configured for export", () => {
  assert.match(read("app/robots.ts"), /dynamic = "force-static"/);
  assert.match(read("app/sitemap.ts"), /dynamic = "force-static"/);
  assert.match(read("next.config.ts"), /output: "export"/);
});

test("the Pages workflow checks before building and deploys with limited permissions", () => {
  const workflow = read(".github/workflows/deploy.yml");
  assert.match(workflow, /contents: read/);
  assert.match(workflow, /pages: write/);
  assert.match(workflow, /id-token: write/);
  assert.match(workflow, /cancel-in-progress: false/);
  assert.ok(workflow.indexOf("npm run check") < workflow.indexOf("npm run build"));
  assert.doesNotMatch(workflow, /DISCORD_WEBHOOK_URL|pull_request_target/);
});

test("source documentation and workflow contain no common credential patterns", () => {
  const patterns = [
    /\bgh[pousr]_[A-Za-z0-9]{36,}\b/,
    /\bgithub_pat_[A-Za-z0-9_]{20,}\b/,
    /discord(app)?\.com\/api\/webhooks\/\d+\/[\w-]{30,}/,
    /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
    /\bAKIA[0-9A-Z]{16}\b/,
  ];
  for (const file of ["app/page.tsx", "app/layout.tsx", "README.md", "SECURITY.md", ".github/workflows/deploy.yml"]) {
    for (const pattern of patterns) assert.doesNotMatch(read(file), pattern, `${file} contains a possible secret`);
  }
});
