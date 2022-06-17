// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

error InvalidAddress(address addressInputed, string errorMessage);

contract Bank {
    address payable public manager;
    address payable[] public players;
    mapping(address => mapping(address => uint256)) balance;
    mapping(address => mapping(address => uint256)) assetPrice;
    mapping(address => address) LinkAddresses;
    mapping(address => address) CheckLinkage;
    constructor() {
        manager = payable(msg.sender);
    }
    uint256 index = 0;
    address aux;

    modifier OnlyOwner{
        require(msg.sender == manager, "You are not the owenr of the Contract_");
        _;
    }

    function InitiateThirdPartyDeal(address addressFromBuyer, uint256 price) public payable{
        require(addressFromBuyer != msg.sender, "You put your own addrress");
        if(addressFromBuyer == msg.sender){
            revert("You put your own addrres");
        }
        LinkAddresses[addressFromBuyer] = msg.sender;
        CheckLinkage[msg.sender]= addressFromBuyer;
        assetPrice[msg.sender][addressFromBuyer] = price;
    }

    function checkPriceToLock(address addressFromSeller, uint256 price) public view{
        require(price >= assetPrice[addressFromSeller][msg.sender]);
    }
    function LockMoney(address addressFromSeller, uint256 price) public payable {
        require(addressFromSeller != msg.sender, "You put your own addrress");
        require(CheckLinkage[addressFromSeller] == msg.sender, "You are not the right Buyer!");
        require(LinkAddresses[msg.sender] == addressFromSeller, "You inputed the wrong Seller address!");
        require(price >= assetPrice[addressFromSeller][msg.sender], "You inputed the wrong amount");
        balance[LinkAddresses[msg.sender]][payable(msg.sender)] = msg.value;
    }

    function sendMoneyToSeller(address addressFromSeller) public{
        require(addressFromSeller != msg.sender, "You put your own addrress");
        require(CheckLinkage[addressFromSeller] == msg.sender, "You are not the right Buyer!");
        require(LinkAddresses[msg.sender] == addressFromSeller, "You inputed the wrong Seller address!");
        payable(LinkAddresses[msg.sender]).transfer(balance[LinkAddresses[msg.sender]][payable(msg.sender)]);
    }

    function seeBalanceFromBuyer(address addressFromBuyer) public view returns(uint){
        return balance[msg.sender][addressFromBuyer];
    }

    function ApproveSeller(address addressFromBuyer) public OnlyOwner{
        payable(LinkAddresses[addressFromBuyer]).transfer(balance[LinkAddresses[addressFromBuyer]][payable(addressFromBuyer)]);
    }
    function ApproveBuyer(address addressFromSeller) public OnlyOwner{
        payable(CheckLinkage[addressFromSeller]).transfer(balance[payable(addressFromSeller)][CheckLinkage[addressFromSeller]]);
    }


}