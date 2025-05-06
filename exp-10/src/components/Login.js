import React, { useState } from "react"; 
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleSignIn } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error: ", err);
      setError(err.message || "Failed to log in.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (err) {
      console.error("Error during Google Sign-In: ", err.message);
      setError(err.message || "Google Sign-In failed. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-900 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-gray-800 backdrop-blur-lg shadow-2xl rounded-xl p-8 text-white border border-gray-600"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-100">Login</h2>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={{
                boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.3)",
                transition: "all 0.3s ease-in-out",
              }}
            />
          </div>
          <div className="relative">
            <input
              type="password"
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{
                boxShadow: "0px 4px 10px rgba(99, 102, 241, 0.3)",
                transition: "all 0.3s ease-in-out",
              }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(0, 191, 255, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-all duration-300 transform shadow-lg"
            style={{
              transition: "all 0.3s ease-in-out",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Login
          </motion.button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p>Or login with</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoogleSignIn}
          className="w-full mt-3 flex items-center justify-center bg-gray-200 text-gray-800 py-2.5 rounded-lg shadow-md transition duration-300 transform hover:bg-gray-300"
          style={{
            backgroundColor: "white",
            color: "#333",
            fontWeight: "500",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <img
            src="https://www.shareicon.net/data/512x512/2016/07/10/119930_google_512x512.png"
            alt="Google Logo"
            className="w-6 h-6 mr-2"
          />
          Google Sign-In
        </motion.button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:text-indigo-500 transition duration-300">
            Sign up here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
