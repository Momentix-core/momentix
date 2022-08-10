/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-web3");
const { API_URL, POLYGON_API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY, POLYSCAN_API_KEY } = process.env;
module.exports = {
  solidity: {
    version: "0.8.2",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
   defaultNetwork: "mumbai",
   networks: {
      hardhat: {
        accounts: [{ privateKey: `0x${PRIVATE_KEY}`, balance: "10000000000000000000000"}],
        forking: {
          url: POLYGON_API_URL,
          blockNumber: 31471513  // assumes polygon fork
        },
        loggingEnabled: true,
        //gasMultiplier: 5,
        //gasPrice: 1000000000 * 7
      },
      mumbai: {
        url: `https://rpc.ankr.com/polygon_mumbai`,
        accounts: [`0x${PRIVATE_KEY}`],
        gasMultiplier: 3,
        gasPrice: 1000000000 * 2
     },
     polygon: {
        url: POLYGON_API_URL,
        accounts: [`0x${PRIVATE_KEY}`]
     }
   },
   etherscan: {
     apiKey: POLYSCAN_API_KEY
   }
}