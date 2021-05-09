pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PersonId is ERC721 {

    string[] public names;
    string[] public data;
    uint256 public tokenCounter;

    constructor() ERC721("PersonId", "PID"){
        tokenCounter = 1;
    }

    function mint(string memory _name, string memory _data) public {
        names.push(_name);
        data.push(_data);
        _mint(msg.sender, tokenCounter);
        tokenCounter++;
    }
}