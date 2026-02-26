import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://clementeferrer.github.io/", priority: 1.0 },
    { url: "https://clementeferrer.github.io/profile/", priority: 0.8 },
    { url: "https://clementeferrer.github.io/publications/", priority: 0.8 },
    { url: "https://clementeferrer.github.io/conferences/", priority: 0.8 },
    { url: "https://clementeferrer.github.io/teaching/", priority: 0.8 },
  ];
}
