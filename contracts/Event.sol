// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

interface IEventFactory {
    function addUser(address user) external returns (bool);    
}

contract Event is Initializable, ERC721Upgradeable, AccessControlUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    CountersUpgradeable.Counter private _tokenIdCounter;
    string public baseURI;

    // @dev date after which transfers are allowed
    uint256 public transferTimestamp;

    IEventFactory factory;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        string calldata _name,
        string calldata _symbol,
        string calldata _baseUrl,
        uint256 _transferTimestamp,
        address admin
    ) initializer public {
        __ERC721_init(_name, _symbol);
        __AccessControl_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, admin);
        baseURI = _baseUrl;
        transferTimestamp = _transferTimestamp;
        factory = IEventFactory(msg.sender);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function safeMint(address to) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        if ( from != address(0) ) {
            require(block.timestamp > transferTimestamp, "transfers not allowed at this time");
        }
        super._beforeTokenTransfer(from, to, tokenId);
    }

    /**
     * @notice The IPFS URI of contract-level metadata.
     */
    function contractURI() external view returns (string memory) {
        return string(abi.encodePacked(baseURI, "contract.json"));
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}