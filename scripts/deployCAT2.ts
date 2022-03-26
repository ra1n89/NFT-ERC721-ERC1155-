import { ethers } from "hardhat";

async function main() {
    const [owner] = await ethers.getSigners();
    const CatNFT2 = await ethers.getContractFactory("CatNFT2");
    const catNft2 = await CatNFT2.deploy();
    await catNft2.deployed();
    console.log("adress is " + catNft2.address)
    console.log("deployed by " + owner.address)
    const tnx = await catNft2.mint("https://ipfs.io/ipfs/QmQ6UkucExz1zceF9XmCan9P9mGYgmgoqvvbDMHEdpv73n")
    await tnx.wait();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;

});

