const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MultiSig Wallet", function () {
  let contractAddress, accounts, multisig;
  it("deploy contracts", async function () {
    [...accounts] = await ethers.getSigners();

    multisig = await ethers.deployContract("MultiSigWallet", [
      [accounts[1].address, accounts[2].address, accounts[3].address],
      2,
    ]);

    await multisig.waitForDeployment();
    contractAddress = await multisig.getAddress();
    console.log("Multisig deployed at :", await multisig.getAddress());
  });
  describe("Deposit Ether", function () {
    it("should deposit Ether", async function () {
      const txn = await multisig.deposit({ value: 10 * 1e10 });
      await txn.wait();
      const balance = await ethers.provider.getBalance(
        await multisig.getAddress()
      );
      console.log("Contract Balance ", balance.toString());
    });
  });
  describe("Submit Transaction", function () {
    it("should submit Tranasction", async function () {
      const txn = await multisig
        .connect(accounts[1])
        .submitTransaction(accounts[5].address, 1 * 1e10, "0x");
      await txn.wait();
    });
  });
  describe("Confirmation Trasanction", function () {
    it("should confirm transaction", async function () {
      let txn = await multisig.connect(accounts[1]).confirmTransaction(0);
      await txn.wait();
      txn = await await multisig.connect(accounts[2]).confirmTransaction(0);
      await txn.wait();
    });
  });
  describe("executeTransaction", function () {
    it("should execute transaction", async function () {
      let txn = await multisig.connect(accounts[1]).executeTransaction(0);
      await txn.wait();
      const balance = await ethers.provider.getBalance(accounts[5].address);
      console.log("Balance ", balance.toString());
      const contractBalance = await ethers.provider.getBalance(
        await multisig.getAddress()
      );
      console.log("Contract Balance ", contractBalance.toString());
    });
  });
});
