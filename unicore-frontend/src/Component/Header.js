// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const history = useNavigate();

  const handleClkLogo = () => {
    history('/');
  }
  return (
    <header className='MainHomeHeader'>
      <button onClick={handleClkLogo} className="Homelogo">UNICORE</button>
      {/* <div className="logo">UNICORE</div> */}
      <nav className='HomeNav'>
        <a href="#about">About Us</a>
        <a href="#contact">Contact Us</a>
      </nav>
    </header>
  );
}

export default Header;
