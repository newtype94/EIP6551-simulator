// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameCharacter is ERC721, Ownable {
    uint256 public nextCharacterId;

    constructor() ERC721("GameCharacter", "GC") Ownable(msg.sender) {
        nextCharacterId = 0;
    }

    function mintCharacter(address to) external onlyOwner {
        _safeMint(to, nextCharacterId);
        nextCharacterId++;
    }
}

contract GameItem is ERC1155, Ownable {
    address public characterContract;
    mapping(uint256 => address) public itemOwners;

    constructor() ERC1155("http://localhost:3000/metadata/{id}.json") Ownable(msg.sender) {}

    function setCharacterContract(address _characterContract) external onlyOwner {
        characterContract = _characterContract;
    }

    function mintItemToUser(address user, uint256 itemId, uint256 amount) external onlyOwner {
        _mint(user, itemId, amount, "");
        itemOwners[itemId] = user;
    }

    function mintItemToRandomUser(uint256 itemId, uint256 amount, address[] memory userList) external onlyOwner {
        require(userList.length > 0, "No users in the list");
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao))) % userList.length;
        address randomUser = userList[randomIndex];
        _mint(randomUser, itemId, amount, "");
        itemOwners[itemId] = randomUser;
    }
}
