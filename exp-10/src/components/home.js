import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout Error: ", err);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/dashboard">Sivagami Traders</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center flex-grow-1 justify-content-center">
              <Nav.Link href="/product" className="text-light">
                Product
              </Nav.Link>
              <Nav.Link href="/ohistory" className="text-light">
                Order Arrivals
              </Nav.Link>
              <Nav.Link href="/aboutus" className="text-light">
                About Us
              </Nav.Link>
              <Nav.Link href="/contactus" className="text-light">
                Contact Us
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto align-items-center">
              <Nav.Link href="#" className="d-flex align-items-center">
                <FaUserCircle size={20} className="me-2" />
                {user?.email || user?.displayName}
              </Nav.Link>
              <Button variant="outline-light" onClick={handleLogout} className="ms-3">
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Home;