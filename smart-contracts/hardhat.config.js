require("dotenv").config()
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

// Deployed on polygon mumbai to 0x7f6e32ac1106717fa64e05959d261d7d07b43980

module.exports = {
  solidity: "0.8.12",
  defaultNetwork: "polygonMumbai",
  networks: {
    polygonMumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.ACCOUNT]
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGONSCAN_API_KEY
    }
  }
};
