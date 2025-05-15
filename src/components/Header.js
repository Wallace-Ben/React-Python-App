import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "../css/Header.css";

const Header = ({ title }) => {
  return (
    <Navbar
      data-bs-theme="light"
      className="px-4 py-2 custom-navbar"
      variant={undefined}
    >
      <Container className="justify-content-center">
        <Navbar.Brand href="/">{title}</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
