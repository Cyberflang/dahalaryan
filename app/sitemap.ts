import type { MetadataRoute } from "next";
import { allCategories, threads, users } from "./lib/forum-data";
import { siteUrl } from "./lib/site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/forums",
    "/forums/new",
    "/forums/new-posts",
  ].map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = allCategories.map((category) => ({
    url: `${siteUrl}/forums/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const threadRoutes: MetadataRoute.Sitemap = threads.map((thread) => ({
    url: `${siteUrl}/forums/${thread.categorySlug}/${thread.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const profileRoutes: MetadataRoute.Sitemap = users.map((user) => ({
    url: `${siteUrl}/forums/u/${user.username}`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...categoryRoutes, ...threadRoutes, ...profileRoutes];
}
