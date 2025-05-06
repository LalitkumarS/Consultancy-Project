import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const ContactUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bgGradient, setBgGradient] = useState("linear-gradient(135deg, #ff9a9e, #fad0c4)");

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
    const interval = setInterval(() => {
      setBgGradient((prev) =>
        prev === "linear-gradient(135deg, #ff9a9e, #fad0c4)"
          ? "linear-gradient(135deg, #fbc2eb, #a6c1ee)"
          : "linear-gradient(135deg, #ff9a9e, #fad0c4)"
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: bgGradient,
    transition: "background 1.5s ease-in-out",
    padding: "20px",
    paddingTop: "100px", // Adjust this to match the height of your navbar
  };
  

  const containerStyle = {
    padding: "3rem",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scale(1)" : "scale(0.9)",
    transition: "all 0.8s ease-in-out",
    width: "100%",
    maxWidth: "600px",
  };

  const headingStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#ff6f61",
    textShadow: "2px 2px 10px rgba(0,0,0,0.2)",
  };

  const inputStyle = {
    borderRadius: "10px",
    border: "1px solid #ddd",
    padding: "0.9rem",
    fontSize: "1rem",
    transition: "all 0.3s ease-in-out",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
  };

  const buttonStyle = {
    padding: "0.9rem",
    fontSize: "1.2rem",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    border: "none",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease-in-out",
  };

  return (
    <div style={pageStyle}>
      <Container style={containerStyle}>
        <Row className="justify-content-center"><br></br><br></br><br></br><br></br>
          <Col>
            <h2 style={headingStyle}>Contact Us</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" style={inputStyle} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" style={inputStyle} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Enter your message" style={inputStyle} />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100" style={buttonStyle}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      
      <footer className="mt-8 bg-black text-white text-center py-4" style={{ marginTop: "20px", width: "70%" }}>
        <p>&copy; 2025 Rice Shop, All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default ContactUs;
