require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/RBC4SxiuQkH-hB2Xqc8qODJxOOM_Hnf5",
      accounts: [`0xb88dbecc174968e14c3fb5cccb16a9afba0eb7b2c134c3529deb4dd5b9eae287`]
    }
  },
}
