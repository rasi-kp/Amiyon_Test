import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; 

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="container my-1 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fs-4">Welcome Admin Dashboard</h1>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-1" /> Logout
          </button>
        </div>
        <hr />
        <div className="d-flex justify-content-center align-items-center">
          <div className="text-center ">
            <NavLink to="/company" className="btn btn-outline-dark btn-primary m-2">
              Manage Company
            </NavLink>
          </div>
          <div className="text-center">
            <NavLink to="/employee" className="btn btn-outline-dark btn-primary m-2">
              Manage Employee
            </NavLink>
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;
