// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "hardhat/console.sol";
import "./SafeMath.sol";
contract Insurance {

    mapping(address => uint256) InsuranceVault;
    address VaultAddress;
    mapping(address => uint256) UserHasPaied;
    uint256 MonthlyCostPrice = 0.025 ether;
    mapping(address => uint256) public lockTime;
    mapping(int => address) addressToSend;

    struct Request {
        string description;
        uint value;
        address recipient;
        bool approved;
        string pacientID;
        int index;
    }
    
    address payable public manager;
    constructor() {
        manager = payable(msg.sender);
        VaultAddress = msg.sender;
    }
    modifier OnlyMedic{
        require(msg.sender == manager, "You are not the owenr of the Contract_");
        _;
    }
    Request[] public requests;
    int nrOfReq = 0;

    function payMonthlyRate() public payable{
        InsuranceVault[VaultAddress] += msg.value;
        UserHasPaied[msg.sender] += 1;
        lockTime[msg.sender] = block.timestamp;
    }
    function seeBalance() public view OnlyMedic returns(uint256) {
        return InsuranceVault[VaultAddress];
    }
    function checkMonthlyPayment(address addressToCheck) public view returns(bool){
        if( (block.timestamp - lockTime[addressToCheck]) > (uint(1) * 1 minutes) )
            return false;
        return true;
    }

    function makeRequest(string memory description, uint amount, string memory pacientID) public payable {
        require(checkMonthlyPayment(msg.sender) == true);
        Request memory newRequest = Request({
           description: description,
           value: amount,
           recipient: msg.sender,
           approved: true,
           pacientID: pacientID,
           index: nrOfReq
        });
        requests.push(newRequest); 
        addressToSend[nrOfReq] = msg.sender;       
        nrOfReq++;
    }

    function approveRequest(int requestId) public payable OnlyMedic{

        InsuranceVault[VaultAddress] -= requests[uint(requestId)].value;        
        payable(addressToSend[requestId]).transfer(requests[uint(requestId)].value);
        requests[uint(requestId)].approved = false;
    }
    function declineRequest(int requestId) public OnlyMedic {
        requests[uint(requestId)].approved = false;
    }

    function getRequest(uint index) public view returns(Request memory){
        return requests[index];
    }
    function getRequestsLength() public view returns(int){
        return nrOfReq;
    }
}
