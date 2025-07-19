import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      'upload.wikimedia.org',
    ],
  },
  basePath: '',
  assetPrefix: '',
};

export default nextConfig;
