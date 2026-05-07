const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("USDC Contract", function () {
  let usdc;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const USDC = await ethers.getContractFactory("USDC");
    usdc = await USDC.deploy();
  });

  describe("Deployment", function () {
    it("Should have correct name and symbol", async function () {
      expect(await usdc.name()).to.equal("USD Coin");
      expect(await usdc.symbol()).to.equal("USDC");
    });

    it("Should have 6 decimals", async function () {
      expect(await usdc.decimals()).to.equal(6);
    });

    it("Should have zero total supply initially", async function () {
      expect(await usdc.totalSupply()).to.equal(0);
    });

    it("Owner should be minter initially", async function () {
      expect(await usdc.isMinter(owner.address)).to.be.true;
    });
  });

  describe("Minting", function () {
    it("Should mint tokens to an address", async function () {
      const mintAmount = ethers.parseUnits("1000", 6);
      await usdc.mint(addr1.address, mintAmount);

      expect(await usdc.balanceOf(addr1.address)).to.equal(mintAmount);
      expect(await usdc.totalSupply()).to.equal(mintAmount);
    });

    it("Should allow owner to mint", async function () {
      const mintAmount = ethers.parseUnits("500", 6);
      await expect(usdc.mint(addr1.address, mintAmount)).to.not.be.reverted;
    });

    it("Should not allow non-minter to mint", async function () {
      const mintAmount = ethers.parseUnits("100", 6);
      await expect(
        usdc.connect(addr1).mint(addr1.address, mintAmount)
      ).to.be.revertedWith("Only minters can call this function");
    });

    it("Should allow adding new minter", async function () {
      await usdc.addMinter(addr1.address);
      expect(await usdc.isMinter(addr1.address)).to.be.true;

      const mintAmount = ethers.parseUnits("100", 6);
      await expect(usdc.connect(addr1).mint(addr1.address, mintAmount)).to.not
        .be.reverted;
    });

    it("Should not allow adding existing minter", async function () {
      await expect(usdc.addMinter(owner.address)).to.be.revertedWith(
        "Already a minter"
      );
    });
  });

  describe("Burning", function () {
    it("Should burn tokens", async function () {
      const mintAmount = ethers.parseUnits("1000", 6);
      const burnAmount = ethers.parseUnits("100", 6);

      await usdc.mint(addr1.address, mintAmount);
      await usdc.burnFrom(addr1.address, burnAmount);

      expect(await usdc.balanceOf(addr1.address)).to.equal(
        mintAmount - burnAmount
      );
      expect(await usdc.totalSupply()).to.equal(mintAmount - burnAmount);
    });

    it("Should not allow non-burner to burn", async function () {
      const mintAmount = ethers.parseUnits("1000", 6);
      const burnAmount = ethers.parseUnits("100", 6);

      await usdc.mint(addr1.address, mintAmount);

      await expect(usdc.connect(addr1).burnFrom(addr1.address, burnAmount)).to
        .be.reverted;
    });
  });

  describe("Transfer", function () {
    it("Should transfer tokens between accounts", async function () {
      const mintAmount = ethers.parseUnits("1000", 6);
      const transferAmount = ethers.parseUnits("100", 6);

      await usdc.mint(addr1.address, mintAmount);
      await usdc.connect(addr1).transfer(addr2.address, transferAmount);

      expect(await usdc.balanceOf(addr2.address)).to.equal(transferAmount);
      expect(await usdc.balanceOf(addr1.address)).to.equal(
        mintAmount - transferAmount
      );
    });
  });
});
