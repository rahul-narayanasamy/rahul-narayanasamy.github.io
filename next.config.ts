import type { NextConfig } from "next";

/**
 * Static export: `npm run build` writes a fully static site to /out,
 * ready for GitHub Pages (rahul-narayanasamy.github.io) or any CDN.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
