import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Next</h1>
          <h1 className="hero-title-accent">Great Read</h1>
          <p className="hero-subtitle">Explore thousands of books from classic literature to modern bestsellers</p>
          <Link to="/books" className="cta-button">Books Collection →</Link>
        </div>
        <div className="hero-image">
          <div className="floating-book">📚</div>
          <div className="floating-book-small">📖</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Book Lovers Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Vast Collection</h3>
            <p>Over 10,000+ books across all genres, from classics to the latest releases</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>Free worldwide shipping on all orders over $25</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Reader Reviews</h3>
            <p>Authentic reviews from real readers to help you choose</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💫</div>
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer service for all your queries</p>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="categories-section">
        <h2 className="section-title">Popular Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <span className="category-emoji">🔮</span>
            <h4>Science Fiction</h4>
          </div>
          <div className="category-card">
            <span className="category-emoji">💝</span>
            <h4>Romance</h4>
          </div>
          <div className="category-card">
            <span className="category-emoji">🔍</span>
            <h4>Mystery</h4>
          </div>
          <div className="category-card">
            <span className="category-emoji">🐉</span>
            <h4>Fantasy</h4>
          </div>
          <div className="category-card">
            <span className="category-emoji">📜</span>
            <h4>Classics</h4>
          </div>
          <div className="category-card">
            <span className="category-emoji">💼</span>
            <h4>Business</h4>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Books</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5K+</span>
            <span className="stat-label">Happy Readers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Genres</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support</span>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <h2>Stay Updated with New Arrivals</h2>
          <p>Subscribe to our newsletter and get 10% off your first purchase</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;