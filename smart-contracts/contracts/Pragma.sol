// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Pragma is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct user {
        string username;
        string pfp;
    }

    mapping(address => user) public users;

    function getUserData(address userAddress) external view returns (user memory) {
        return users[userAddress];
    }

    function changeName(string memory newUsername) external {
        users[msg.sender].username = newUsername; 
    }

    function changePfp(string memory newPfp) external {
        users[msg.sender].pfp = newPfp;
    }

    constructor() ERC721("The Feed Posts V10", "FEED") {}

    function mintPost(string memory title, string memory description, string memory image) public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        string memory tokenURI = makeTokenURI(title, description, image);
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
    }

    // Makes token URI
    function makeTokenURI(string memory title, string memory description, string memory image)
        internal
        pure
        returns (string memory)
    {
        bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "', title, '"',
                ",",
                '"description": "', description, '"',
                ",",
                '"image": "ipfs://', image, '"',
            '}'
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }
}