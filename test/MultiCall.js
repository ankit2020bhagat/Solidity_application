const { ethers } = require("hardhat");

describe("MultiCall Contact", function () {
  let testMultiCall, MultiCall;
  it("Contract Deployment ", async function () {
    testMultiCall = await ethers.deployContract("TestMultiCall", []);
    await testMultiCall.waitForDeployment();
    console.log("Test Contract Deployed at :", testMultiCall.target);
    MultiCall = await ethers.deployContract("MultiCall", []);
    await MultiCall.waitForDeployment();
    console.log("Multi Call Deployed at ", MultiCall.target);
  });
  describe("Generating Byte Data", function () {
    it("get buyte data of functions and calling MultiCall", async function () {
      const data1 = await testMultiCall.getData1();
      console.log("Get Data 1 ", data1);
      const data2 = await testMultiCall.getData2();
      console.log("Get Data 2 ", data2);

      const result = await MultiCall.multiCall(
        [testMultiCall.target, testMultiCall.target],
        [data1, data2]
      );
      console.log("Return output ", result);
    });
  });
});
