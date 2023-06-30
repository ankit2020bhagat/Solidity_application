// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract TestMultiCall{

    function fun1() external view returns(uint,uint){
        return (1,block.timestamp);
    }

    function fun2() external view returns(uint,uint){
        return(2,block.timestamp);
    }

    function getData1() external pure returns(bytes memory){
        return abi.encodeWithSelector(this.fun1.selector);
    }

    function getData2() external pure returns(bytes memory){
        return abi.encodeWithSelector(this.fun2.selector);
    }
}

contract MultiCall {

      function multiCall(address[] calldata target,bytes[] memory data) external view returns(bytes[] memory){
        if(target.length != data.length){
            revert();
        }
        bytes[] memory resutl = new bytes[](target.length);
        for(uint i=0;i<target.length;i++){
            (bool success,bytes memory _data)=target[i].staticcall(data[i]);
            if(!success){
                revert();
            }
            resutl[i]= _data;
        }
        return resutl;
      }

}