import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { categories } from "@/content/categories";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    "",
    "/shop",
    "/story",
    "/contact",
    ...categories.map((c) => `/collections/${c.slug}`),
    ...products.map((p) => `/products/${p.slug}`),
  ].map((path) => ({ url: site.url + path, lastModified: now }));
}
