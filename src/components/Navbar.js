import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'black' , padding:"5px" }}>
        <a className="" href="/">
          <img src="/img/betteri.png" style={{width:"350px", height: "auto"}} className="d-inline-block align-top" alt="" />
        </a>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav" style={{ fontSize: '20px', fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>
            <li className="nav-item active">
              <Link to="/home" className="nav-link hvr-underline-from-left" style={{ color: 'white' }}>Home</Link>
            </li>
            <li className="nav-item active">
              <Link to="/news" className="nav-link hvr-underline-from-left"  style={{ color: 'white' }}>News</Link>
            </li>
            <li className="nav-item">
              <Link to="/prices" className="nav-link hvr-underline-from-left"  style={{ color: 'white' }}>Prices</Link>
            </li>
            <li className="nav-item dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
              <a className="nav-link dropdown-toggle hvr-underline-from-left" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded={isDropdownOpen} style={{ color: 'white' }}>
                Transactions
              </a>
              <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown" style={{backgroundColor: "blue"}}>
                <Link to="/ct" className="dropdown-item" href="/" style={{ color: 'black' }}>Current Transactions</Link>
                <Link to="/tr" className="dropdown-item"  style={{ color: 'black' }}>Transaction Records</Link>
              </div>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link hvr-underline-from-left" href="/" style={{ color: 'white' }}>Contact</Link>
            </li>
          </ul>
        </div>
        <div className="ml-auto" style={{ fontSize: '20px', fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/login-register" className="nav-link hvr-underline-from-left" href="/"style={{ color: 'white' }}>Log In</Link>
            </li>
            <li className="nav-item">
              <Link to="/login-register" className="nav-link hvr-underline-from-left" href="/"style={{ color: 'white', borderRadius: '10px' }}>Register</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

