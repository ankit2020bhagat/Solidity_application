const { expect } = require("chai");
const { ethers } = require("hardhat");

describe.only("Test Call Contract", function () {
  let testCall, call;
  it("Deploy Test contract and Call", async function () {
    testCall = await ethers.deployContract("TestCall", []);
    await testCall.waitForDeployment();
    console.log("Test Call deployed at ", testCall.target);
    call = await ethers.deployContract("Call", []);
    await call.waitForDeployment();
    console.log("Call contract Deployed at ", call.target);
  });
  it("should call foo function and fallback", async function () {
    const data = await call.fooCall(testCall.target, { value: 100 });

    const txn = await call.callDoesNotExist(testCall.target);
    await txn.wait();
    const str1 = await testCall.message();
    console.log("Message ", str1.toString());
    const x1 = await testCall.x();
    console.log("X ;", x1.toString());
  });
});
