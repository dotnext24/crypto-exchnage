import React, { Component } from 'react'
import {Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'
import {
    Link
  } from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Site Name</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#about">About</Nav.Link>     
    </Nav>   
  </Navbar.Collapse>
</Navbar>
        )
    }
}
