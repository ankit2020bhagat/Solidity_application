// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract FunctionSelector{
    function getSelector(string calldata fun) external pure returns(bytes4){
           return bytes4(keccak256(bytes(fun)));
    }
}
contract Receiver{
       function transfer(address to,uint amount) external pure returns(bytes memory){
            return (msg.data);
       }
}