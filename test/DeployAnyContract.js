const { ethers } = require("hardhat");
const TestcontractAbi = require("../artifacts/contracts/DeployAnyContract.sol/TestContract1.json");
const TestContract2abi = require("../artifacts/contracts/DeployAnyContract.sol/TestContract2.json");
describe("Proxy and Helper  contract", function () {
  let Helper,
    Proxy,
    TestContract1Address,
    TestContract1Address2,
    accounts,
    Testcontract1,
    Testcontract2;
  it("Contract deployments", async function () {
    [...accounts] = await ethers.getSigners();
    Helper = await ethers.deployContract("Helper", []);
    await Helper.waitForDeployment();
    console.log("Helper contract Deployed at ", await Helper.getAddress());
    Proxy = await ethers.deployContract("Proxy", []);
    await Proxy.waitForDeployment();
    console.log("Proxy contract Deployed at ", await Proxy.getAddress());
    TestContract1 = await ethers.deployContract("TestContract1", []);
    await TestContract1.waitForDeployment();
  });
  describe("Byte Code", function () {
    it("should generate bytecode of TestContract1", async function () {
      const byteCode = await Helper.getByteCode1();

      const deployTxn = await Proxy.deploye(byteCode, {
        value: ethers.parseEther("0.00"),
      });
      await deployTxn.wait();
      TestContract1Address = await Proxy.add();
      console.log("Test contract Address ", TestContract1Address);
    });
    it("Connecct with TestContract 1 ", async function () {
      Testcontract1 = new ethers.Contract(
        TestContract1Address,
        TestcontractAbi.abi,
        accounts[0]
      );
      console.log("Owner address ", await Testcontract1.owner());
    });
    it("should change owner", async function () {
      const calldata = await Helper.getCallData(accounts[0].address);
      const txnExecute = await Proxy.connect(accounts[0]).execute(
        TestContract1Address,
        calldata,
        {
          value: hre.ethers.parseEther("0"),
        }
      );
      await txnExecute.wait();
      console.log("New owner", await Testcontract1.owner());
    });

    describe("Deployign Testcontract 2", function () {
      it("should genrate Byte code 2", async function () {
        const byteCode2 = await Helper.getByteCode2(45, 67);
        const deploy = await Proxy.deploye(byteCode2);
        await deploy.wait();
        TestContract1Address2 = await Proxy.add();
        Testcontract2 = new ethers.Contract(
          TestContract1Address2,
          TestContract2abi.abi,
          accounts[1]
        );
        let x = await Testcontract2.x();
        let y = await Testcontract2.y();
        console.log("X ,Y", x.toString(), y.toString());
      });
    });
  });
});
