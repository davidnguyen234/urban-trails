import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

function Navigation() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top" expand="sm" collapseOnSelect>
      <Navbar.Brand>
        <Nav.Link href="/map">Urban Trails</Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
      <Nav>
        <NavDropdown title="Trails">
        <NavDropdown.Item href="">View All Trails</NavDropdown.Item>
          <NavDropdown.Item href="/trails">Manage Trails</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="/account">Account</Nav.Link>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Navigation;