// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

/** 
  Contract:
    *Use Chainlink to display current price of Eth/USD interface
    *Allow seller to input price
    *Tranfers money from buyer to seller
    *Contract gets 20% commission for items sold
    *Struct of item information
    *Time limit for item listed (block.timestamp)
**/

// Chainlink price feed interface
interface PriceFeed {
  function getLatestPrice() external view returns(uint);
}
contract EthStreamShop {
  // State variables
  address public owner;
  address payable public seller;
  address payable public buyer;

// Merchandise number for each item to track
  uint public merchandiseNumber;

//Assigns a number to each merchandise added 
  mapping(uint => Merchandise) public merchandise;

// Information on each merchandise for sell
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

// Events to keep track of merchandise
event LogMerchForSale(uint _merchNum);
event LogMerchSold(uint _merchNum);


  // Assign deployer of the contract as the owner
  // Set merchandise number to default of 0
  constructor() payable {
    owner = msg.sender;
    merchandiseNumber = 0;
  }


  /* Function to add merch for sale with following information:
      -Name
      -Merch number
      -Amount for sale
      -Price -> convert to Eth
      -Availablility
      -Time limit in minutes
      -Commission fee
      -Buyer address
      -Seller address
      -Owner address
    *Only owner of contract can add merchandise
    *Increment merchandise number by one
    *Confirm merchandise is added
  */

  function addMerch(address _seller, string memory _merchName, uint _price, uint _amount, uint _timeLeft) public returns(bool) {

    require(msg.sender == owner, "Must be owner to add merchandise");

     merchandise[merchandiseNumber] = Merchandise({
      name: _merchName,
      merchNum: merchandiseNumber,
      amountToSell: _amount,
      price: _price,
      isSold: false,
      timeLeft: block.timestamp + (_timeLeft * 60 seconds),
      commissionFee: (_price * 2)/100,
      buyer: payable(msg.sender),
      seller: payable(_seller),
      owner: payable (owner)
     });

     merchandiseNumber += 1;
     emit LogMerchForSale(merchandiseNumber);
     return true;
  }

  /* Function to buy merch:
    -Only available if time is not expired
    -Must have enough merchandise to sell
    -Owner gets 20% of merch price sold
    -Seller gets price - commission
    -Buyer must have sufficient funds
    - Mark merchandise to sold
    -Subtract amount bought from supply
    -Owner of contract cannot buy merchandise
    -Seller of merchandise cannot buy their own product
  */
  function buyMerch(uint _merchandiseNumber, uint _amount) payable public {
    require(merchandise[_merchandiseNumber].isSold == false, "Merchandise is not available");
    require(merchandise[_merchandiseNumber].timeLeft >= block.timestamp, "Time is over for this merchandise");
    require(merchandise[_merchandiseNumber].amountToSell > 0, "Out of merchandise");
    require(msg.sender != owner, "Owner cannot purchase merchandise");
    require(msg.sender != merchandise[_merchandiseNumber].seller, "Seller cannot buy their own product");

    merchandise[_merchandiseNumber].seller.transfer(merchandise[_merchandiseNumber].price - merchandise[_merchandiseNumber].commissionFee);
    merchandise[_merchandiseNumber].buyer = payable(msg.sender);
    merchandise[_merchandiseNumber].owner.transfer(merchandise[_merchandiseNumber].commissionFee);
    merchandise[_merchandiseNumber].amountToSell - _amount;
    merchandise[_merchandiseNumber].isSold = true;

    emit LogMerchSold(merchandiseNumber);
    
  }

// Function to get merchandise
  function getMerch(uint _merchNumber) public view returns(string memory name, uint merchNum, uint amountToSell, uint price, bool isSold, uint timeLeft, address _seller) {
   name =  merchandise[_merchNumber].name;
   merchNum = merchandise[_merchNumber].merchNum;
   amountToSell = merchandise[_merchNumber].amountToSell;
   price = merchandise[_merchNumber].price;
   isSold = merchandise[_merchNumber].isSold;
   timeLeft = merchandise[_merchNumber].timeLeft;
   _seller = merchandise[_merchNumber].seller;

   return(name, merchNum, amountToSell, price, isSold, timeLeft, _seller);
  
  }
}

