import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   env: {
      NEXT_PUBLIC_FORMSPREE_URL: process.env.NEXT_PUBLIC_FORMSPREE_URL,
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'ucarecdn.com',
         },
      ],
   },
};

export default nextConfig;
