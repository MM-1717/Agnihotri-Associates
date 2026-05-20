import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zqonbmltsmbiaklkpwpl.supabase.co",
      },
    ],
  },
};

export default nextConfig;