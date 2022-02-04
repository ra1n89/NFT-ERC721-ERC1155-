import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { equal } from "assert";
import { expect } from "chai";
import { ethers } from "hardhat";
import { beforeEach } from "mocha";
import { CatNFT2 } from "../typechain/CatNFT2";
import { CatNFT2__factory } from "../typechain/factories/CatNFT2__factory";



describe("CatNFT2", function () {
    let bob: SignerWithAddress,
        alice: SignerWithAddress;
    let catNFT2: CatNFT2;

    before(async () => {
        [bob, alice] = await ethers.getSigners();
    })

    beforeEach(async () => {
        const CatNFT2 = await ethers.getContractFactory("CatNFT2") as CatNFT2__factory;
        catNFT2 = await CatNFT2.deploy() as CatNFT2;
        await catNFT2.deployed();
    })

    it("Name is correct", async function () {
        const nftName = "CatNFT2";
        expect(await catNFT2.name()).to.be.equal(nftName);
    })

    it("Symbol is correct", async function () {
        const nftSymbol = "CaT2";
        expect(await catNFT2.symbol()).to.be.equal(nftSymbol);
    })

    it("should minting leads to create NFT with correct URI and ID", async function () {
        const uri1 = "GOOGLE"
        const uri2 = "YANDEX"
        await catNFT2.mint(uri1);
        expect(await catNFT2.tokenURI(0)).to.be.equal(uri1);
        await catNFT2.mint(uri2);
        expect(await catNFT2.tokenURI(1)).to.be.equal(uri2);
    })
})
