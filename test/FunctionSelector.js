const { expect } = require("chai");
const { ethers } = require("hardhat");

describe.only("Function Selector", function () {
  let Receiver, FunctionSelector, account;
  it("", async function () {
    [...account] = await ethers.getSigners();
    Receiver = await ethers.deployContract("Receiver", []);
    await Receiver.waitForDeployment();
    console.log("Contract deployed at ", Receiver.target);
    FunctionSelector = await ethers.deployContract("FunctionSelector", []);
    await FunctionSelector.waitForDeployment();
    console.log("Contract deployed at :", FunctionSelector.target);
  });
  it("get transfer call data", async function () {
    const data = await Receiver.transfer(account[0].address, 8);
    console.log("Data: ", data);

    expect(
      await FunctionSelector.getSelector("transfer(address,uint256)")
    ).to.equal("0xa9059cbb");
  });
});
