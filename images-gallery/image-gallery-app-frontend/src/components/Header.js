import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "../css/Header.css";
import { ReactComponent as Logo } from "../Images/logo.svg";

const Header = ({ title }) => {
  return (
    <Navbar
      data-bs-theme="light"
      className="px-4 py-2 custom-navbar"
      variant={undefined}
    >
      <Container className="justify-content-center">
        <Logo alt={title} style={{ maxWidth: "30rem", maxHeight: "4rem" }} />
      </Container>
    </Navbar>
  );
};

export default Header;
