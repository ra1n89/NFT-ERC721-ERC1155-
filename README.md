Токены стандарта ERC721, ERC1155 (наследование OpenZeppeline)

- Написаны  тесты к функциям контракта 
- Сформирован скрипт деплоя
- Контраты задеплоены в сеть Rinkeby
- Написаны таски на mint 
- Контракты верифицированы

Сформированные tasks:
ERC721
npx hardhat mint--address <contract address> --uri <uri with reference to JSON file>
ERC1155  
npx hardhat mint--address <contract address> --amount <minting some amount of nft copies>

Задеплоенные NFT отображаются на Opensea по ссылкам:
ERC721
https://testnets.opensea.io/assets/0xe90b0487b3B95A5Cb3d084Dbf02Bf0C4508ddbbe/0
ERC1155
https://testnets.opensea.io/assets/0x8523de301d68310788165560e14093eb08040cd0/0
  
Cами картинки NFT, а также json файл с метадатой загружены в IPFS.

Верифицированный контракт ERC721  - https://rinkeby.etherscan.io/address/0xe90b0487b3B95A5Cb3d084Dbf02Bf0C4508ddbbe#code
Верифицированный контракт ERC1155 - https://rinkeby.etherscan.io/address/0x8523de301d68310788165560e14093eb08040cd0#code
