import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import BooksList from './components/BooksList';
import BookDetails from './components/BookDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
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

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BooksList />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;