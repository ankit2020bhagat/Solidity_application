// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract VerifySignature{
    function verify(address _signer,string memory message,bytes memory signature) external  pure returns(bool){
        bytes32 messageHash = getMessagehash(message);
        bytes32 ethMessageHash = getEthMessage(messageHash);
        return recoverSigner(ethMessageHash, signature) == _signer;
    }

    function getMessagehash(string memory message) public  pure returns(bytes32){
        return keccak256(abi.encodePacked(message));
    }

    function getEthMessage(bytes32 _sig) public  pure returns(bytes32){
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _sig));
    }

    function recoverSigner(bytes32 _ethMessageHash,bytes memory _signature) public  pure  returns(address){
            (bytes32 r,bytes32 s,uint8 v) = _splitSignature(_signature);
            return ecrecover(_ethMessageHash,v,r,s);
    }

    function _splitSignature(bytes memory _signature) internal pure returns(bytes32 r,bytes32 s,uint8 v){
        if(_signature.length != 65){
            revert();
        }
        assembly {
            r := mload(add(_signature,32))
            s := mload(add(_signature,64))
            v := byte(0,mload(add(_signature,96)))
        }
    }
}