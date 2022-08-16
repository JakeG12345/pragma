/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['ipfs.moralis.io', 'gateway.ipfs.io', 's2.coinmarketcap.com'],
  },
  env: {
    MORALIS_API_KEY: process.env.MORALIS_API_KEY,
    MORALIS_SERVER_URL: process.env.MORALIS_SERVER_URL,
    MORALIS_APP_ID: process.env.MORALIS_APP_ID,
    CMC_API_KEY: process.env.CMC_API_KEY,
  },
}

module.exports = nextConfig
