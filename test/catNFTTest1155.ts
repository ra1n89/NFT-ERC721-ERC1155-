import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { equal } from "assert";
import { expect } from "chai";
import { ethers } from "hardhat";
import { beforeEach } from "mocha";
import { CatNFT1155 } from "../typechain/CatNFT1155";
import { CatNFT1155__factory } from "../typechain/factories/CatNFT1155__factory";



describe("CatNFT1155", function () {
    let bob: SignerWithAddress,
        alice: SignerWithAddress;
    let catNFT1155: CatNFT1155;

    before(async () => {
        [bob, alice] = await ethers.getSigners();
    })

    beforeEach(async () => {
        const CatNFT1155 = await ethers.getContractFactory("CatNFT1155") as CatNFT1155__factory;
        catNFT1155 = await CatNFT1155.deploy() as CatNFT1155;
        await catNFT1155.deployed();
    })


    it("should minting leads to create NFT with correct URI and ID", async function () {
        const uri = "https://ipfs.io/ipfs/QmTE9QLXSmZD2vuFxUyAuTENJqN45jddpPkxeJuD4aqDgV";

        expect(await catNFT1155.uri(0)).to.be.equal(uri);

    })
})
