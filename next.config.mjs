/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // TODO: add real remote image hosts here if you load project images from a CDN.
    remotePatterns: [],
  },
  // Keep builds green while you iterate on content. Set to false once your lint is clean.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
