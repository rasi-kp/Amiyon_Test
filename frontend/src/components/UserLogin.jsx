import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    try {
      const response = await login({ email, password });
      if (response.token) {
        localStorage.setItem("token", response.token);
        toast.success("Login successful!");
            navigate("/home");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred during login.");
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer />
      <div className="col-md-6 col-lg-4 mx-auto">
        <h2 className="text-center">Admin Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email<span className="text-danger"> *</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password<span className="text-danger"> *</span>
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
