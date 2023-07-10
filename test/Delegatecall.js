const { ethers } = require("hardhat");

describe("Test Delegate Call", function () {
  let testContract, delegateCall;
  it("Contract Deployment", async function () {
    testContract = await ethers.deployContract("TestDelegateCall", []);
    await testContract.waitForDeployment();
    console.log("Test Contract Deployed at: ", testContract.target);
    delegateCall = await ethers.deployContract("DelegateCall", []);
    await delegateCall.waitForDeployment();
    console.log("Delegatecall contract Deployed at: ", delegateCall.target);
  });

  describe("Interact With Test Contract", function () {
    it("should update the state variable", async function () {
      const txn = await delegateCall.foo(testContract.target, 100, {
        value: 100,
      });
      await txn.wait();
      console.log("Sender address: ", await delegateCall.sender());
      console.log("X : ", (await delegateCall.x()).toString());
      console.log("value :", (await delegateCall.value()).toString());
    });
  });
});
