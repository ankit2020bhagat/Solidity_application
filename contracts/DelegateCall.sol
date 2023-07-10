// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract TestDelegateCall{

    address public sender;
    uint256 public x ;
    uint256 public value;

    function foo(uint _x ) external payable {
       sender = msg.sender;
       value=  msg.value;
       x = _x;
    }
}

contract DelegateCall {
    address public sender;
    uint256 public x;
    uint256 public value;

    function foo(address target,uint256 _x) external payable {
    //    (bool success,bytes memory data)= target.delegatecall(abi.encodeWithSignature("foo(uint256)", _x));
           (bool success,)=target.delegatecall(abi.encodeWithSelector(TestDelegateCall.foo.selector,_x));
           if(!success){
            revert ();
           }
    }

}