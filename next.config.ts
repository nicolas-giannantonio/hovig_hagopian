import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/components/*": ["src/components/*"],
      "@/public/*": ["public/*"],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
