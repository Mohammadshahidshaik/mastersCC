const hre = require("hardhat");
async function main() {
    const NFTMarketPlaceAurora = await hre.ethers.getContractFactory('NFTandDefiMerged');
    const contract = await NFTMarketPlaceAurora.deploy("0x6ccbcFcEA417F75d6f877aBE70E2dBA68131f458","0x6498b68C3016501AE77008D573d3Fc3a41EDdd34");
     await contract.deployed();
     console.log("Address of Contract : ",contract.address);  
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
