import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://clementeferrer.github.io/", lastModified, priority: 1.0 },
    { url: "https://clementeferrer.github.io/profile/", lastModified, priority: 0.8 },
    { url: "https://clementeferrer.github.io/publications/", lastModified, priority: 0.8 },
    { url: "https://clementeferrer.github.io/conferences/", lastModified, priority: 0.8 },
    { url: "https://clementeferrer.github.io/teaching/", lastModified, priority: 0.8 },
  ];
}
