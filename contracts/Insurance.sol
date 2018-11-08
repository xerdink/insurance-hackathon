pragma solidity ^0.4.24;

// Interface contract for Phoenix

contract Insurance {
  function isInsured(address taker) public view returns (bool insured);

  // fallback function
  function () public payable {
    getAmountFrom(msg.sender);
  }

  function getAmountFrom(address insuranceTaker) public payable;

  function claim() public;

  function makeInsurance() public payable;
}
