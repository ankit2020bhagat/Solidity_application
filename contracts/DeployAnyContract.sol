// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract TestContract1 {
    error onlyOwner();

    address public owner = msg.sender;

    function setOwner(address _owner) external {
        if (msg.sender != owner) {
            revert onlyOwner();
        }
        owner = _owner;
    }
}

contract TestContract2 {
    address public owner = msg.sender;
    uint public value = msg.value;
    uint public x;
    uint public y;

    constructor(uint _x, uint _y) {
        x = _x;
        y = _y;
    }
}

contract Proxy {
    error ZeroAddress();
    error FailedtoSend();
    event Deployed(address deploye);

    function deploye(
        bytes memory _code
    ) external payable returns (address addr) {
        assembly {
            addr := create(callvalue(), add(_code, 0x20), mload(_code))
        }
        if (addr == address(0)) {
            revert ZeroAddress();
        }
        emit Deployed(addr);
    }

    function execute(address _target, bytes memory _data) external payable {
        (bool success, ) = _target.call{value: msg.value}(_data);
        if (!success) {
            revert FailedtoSend();
        }
    }
}

contract Helper {
    function getByteCode1() external pure returns (bytes memory) {
        bytes memory byteCode = type(TestContract1).creationCode;
        return byteCode;
    }

    function getByteCode2(
        uint _x,
        uint _y
    ) external pure returns (bytes memory) {
        bytes memory byteCode = type(TestContract2).creationCode;
        return abi.encodePacked(byteCode, abi.encode(_x, _y));
    }

    function getCallData(address _owner) external pure returns (bytes memory) {
        return abi.encodeWithSignature("setOwner(address)", _owner);
    }
}
