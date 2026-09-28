import type { NextConfig } from "next";

const basePath =
  process.env.GITHUB_ACTIONS === "true"
    ? `/${process.env.GITHUB_REPOSITORY?.split("/")[1]}`
    : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
