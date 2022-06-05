// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";
import "./SafeMath.sol";
 
contract Legacy {

    using SafeMath for uint; // you can make a call like myUint.add(123)
     
    mapping(address => uint256) public balances;
    mapping(address => uint256) public lockTime;

    mapping(address => address) public linkageReceiverPayer;
    mapping(address => uint256) public balances2;
    mapping(address => uint) public lockTime2;  

    function checkBalance() public view returns(uint256){
        return balances[msg.sender];
    }
    function checkBalance2() public view returns(uint256){
        return balances2[msg.sender];
    }
    function deposit(uint256 price, int nrMinutes) external payable {
        balances[msg.sender] += price;
        lockTime[msg.sender] = block.timestamp + uint(nrMinutes) * 1 minutes;
    }  

    function deposit2(address addressFromBeneficiary, uint256 price, int nrMinutes) external payable{
      //  linkageReceiverPayer[addressFromBeneficiary] = msg.sender;
        balances2[addressFromBeneficiary] += price;
        lockTime2[addressFromBeneficiary] = block.timestamp + uint(nrMinutes) * 1 minutes;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
         lockTime[msg.sender] = lockTime[msg.sender].add(_secondsToIncrease);
    }   

    function withdraw() public {
        require(balances[msg.sender] > 0, "insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "lock time has not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;


        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send ether");

    }
        function withdraw2() public {
        require(balances2[msg.sender] > 0, "insufficient funds");
        require(block.timestamp > lockTime2[msg.sender], "lock time has not expired");

        uint amount = balances2[msg.sender];
        balances2[msg.sender] = 0;


        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send ether");

    }
}