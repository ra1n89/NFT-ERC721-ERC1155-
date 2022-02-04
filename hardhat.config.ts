import * as dotenv from "dotenv";

import { HardhatUserConfig, task, } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers"
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { ethers } from "ethers";
//import { ethers } from "hardhat";
//import hre from "hardhat";
import { watchFile } from "fs";
//import { CatNFT2 } from "./typechain/CatNFT2";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
//0xf4dD841e4D76Dfc6df8526BA4cB6bEDa0917D9c7


//npx hardhat balance --contractaddress <contract address> --address <address of someone we want to know balance>
//npx hardhat balance --contractaddress 0xf4dD841e4D76Dfc6df8526BA4cB6bEDa0917D9c7  --address 0x186B0A571252f523316379729369900d638cc22b --network rinkeby
task("balance", "mint tokens MTN")
  .addParam("contractaddress", "address of deployed contract")
  .addParam("address", "address of contract to mint")
  .setAction(async (taskArgs, hre) => {
    const myToken = await hre.ethers.getContractAt("MyToken", taskArgs.contractaddress)
    const balance = await myToken.balanceOf(taskArgs.address)
    console.log("balance of " + taskArgs.address + " now is " + (await myToken.balanceOf(taskArgs.address)).toString());
  })

// task("mint", "mint tokens MTN")
//   .addParam("contractaddress", "address of deployed contract")
//   .addParam("addressmint", "address of contract to mint")
//   .addParam("amount", "amount money to transfer")
//   .setAction(async (taskArgs, hre) => {
//     const myToken = await hre.ethers.getContractAt("MyToken", taskArgs.contractaddress)
//     const tx = await myToken.mint(taskArgs.addressmint, taskArgs.amount)
//     console.log("balance of " + taskArgs.addressmint + " now is " + (await myToken.balanceOf(taskArgs.addressmint)).toString());
//     console.log("totalSupply now is " + await (myToken.totalSupply()));
//   })


//npx hardhat transfer --address <address> --amount <amount of tokens>
//npx hardhat transfer--contractaddress 0xf4dD841e4D76Dfc6df8526BA4cB6bEDa0917D9c7 --address 0xFC5210de76F2083900906BE4E41C3F45c7Cb8AD1 --amount 1000000 --network rinkeby
task("transfer", "transfer tokens MTN")
  .addParam("contractaddress", "address of deployed contract")
  .addParam("address", "address where we want to send tokens")
  .addParam("amount", "amount money to transfer")
  .setAction(async (taskArgs, hre) => {
    const myToken = await hre.ethers.getContractAt("MyToken", taskArgs.contractaddress)
    await myToken.transfer(taskArgs.address, taskArgs.amount)
    console.log("balance of " + taskArgs.address + " now is " + (await myToken.balanceOf(taskArgs.address)).toString());
  })

//npx hardhat approve --address <address> --amount <amount of tokens>
//npx hardhat approve --contractaddress 0xf4dD841e4D76Dfc6df8526BA4cB6bEDa0917D9c7 --address 0xFC5210de76F2083900906BE4E41C3F45c7Cb8AD1 --amount 1000000 --network rinkeby
//npx hardhat approve --contractaddress 0xb5ef5dee809f66d9aae7cf9a61d4cea5496407b7  --address 0x709547aE2aCE54718f87a9b1d974CaEEE97Ef8A1 --amount 1 --network rinkeby для ЛП токена
task("approve", "approves tokens transfer for another person")
  .addParam("contractaddress", "address of deployed contract")
  .addParam("address", "address which we want to approve")
  .addParam("amount", "amount money to transfer")
  .setAction(async (taskArgs, hre) => {
    const [owner] = await hre.ethers.getSigners();
    const myToken = await hre.ethers.getContractAt("MyToken", taskArgs.contractaddress)
    await myToken.approve(taskArgs.address, taskArgs.amount)
    console.log("allowance for " + taskArgs.address + " now is " + (await myToken.allowance(owner.address, taskArgs.address)).toString());
  })

//npx hardhat transferFrom --contractaddress 0xf4dD841e4D76Dfc6df8526BA4cB6bEDa0917D9c7 --address 0xFC5210de76F2083900906BE4E41C3F45c7Cb8AD1 --amount <approving of amount of money> 
task("transferFrom", "transfer tokens from  person who gave allowance")
  .addParam("contractaddress", "address of deployed contract")
  .addParam("address", "address which we want to transfer")
  .addParam("amount", "amount money to transfer")
  .setAction(async (taskArgs, hre) => {
    const [owner] = await hre.ethers.getSigners();
    const myToken = await hre.ethers.getContractAt("MyToken", taskArgs.contractaddress)
    console.log("allowance for " + taskArgs.address + " now is " + (await myToken.allowance(owner.address, taskArgs.address)).toString());
    await myToken.transferFrom(owner.address, taskArgs.address, taskArgs.amount)
    console.log("balance of " + owner.address + " now is " + (await myToken.balanceOf(owner.address)).toString());
    console.log("balance of " + taskArgs.address + " now is " + (await myToken.balanceOf(taskArgs.address)).toString());
  })

task("stake", "staking tokens")
  .addParam("contractaddress", "address of deployed contract")
  .addParam("amount", "amount money to transfer")
  .setAction(async (taskArgs, hre) => {
    const [owner] = await hre.ethers.getSigners();
    const staking = await hre.ethers.getContractAt("Staking", taskArgs.contractaddress)
    //console.log("allowance for " + taskArgs.address + " now is " + (await staking.stake(owner.address, taskArgs.address)).toString());
    await staking.stake(taskArgs.amount);
  })

task("claim", "Claiming rewards")
  .addParam("contractaddress", "address of deployed contract")
  .setAction(async (taskArgs, hre) => {
    const staking = await hre.ethers.getContractAt("Staking", taskArgs.contractaddress)
    await staking.claim();
  })

task("unstake", "unstake tokens")
  .addParam("contractaddress", "address of deployed contract")
  .setAction(async (taskArgs, hre) => {
    const staking = await hre.ethers.getContractAt("Staking", taskArgs.contractaddress)
    await staking.unstake();
  })

//npx hardhat mint--address 0xe90b0487b3B95A5Cb3d084Dbf02Bf0C4508ddbbe --uri https://ipfs.io/ipfs/QmQ6UkucExz1zceF9XmCan9P9mGYgmgoqvvbDMHEdpv73n --network rinkeby
//npx hardhat mint--address <contract address> --uri <uri with reference to JSON file>
task("mint", "Mint CAT2 NFT with unique ID")
  .addParam("address", "address of deployed contract")
  .addParam("uri", "URI contract")
  .setAction(async (taskArgs, hre) => {
    const catNFT2 = await hre.ethers.getContractAt("CatNFT2", taskArgs.address);
    await catNFT2.mint(taskArgs.uri);
  })

//npx hardhat mint1155--address 0x8523de301d68310788165560e14093eb08040cd0 --amount 25 --network rinkeby
//npx hardhat mint--address <contract address> --amount <minting some amount of nft copies>
task("mint1155", "Mint CAT1155 NFT with unique ID")
  .addParam("address", "address of deployed contract")
  .addParam("amount", "minting some amount of nft copies")
  .setAction(async (taskArgs, hre) => {
    const catNFT1155 = await hre.ethers.getContractAt("CatNFT1155", taskArgs.address);
    await catNFT1155.mint(taskArgs.amount);
  })

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",

  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    // },
    // gasReporter: {
    //   enabled: process.env.REPORT_GAS !== undefined,
    //   currency: "USD",
    // },
    //   etherscan: {
    //     apiKey: process.env.ETHERSCAN_API_KEY,
    // },
  },
};

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  }
};

export default config;

// const [Ashly, Bob] = await hre.ethers.getSigners();

// task("transfer", "transfer tokens MTN")
//   .addParam("address", "The contract address on Rinkeby")
//   .addParam("amount", "amount money to transfer")
//   .setAction(async (taskArgs) => {
//     const contract = require("C:/Projects/HardHat TS/artifacts/contracts/MyToken.sol/MyToken.json")
//     const provider = new ethers.providers.AlchemyProvider("rinkeby", process.env.ALCHEMY_API_KEY);
//     const signer = new ethers.Wallet(`0x${process.env.PRIVATE_KEY}`, provider);
//     const myTokenContract = new ethers.Contract(
//       taskArgs.address,
//       contract.abi,
//       signer
//     );
//     await myTokenContract.transfer()

//   })


