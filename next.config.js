/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['ipfs.moralis.io', 'gateway.ipfs.io'],
  },
}

module.exports = nextConfig
