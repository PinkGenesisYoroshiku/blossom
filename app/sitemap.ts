import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { templates } from "@/lib/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/templates`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...templates.map((template) => ({
      url: `${siteConfig.url}/templates/${template.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
