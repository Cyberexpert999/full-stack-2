import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BooksList.css';

const BooksList = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: 1925,
      genre: "Classic",
      pages: 180,
      rating: 4.5,
      price: 12.99,
      description: "Set in the Jazz Age on Long Island, this novel explores themes of wealth, love, and the American Dream.",
      cover: "📚",
      available: true
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      year: 1960,
      genre: "Fiction",
      pages: 281,
      rating: 4.8,
      price: 14.99,
      description: "A classic of modern American literature, exploring racial injustice and moral growth.",
      cover: "📖",
      available: true
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      year: 1949,
      genre: "Science Fiction",
      pages: 328,
      rating: 4.7,
      price: 13.99,
      description: "A dystopian novel set in a totalitarian society.",
      cover: "🔮",
      available: false
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      year: 1813,
      genre: "Romance",
      pages: 279,
      rating: 4.6,
      price: 11.99,
      description: "A romantic novel following the emotional development of Elizabeth Bennet.",
      cover: "💝",
      available: true
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      year: 1937,
      genre: "Fantasy",
      pages: 310,
      rating: 4.9,
      price: 15.99,
      description: "A fantasy novel about the journey of Bilbo Baggins.",
      cover: "🐉",
      available: true
    },
    {
      id: 6,
      title: "Dune",
      author: "Frank Herbert",
      year: 1965,
      genre: "Science Fiction",
      pages: 412,
      rating: 4.8,
      price: 16.99,
      description: "Set in the distant future amidst a sprawling feudal interstellar empire.",
      cover: "🏜️",
      available: true
    },
    {
      id: 7,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      year: 1951,
      genre: "Classic",
      pages: 234,
      rating: 4.3,
      price: 12.99,
      description: "The story of Holden Caulfield's teenage angst and alienation.",
      cover: "🌾",
      available: true
    },
    {
      id: 8,
      title: "The Alchemist",
      author: "Paulo Coelho",
      year: 1988,
      genre: "Fiction",
      pages: 208,
      rating: 4.7,
      price: 13.99,
      description: "A philosophical novel about a young Andalusian shepherd's journey to Egypt.",
      cover: "⚱️",
      available: false
    }
  ];

  const genres = ['all', ...new Set(books.map(book => book.genre))];

  const filteredBooks = books.filter(book => {
    const matchesGenre = filter === 'all' || book.genre === filter;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="books-page">
      {/* Header Section */}
      <div className="books-header">
        <h1 className="page-title">Discover Books</h1>
        <p className="page-subtitle">Explore our curated collection of {books.length} amazing books</p>
      </div>

      {/* Search and Filter Section */}
      <div className="filter-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="genre-filters">
          {genres.map(genre => (
            <button
              key={genre}
              className={`genre-btn ${filter === genre ? 'active' : ''}`}
              onClick={() => setFilter(genre)}
            >
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="books-grid-modern">
        {filteredBooks.map(book => (
          <Link to={`/book/${book.id}`} key={book.id} className="book-card-link">
            <div className="book-card-modern">
              <div className="book-card-inner">
                <div className="book-card-front">
                  <div className="book-cover-modern">
                    <span className="book-emoji">{book.cover}</span>
                    {!book.available && (
                      <div className="out-of-stock-badge">Out of Stock</div>
                    )}
                  </div>
                  <div className="book-info-modern">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author-modern">by {book.author}</p>
                    <div className="book-meta">
                      <span className="book-year">{book.year}</span>
                      <span className="book-genre-modern">{book.genre}</span>
                    </div>
                    <div className="book-rating">
                      <span className="stars">{'⭐'.repeat(Math.floor(book.rating))}</span>
                      <span className="rating-number">{book.rating}</span>
                    </div>
                    <div className="book-price">${book.price}</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="no-results">
          <p>No books found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default BooksList;