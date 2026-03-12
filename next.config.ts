import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_PAGES === "true" ? "/italian-youth-labor-market" : "",
  images: { unoptimized: true },
};

export default nextConfig;
