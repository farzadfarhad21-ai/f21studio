/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  async redirects() {
    return [{ source: "/work/pulseai", destination: "/work/training-matrix", permanent: true }];
  },
};

export default nextConfig;
