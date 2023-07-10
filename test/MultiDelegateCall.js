const { ethers } = require("hardhat");

describe("Multi Delegate Call", function () {
  let helperContract, TestmultiDelegateCall, data;
  it("", async function () {
    helperContract = await ethers.deployContract("Helper1", []);
    await helperContract.waitForDeployment();
    console.log("Helper Contract deployed at : ", helperContract.target);
    TestmultiDelegateCall = await ethers.deployContract(
      "MultiDelegateCall",
      []
    );
    await TestmultiDelegateCall.waitForDeployment();
    console.log(
      "Multi Delegate Calldeployed at :",
      TestmultiDelegateCall.target
    );
  });
  it("Getting call data and calling function fun1 and func2", async function () {
    let data1 = await helperContract.getData1(3, 5);
    console.log("Call data1 ", data1);
    data1 = data1.toString();
    let data2 = await helperContract.getData2();
    console.log("Call Data2 :", data2);
    data2 = data2.toString();
    const result = await TestmultiDelegateCall.test([data1, data2]);
  });
});
