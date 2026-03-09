import React from 'react';
import { useParams, Link } from 'react-router-dom';
import booksData from '../Data/booksData';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const book = booksData.find(b => b.id === parseInt(id));

  if (!book) {
    return (
      <div className="book-details-container">
        <h2>Book not found</h2>
        <Link to="/books" className="back-button">Back to Books List</Link>
      </div>
    );
  }

  return (
    <div className="book-details-container">
      <div className="book-details-card">
        <Link to="/books" className="back-button">← Back to Books List</Link>
        <div className="book-details-header">
          <div className="book-details-cover">{book.cover}</div>
          <div className="book-details-title">
            <h1>{book.title}</h1>
            <h2>by {book.author}</h2>
          </div>
        </div>
        
        <div className="book-details-info">
          <div className="info-grid">
            <div className="info-item">
              <strong>Published Year:</strong>
              <span>{book.year}</span>
            </div>
            <div className="info-item">
              <strong>Genre:</strong>
              <span>{book.genre}</span>
            </div>
            <div className="info-item">
              <strong>Pages:</strong>
              <span>{book.pages}</span>
            </div>
          </div>
          
          <div className="book-description">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;