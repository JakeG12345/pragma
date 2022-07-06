// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PragmaPosts is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

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