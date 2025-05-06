import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bgColor, setBgColor] = useState("#f8f9fa");

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300);
    const interval = setInterval(() => {
      setBgColor((prevColor) => (prevColor === "#f8f9fa" ? "#e3f2fd" : "#f8f9fa"));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const pageStyle = {
    backgroundColor: bgColor,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 2s ease-in-out",
  };

  const containerStyle = {
    textAlign: "center",
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scale(1)" : "scale(0.9)",
    transition: "all 0.8s ease-in-out",
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  };

  const headingStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#007bff",
    textShadow: "2px 2px 10px rgba(0,0,0,0.2)",
    animation: "glow 1.5s infinite alternate",
  };

  const paragraphStyle = {
    fontSize: "1.2rem",
    lineHeight: "1.6",
    color: "#555",
    transition: "color 0.5s ease-in-out",
  };

  return (
    <div style={pageStyle}>
      <Container style={containerStyle}>
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 style={headingStyle}>About Us</h2>
            <p style={paragraphStyle}>
              Welcome to <strong>Sivagami Traders</strong>, your trusted source for high-quality products
              and services. We are committed to delivering the best to our customers with integrity and
              reliability.
            </p>
            <p style={paragraphStyle}>
              Our journey started with the vision of providing top-notch products at affordable prices.
              Over the years, we have grown to become a household name for quality and customer satisfaction.
            </p>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
};

export default AboutUs;
