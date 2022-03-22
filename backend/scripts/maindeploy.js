// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const { json } = require("hardhat/internal/core/params/argumentTypes");

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

async function main() {
  // This is just a convenience check
  // if (network.name === "hardhat") {
  //   console.warn(
  //     "You are trying to deploy a contract to the Hardhat Network, which" +
  //       "gets automatically created and destroyed every time. Use the Hardhat" +
  //       " option '--network localhost'"
  //   );
  // }

  // ethers is avaialble in the global scope
  const [deployer,per1,per2] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // zpad deploy // use zpad address
  // ZPad = await ethers.getContractFactory("ZPad");
  // zpad = await ZPad.deploy();
  // await zpad.deployed();



  NFTsale = await ethers.getContractFactory("NFTsale")
  nFTsale =await NFTsale.deploy()
  await nFTsale.deployed()  
  // use zpad address

  
  console.log("nFTsale deployed to:", nFTsale.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(nFTsale);
}
//,nftPreSale,nftPubSale,nft

function saveFrontendFiles(nFTsale) {
  const fs = require("fs");
  const contractsDir = "../frontend/src/contract";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

let config = `
 "
 export const nFTsale_addr = "${nFTsale.address}"
`

  let data = JSON.stringify(config)
  fs.writeFileSync(
    contractsDir + '/addresses.js', JSON.parse(data)

  );

  //   config =`[
  //     "constructor()",
  //     "event Approval(address indexed,address indexed,uint256)",
  //     "event Transfer(address indexed,address indexed,uint256)",
  //     "function allowance(address,address) view returns (uint256)",
  //     "function approve(address,uint256) returns (bool)",
  //     "function balanceOf(address) view returns (uint256)",
  //     "function decimals() view returns (uint8)",
  //     "function decreaseAllowance(address,uint256) returns (bool)",
  //     "function increaseAllowance(address,uint256) returns (bool)",
  //     "function name() view returns (string)",
  //     "function symbol() view returns (string)",
  //     "function totalSupply() view returns (uint256)",
  //     "function transfer(address,uint256) returns (bool)",
  //     "function transferFrom(address,address,uint256) returns (bool)"
  //   ]`
  //  data = JSON.stringify(config)
  // fs.writeFileSync(
  //   contractsDir + '/BUSD.json', JSON.parse(data)

  // );

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// npx hardhat run scripts\deploy.js --network rinkeby