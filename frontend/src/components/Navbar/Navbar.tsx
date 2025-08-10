import React, { useState } from 'react';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Niveau 1 : Logo + Recherche + Actions */}
      <div className="nav-level-1">
        <div className="nav-container">
          {/* Logo */}
          <a href="/" className="logo">
            <img src="/images/BTLogo.png" alt="BT Logo" />
          </a>

          {/* Actions principales avec icônes SVG modernes */}
          <div className="actions">
            <button type="button" title="Favoris" className="action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button type="button" title="Panier" className="action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </button>
            <button type="button" title="Profil" className="action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>

            {/* Barre de recherche classique */}
            <div className="search">
              <input
                type="text"
                placeholder="Rechercher des jouets..."
              />
              <button type="button" className="search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Menu hamburger pour mobile */}
          <button
            className="hamburger"
            onClick={toggleMobileMenu}
            title="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Niveau 2 : Navigation principale */}
      <div className="nav-level-2">
        <div className="nav-container">
          <ul className="nav-links">
            <li><a href="/nouveautes">Nouveautés</a></li>
            <li><a href="/best-sellers">Best-sellers</a></li>
            <li><a href="/categories">Catégories</a></li>
            <li><a href="/promotions">Promotions</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Menu mobile avec navigation + recherche */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-search">
          <input
            type="text"
            placeholder="Rechercher des jouets..."
          />
        </div>
        <ul className="mobile-nav">
          <li><a href="/nouveautes">Nouveautés</a></li>
          <li><a href="/best-sellers">Best-sellers</a></li>
          <li><a href="/categories">Catégories</a></li>
          <li><a href="/promotions">Promotions</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
