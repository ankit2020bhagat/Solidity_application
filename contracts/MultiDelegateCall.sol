// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract MultiDelegateCall {
    
    function test(bytes[] calldata data) external returns(bytes[] memory result){
     result = new bytes[](data.length);
     for(uint i=0;i<data.length;i++){
        (bool success,bytes memory _data) = address(this).delegatecall(data[i]);
        if(!success){
            revert();
        }
        result[i] = _data;
    }
 }
}
contract TestmultiDelegateCall is MultiDelegateCall{
    event Log(address caller,string fun,uint i);
    function func1(uint x,uint y) external {
        emit Log(msg.sender,"func1",x+y);
    }

    function func2() external returns(uint){
        emit Log(msg.sender,"func2",2);
        return 111;
    }
}


contract Helper1{
    function getData1(uint x,uint y) external pure returns(bytes memory){
        return abi.encodeWithSelector(TestmultiDelegateCall.func1.selector, x,y);
    } 

    function getData2() external pure returns(bytes memory){
        return abi.encodeWithSelector(TestmultiDelegateCall.func2.selector);
    }
}