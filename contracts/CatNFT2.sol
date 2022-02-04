//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CatNFT2 is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("CatNFT2", "CaT2") {}

    function mint(string memory tokenURI) public returns (uint256) {
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _tokenIds.increment();
        return newItemId;
    }
}

//0xe90b0487b3B95A5Cb3d084Dbf02Bf0C4508ddbbe
//json https://ipfs.io/ipfs/QmQ6UkucExz1zceF9XmCan9P9mGYgmgoqvvbDMHEdpv73n
//image https://ipfs.io/ipfs/QmeGNQZYcoNX7TpFsCM8p3kzm9MpfyLwo3NHioLzGdBn2W
//https://rinkeby.etherscan.io/address/0xe90b0487b3B95A5Cb3d084Dbf02Bf0C4508ddbbe#code
