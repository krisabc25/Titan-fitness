import React from 'react';
import '../styles/Header.css';

const Header = ({ isLoggedIn, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <span className="logo-icon">💪</span>
          <span className="logo-text">Titan Fitness</span>
        </div>

        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="/" className="nav-link">Home</a>
          <a href="/features" className="nav-link">Features</a>
          {isLoggedIn ? (
            <>
              <a href="/dashboard" className="nav-link">Dashboard</a>
              <a href="/progress" className="nav-link">Progress</a>
              <button onClick={onLogout} className="nav-link logout-btn">Logout</button>
            </>
          ) : (
            <>
              <a href="/login" className="nav-link">Login</a>
              <a href="/register" className="btn btn-primary">Sign Up</a>
            </>
          )}
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
