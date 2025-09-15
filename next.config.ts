import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // 👇 Add this section to force Node.js runtime instead of Edge
  experimental: {
    runtime: "nodejs",
  },
};

export default nextConfig;
