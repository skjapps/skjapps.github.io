import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/skjapps.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/skjapps.github.io/' : '',
};

export default nextConfig;
