import React, { useState } from 'react';
import "./navbar.css"

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
              <a className="nav-link hvr-underline-from-left" href="/" style={{ color: 'white' }}>Home</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link hvr-underline-from-left" href="/" style={{ color: 'white' }}>News</a>
            </li>
            <li className="nav-item">
              <a className="nav-link hvr-underline-from-left" href="/" style={{ color: 'white' }}>Prices</a>
            </li>
            <li className="nav-item dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
              <a className="nav-link dropdown-toggle hvr-underline-from-left" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded={isDropdownOpen} style={{ color: 'white' }}>
                Transactions
              </a>
              <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown" style={{backgroundColor: "blue"}}>
                <a className="dropdown-item" href="/" style={{ color: 'black' }}>Current Transactions</a>
                <a className="dropdown-item" href="/" style={{ color: 'black' }}>Transaction Records</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link hvr-underline-from-left" href="/" style={{ color: 'white' }}>Contact</a>
            </li>
          </ul>
        </div>
        <div className="ml-auto" style={{ fontSize: '20px', fontFamily: 'Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif' }}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link hvr-underline-from-left" href="/"style={{ color: 'white' }}>Log In</a>
            </li>
            <li className="nav-item">
              <a className="nav-link hvr-underline-from-left" href="/"style={{ color: 'white', borderRadius: '10px' }}>Register</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

