/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['ipfs.moralis.io', 'gateway.ipfs.io'],
  },
  env: {
    MORALIS_API_KEY: process.env.MORALIS_API_KEY,
    MORALIS_SERVER_URL: process.env.MORALIS_SERVER_URL,
    MORALIS_APP_ID: process.env.MORALIS_APP_ID,
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
}

module.exports = nextConfig
