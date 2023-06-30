require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-gas-reporter");
require("hardhat-gas-reporter");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",

  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    mumbai: {
      url: process.env.MUMBAI_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    token: "ETH",
    gasPriceApi: "api.etherscan.io/api?module=proxy&action=eth_gasPrice",
    outputFile: "gas-report.txt",
    coinmarketcap: process.env.COINMARKETCAP,
    noColors: true,
  },
  mocha: {
    timeout: 50000,
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.POLYGON_API_KEY,
    },
  },
};
