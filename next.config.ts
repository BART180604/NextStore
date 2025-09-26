import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images:{

    remotePatterns:[
      {
        protocol:"https", hostname:"cdn.sanity.io"
      }
    ]

  },
  webpack: (config) => {
    config.externals.push({
      'utf8': 'utf8',
      'node:buffer': 'buffer',
    });
    return config;
  },
};

export default nextConfig;
