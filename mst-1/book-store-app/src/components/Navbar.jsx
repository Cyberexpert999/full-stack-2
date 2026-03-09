import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-brand">📚 Book Store</h1>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/books" className="nav-link">Books List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;