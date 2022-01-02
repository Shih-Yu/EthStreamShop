// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

/*
  Contract:
    -Use Chainlink to display current price of Eth/USD
    -Allow seller to input price
    -Tranfers money from buyer to seller
    -Contract gets 10% commission for items sold
    -Struct of item information
    -Time limit for item listed (block.timestamp)
*/

contract EthStreamShop {
  // State variables
  address public owner;
  address payable public seller;
  address payable public buyer;

  // Merchandise number for each item to track
  uint public merchandiseNumber;

  //Assigns a number to each merchandise added 
  mapping(uint => Merchandise) public merchandise;


  struct Merchandise {
    string name;
    uint merchNum;
    uint amountToSell;
    uint price;
    bool isSold;
    uint timeLeft;
    uint commissionFee;
    address payable buyer;
    address payable seller;
    address payable owner;
  }



  // Assign deployer of the contract as the owner
  // Set merchandise number to default of 0
  constructor() payable {
    owner = msg.sender;
    merchandiseNumber = 0;
  }


  /* Function to add merch:
  */

  function addMerch(address _seller, string memory _merchName, uint _price, uint _amount, uint _timeLeft) public returns(bool) {

     merchandise[merchandiseNumber] = Merchandise({
      name: _merchName,
      merchNum: merchandiseNumber,
      amountToSell: _amount,
      price: _price,
      isSold: false,
      timeLeft: block.timestamp + (_timeLeft * 60),
      commissionFee: (_price * 2)/100,
      buyer: payable(msg.sender),
      seller: payable(_seller),
      owner: payable (owner)
     });

     merchandiseNumber += 1;
     return true;
  }

  /* Function to buy merch:
    -Only available if time is not expired
    -Owner gets 20% of merch price sold
    -Seller gets price - commission
    -Buyer must have sufficient funds
    -Merchandise is now sold
  */
  function buyMerch(uint _merchandiseNumber) payable public {
    require(merchandise[_merchandiseNumber].isSold == false, "Merchandise is not available");
    require(merchandise[_merchandiseNumber].timeLeft < block.timestamp);

    merchandise[_merchandiseNumber].seller.transfer(merchandise[_merchandiseNumber].price - merchandise[_merchandiseNumber].commissionFee);
    merchandise[_merchandiseNumber].buyer = payable(msg.sender);
    merchandise[_merchandiseNumber].owner.transfer(merchandise[_merchandiseNumber].commissionFee);
    merchandise[_merchandiseNumber].isSold = true;
    
     
  }

  // Function to sell merch
  function sellMerch() payable public {

  }

}

