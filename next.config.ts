import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"], deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920] },
  reactStrictMode: true,
};

export default nextConfig;
