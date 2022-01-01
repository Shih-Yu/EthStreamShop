// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

/*
  Contract:
    -Use Chainlink to display current price of Eth/USD
    -Allow seller to input price
    -Tranfers money from buyer to seller
    -Contract gets 10% commission for items sold
    -Struct of item information
*/

contract EthStreamShop {
  // State variables
  address payable public owner;
  address payable public seller;
  address payable public buyer;
  uint public commissionFee;
  uint public price;

  // Assign deployer of the contract as the owner
  constructor() {
   msg.sender = payable owner ;
  }


  // Function to buy item
  function buy() payable public {
    
  }

}

