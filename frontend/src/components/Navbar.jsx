import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2 sticky-top">
      <div className="container d-flex justify-content-center align-items-center">
        <img src="assets/logo.png" alt="Amiyon" className="me-2" style={{ maxHeight: '50px', width: 'auto' }} />
        <NavLink to="/" className="navbar-brand text-white fw-light fs-6">
          Amiyon Solution LL
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
