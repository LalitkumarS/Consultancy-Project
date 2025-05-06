import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button, Card, Row, Col } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa"; // Correct import

const AdminNavbar = () => {
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
              
            <Nav.Link href="/Stock" className="text-light">
                   Stock
               </Nav.Link>

              <Nav.Link href="/admin" className="text-light">
                Order History
              </Nav.Link>
               
            </Nav>
           
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
