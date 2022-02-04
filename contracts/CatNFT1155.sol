pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CatNFT1155 is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor()
        public
        ERC1155(
            "https://ipfs.io/ipfs/QmTE9QLXSmZD2vuFxUyAuTENJqN45jddpPkxeJuD4aqDgV"
        )
    {}

    function mint(uint256 _amount) public {
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId, _amount, "");
        _tokenIds.increment();
    }
}

// https: //ipfs.io/ipfs/QmTE9QLXSmZD2vuFxUyAuTENJqN45jddpPkxeJuD4aqDgV
//0x8523de301d68310788165560e14093eb08040cd0
//https://rinkeby.etherscan.io/address/0x8523de301d68310788165560e14093eb08040cd0#code
