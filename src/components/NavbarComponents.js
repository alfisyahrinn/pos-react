import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

export default function NavbarComponents() {
  return (
    <>
      <Navbar variant="dark">
        <Container>
          <Navbar.Brand href="#home">Kasir App</Navbar.Brand>
          <Nav className="me-auto d-flex text-light gap-2">
            <NavLink to="/" style={{ textDecoration: 'none' }} className="nav-link">
              Home
            </NavLink>
            <NavLink to="/pesanan" style={{ textDecoration: 'none' }} className="nav-link">
              Pesanan
            </NavLink>
            <NavLink to="/testing" style={{ textDecoration: 'none' }} className="nav-link">
              Testing
            </NavLink>
            <NavLink to="/sukses" style={{ textDecoration: 'none' }} className="nav-link">
              Sukses
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
