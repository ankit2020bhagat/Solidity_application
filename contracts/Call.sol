// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract TestCall {
    string  public message;
    uint  public x;

    event Log(string log);

    fallback() external payable {
        emit Log("Fallback is called");
    }
    receive() external payable{}

    function foo(string memory str1,uint _x) external payable returns(bool,uint){
        message =str1;
        x= _x;
        return(true,999);
    }
}

contract Call{
    function fooCall(address target) external payable returns(bytes memory){
        (bool isOk,bytes memory data) = target.call{value:100}(abi.encodeWithSignature("foo(string,uint256)", "call foo",45));
        if(!isOk){
            revert();
        }
        return data;
    }

    function callDoesNotExist(address target) external {
        (bool success,) = target.call(abi.encodeWithSignature("doesNotExist()"));
        if(!success){
            revert();
        }
    }
}
