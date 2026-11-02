import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/news/2026-09-15",
        destination: "/news/2026-10-15",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
