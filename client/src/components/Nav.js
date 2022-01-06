import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Container, Button } from "react-bootstrap";
import { ethers } from "ethers";




export default function Nav() {

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

  return (
    <>
      <Container fluid>
        <Navbar className="text-center justify-content-between pr-5 fs-4">
          <Navbar.Brand className="fs-1">EthStreamShop</Navbar.Brand>
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
