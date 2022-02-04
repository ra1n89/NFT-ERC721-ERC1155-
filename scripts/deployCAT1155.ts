import { ethers } from "hardhat";

async function main() {
    const [owner] = await ethers.getSigners();
    const CatNFT1155 = await ethers.getContractFactory("CatNFT1155");
    const catNft1155 = await CatNFT1155.deploy();
    await catNft1155.deployed();
    console.log("adress is " + catNft1155.address)
    console.log("deployed by " + owner.address)
    const tnx = await catNft1155.mint(50)
    await tnx.wait();

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;

});

