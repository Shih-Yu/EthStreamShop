import React from 'react'
import { Link } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function Nav() {
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
          <button class="btn btn-success">Connect</button>
        </Navbar>
      </Container>
    </>
  )
}
