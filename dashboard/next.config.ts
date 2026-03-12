import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/italian-youth-labor-market" : "",
  images: { unoptimized: true },
};

export default nextConfig;
