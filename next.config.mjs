/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The dev-tools button sits bottom-left, right on top of the mascot's badge;
  // hide it so localhost looks like production.
  devIndicators: false,
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
