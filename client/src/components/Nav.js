import React from 'react'
import { Link } from "react-router-dom"
import { Navbar, Container, Button } from "react-bootstrap";
// import { providers } from 'ethers';


export default function Nav() {

// Connect to Metamask wallet
 async function metaMaskConnect() {
// Request account from Metamask wallet and prompt user to connect if not connect
   await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  return (
    <>
      <Container fluid>
        <Navbar className="text-center justify-content-between pr-5 fs-4">
          <Navbar.Brand className="fs-1">EthStreamShop</Navbar.Brand>
          <Link className="text-dark mr-2" to="/">
            Home
          </Link>
          <Link className="text-dark mr-2" to="/watch">
            Watch
          </Link>
          <Link className="text-dark mr-2" to="/add">
            Add Merch
          </Link>
          <Button
            class="btn btn-success"
            onClick={metaMaskConnect}
          >Connect</Button>
        </Navbar>
      </Container>
    </>
  )
}
