import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const NavbarComponent = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleAdmin = () => {
    navigate("/adminlogin");
  };
  

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/login">Sivagami Traders</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#" className="d-flex align-items-center">
              <FaUserCircle size={20} className="me-2" />
              {user?.email || "Guest"}
            </Nav.Link>
            {user ? (
              <>
                <Button
                  variant="outline-light"
                  onClick={handleAdmin}
                  className="ms-3"
                >
                  Admin
                </Button>
                <Button
                  variant="outline-light"
                  onClick={handleLogout}
                  className="ms-3"
                >
                  Logout
                </Button>
              </>
            ) : location.pathname === "/login" ? (
              <>
                <Button
                  variant="outline-light"
                  onClick={handleSignUp}
                  className="ms-3"
                >
                  Sign Up
                </Button>
                <Button
                  variant="outline-light"
                  onClick={handleAdmin}
                  className="ms-3"
                >
                  Admin
                </Button>
              </>
            ) : location.pathname === "/signup" ? (
              <>
                <Button
                  variant="outline-light"
                  onClick={handleLogin}
                  className="ms-3"
                >
                  Login
                </Button>
                <Button
                  variant="outline-light"
                  onClick={handleAdmin}
                  className="ms-3"
                >
                  Admin
                </Button>
              </>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
