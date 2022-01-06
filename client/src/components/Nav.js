import {useState} from 'react';
import { Link } from "react-router-dom";
import { Navbar, Container, Button } from "react-bootstrap";
import { ethers } from "ethers";
import PriceFeed from "../build/PriceFeed.json";


const PriceFeedAddress = "0xAc67D39D95c425DC45AD5496c45c0826Eb77b3E5";

export default function Nav() {
  const [currentPrice, setCurrentPrice] = useState()

  
  // Check webpage if a wallet exists
  async function checkWallet() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

// Request account from Metamask wallet and prompt user to connect if not connect
  // Connect to wallet provider of webpage
 async function connect() {
   await checkWallet();
   const provider = new ethers.providers.Web3Provider(window.etherum);
  const signer = provider.signer();
  };

  async function getPrice() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Using Ethers.js to call the contract on Rinkeby Testnet
    const contract = new ethers.Contract(PriceFeedAddress, PriceFeed.abi, provider);
   try {
     const data = await contract.getLatestPrice();
    //  Convert price to readable number
     let price = ethers.utils.formatEther(data) * 10e9;
    //  set State to price from pricefeed
      setCurrentPrice(price.toFixed(2))
   } catch (error) {
     console.error("Error", error);
   }
    

  }

  return (
    <>
      <Container fluid>
        <Navbar className="text-center justify-content-between pr-5 fs-4">
          <Navbar.Brand className="fs-1">EthStreamShop</Navbar.Brand>
          <Button className="btn-info" onClick={ getPrice()}>Eth/USD:$ { currentPrice}</Button>
          <Button><Link className="text-warning mr-2" to="/">
            Home
          </Link>
          </Button>
          <Button>
          <Link className="text-warning mr-2" to="/watch">
            Watch
            </Link>
          </Button>
          <Button>
          <Link className="text-warning mr-2" to="/add">
            Add Merch
          </Link>
          </Button>
          <Button
            className="btn btn-success"
            onClick={ connect }
          >
            Connect Wallet
          </Button>
        </Navbar>
      </Container>
    </>
  )
}
