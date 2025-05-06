import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle admin login
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    // Mock authentication
    if (email === "admin@example.com" && password === "admin123") {
      navigate("/admin"); // Navigate to admin page upon successful login
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div
      className="container mt-5"
      style={{
        backgroundColor: "lightblue",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="d-flex justify-content-center">
        <div className="card shadow-lg" style={{ width: "400px" }}>
          <div className="card-body">
            <h2 className="card-title text-center">Admin Login</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary w-50">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
