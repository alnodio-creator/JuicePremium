/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  devIndicators: false,
  images: {
    domains: ["https://skblyqggxygsakugtopw.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skblyqggxygsakugtopw.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
