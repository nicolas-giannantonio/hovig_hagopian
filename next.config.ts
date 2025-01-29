import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        hostname: "freight.cargo.site",
      },
    ],
  },
};

export default nextConfig;
