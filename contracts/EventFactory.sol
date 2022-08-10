// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.2;

import "./Event.sol";

import "@openzeppelin/contracts/proxy/Clones.sol";

contract EventFactory {
    address immutable tokenImplementation;
    address owner;
    address[] public allEvents;
    mapping(address => address[]) userToEvents;
    mapping(address => address) ownerOfEvent;

    constructor() {
        tokenImplementation = address(new Event());
        owner = msg.sender;
    }

    event EventCreated(
        address indexed _owner,
        address _contract,
        uint
    );

    // @dev deploys a Event contract
    function createEvent(
        string calldata name,
        string calldata symbol,
        string calldata baseUrl,
        uint256 transferTimestamp
    ) external returns (address) {
        address clone = Clones.clone(tokenImplementation);
        Event(clone).initialize(name, symbol, baseUrl, transferTimestamp, msg.sender);
        allEvents.push(clone);
        userToEvents[msg.sender].push(clone);
        ownerOfEvent[clone] = msg.sender;
        emit EventCreated(msg.sender, clone, allEvents.length);
        return clone;
    }

    // @dev should be called only by Event contract
    function addUser(address user) external returns (bool) {
        userToEvents[user].push(msg.sender);
        return true;
    }

    // @dev returns array of all Event contract addresses
    function getAllEvents() public view returns (address[] memory){
       return allEvents;
    }

    // @dev returns array of all Event contract addresses for a specified user address
    function getEventsForUser(address user) public view returns (address[] memory){
       return userToEvents[user];
    }

}
