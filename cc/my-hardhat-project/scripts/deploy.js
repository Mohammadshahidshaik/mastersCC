const hre = require("hardhat");

async function main() {
    const NFTandDefiMerged = await hre.ethers.getContractFactory("NFTandDefiMerged");

    // Replace these addresses with the actual deployed contract addresses
    const defiAddress = "0xC2F698FA9838bE3Bdcf7a1c451AFeE9637757071";  // Address of Defi.sol
    const tweetsAddress = "0x5C327A084211A4fA9e7Ab45Be28EccFaBe1CA4f9";  // Address of Tweets.sol

    const contract = await NFTandDefiMerged.deploy(defiAddress, tweetsAddress);
    await contract.deployed();
    console.log("NFTandDefiMerged Contract deployed to:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});