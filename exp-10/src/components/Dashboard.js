import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button, Card, Row, Col } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle Logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout Error: ", err);
    }
  };

  // Track Mouse Movement for Interactive Background
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top"
        style={{ boxShadow: "0px 4px 10px rgba(0,0,0,0.4)" }}
      >
        <Container>
          <Navbar.Brand href="/dashboard" className="fw-bold text-light">
            Sivagami Traders
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center flex-grow-1 justify-content-center">
              <Nav.Link href="/product" className="text-light fw-semibold mx-2">
                Product
              </Nav.Link>
              <Nav.Link href="/ohistory" className="text-light fw-semibold mx-2">
                Order History
              </Nav.Link>
              <Nav.Link href="/aboutus" className="text-light fw-semibold mx-2">
                About Us
              </Nav.Link>
              <Nav.Link href="/contactus" className="text-light fw-semibold mx-2">
                Contact Us
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto align-items-center">
              <Nav.Link href="#" className="d-flex align-items-center text-light fw-semibold">
                <FaUserCircle size={22} className="me-2" />
                {user?.email || user?.displayName}
              </Nav.Link>
              <Button
                variant="outline-light"
                onClick={handleLogout}
                className="ms-3"
                style={{
                  transition: "all 0.3s ease-in-out",
                  borderColor: "#fff",
                  fontWeight: "600",
                  padding: "8px 16px",
                }}
              >
                <FaSignOutAlt className="me-1" /> Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ background: "linear-gradient(135deg, #1e3a8a, #1e40af)" }}
        animate={{
          background: [
            "linear-gradient(135deg, #1e3a8a, #1e40af)",
            "linear-gradient(135deg, #4f46e5, #9333ea)",
            "linear-gradient(135deg, #1e40af, #3b82f6)",
            "linear-gradient(135deg, #9333ea, #1e3a8a)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          minHeight: "100vh",
          position: "fixed",
          width: "100%",
        }}
      />

      {/* Interactive Particles */}
      <motion.div
        className="absolute -z-10 w-full h-full"
        animate={{
          x: mousePosition.x / 30,
          y: mousePosition.y / 30,
        }}
        transition={{ type: "tween", stiffness: 100 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-30"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * 100}vh`,
            }}
            animate={{
              y: ["0%", "100%", "0%"],
              x: ["0%", "50%", "0%"],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <div
        className="dashboard-container d-flex align-items-center justify-content-center vh-100"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Card
                className="text-center shadow-lg"
                style={{
                  borderRadius: "15px",
                  padding: "25px",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <FaUserCircle size={80} className="mb-3 text-light" />
                  <Card.Title className="mb-3 fw-bold" style={{ fontSize: "22px" }}>
                    Welcome, {user?.email || user?.displayName}!
                  </Card.Title>
                  <Card.Text style={{ fontSize: "15px", color: "#f8f9fa", opacity: "0.9" }}>
  This is {user?.email || user?.displayName}'s dashboard.<br />
  You can add more components here to display.
</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/profile")}
                    style={{
                      fontSize: "16px",
                      padding: "10px 20px",
                      transition: "all 0.3s ease-in-out",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      boxShadow: "0px 4px 10px rgba(0, 191, 255, 0.4)",
                    }}
                  >
                    Go to Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
