import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  return (
    <div className={`nav ${show && "nav-black"}`}>
      <div className="nav-content">
        <Link to="/">
          <img className="nav-logo" src="netflix-logo.png" alt="avatar" />
        </Link>
        <Link to="/profile">
          <img
            className="nav-avatar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="nav-avatar"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
