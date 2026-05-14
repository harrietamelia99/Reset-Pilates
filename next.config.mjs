/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Some preview tools request `/index`: App Router serves `/` only */
  async redirects() {
    return [{ source: "/index", destination: "/", permanent: false }];
  },
};

export default nextConfig;
