import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
