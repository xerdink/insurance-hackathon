pragma solidity ^0.4.24;

import "./Insurance.sol";

contract Phoenix is Insurance {
  event LogEvent(string _log);

  struct InsuranceTaker {
    bool banned;
    bool validAccount;
    uint256 lastPayment;
  }

  mapping(address => InsuranceTaker) public insuranceTakers;

  function makeInsurance() public payable {
    InsuranceTaker storage customer = insuranceTakers[msg.sender];
    require(!customer.banned, "Should not be banned");
    require(msg.value > 1e17, "Should be greater than 1e17 wei");
    customer.validAccount = true;
  }

  function isInsured(address insuranceTaker) public view returns (bool insured) {
    InsuranceTaker storage customer = insuranceTakers[insuranceTaker];
    return !customer.banned && customer.validAccount;
  }

  function getCurrentBalance() public returns (uint256 amount) {
    emit LogEvent("Get current balance");
    return address(this).balance;
  }

  function getAmountFrom(address insuranceTaker) public payable {
    emit LogEvent("Getting money");

    // 1 wei == 1e18
    // Minimum insurance fee is 0.1 ETH
    require(msg.value > 1e17, "Need to send an amount bigger than 0.1 ETH");
    require(isInsured(insuranceTaker), "Checking if insured");

  }

  function claim() public {
    require(isInsured(msg.sender), "Checking if insured in claim()");
    msg.sender.transfer(0.1 ether);
  }
}
