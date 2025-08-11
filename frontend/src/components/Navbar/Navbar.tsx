import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import AuthForm from '../AuthForm/AuthForm';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isAuthFormOpen, setIsAuthFormOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setIsMobileSearchOpen(false);
    }
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
  };

  const toggleAuthForm = () => {
    setIsAuthFormOpen(!isAuthFormOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-level-1">
        <div className="nav-container">
          <a href="/" className="logo">
            <img src="/images/BTLogoMono.png" alt={t('navbar.logoAlt')} />
          </a>

          <div className="actions">
            <button type="button" title={t('navbar.favorites')} className="action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button type="button" title={t('navbar.cart')} className="action-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </button>
            <button type="button" title={t('navbar.profile')} className="action-btn" onClick={toggleAuthForm}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>

            <div className="search">
              <input type="text" placeholder={t('navbar.searchPlaceholder')} />
              <button type="button" className="search-icon" title={t('navbar.searchButton')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </button>
            </div>

            <button 
              type="button" 
              className="mobile-search-btn" 
              title={t('navbar.searchButton')} 
              onClick={toggleMobileSearch}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            <button className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu} title={t('navbar.menu')}>
              <div className="hamburger-lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="nav-level-2">
        <div className="nav-container">
          <ul className="nav-links">
            <li><a href="/nouveautes">{t('navbar.navigation.nouveautes')}</a></li>
            <li><a href="/best-sellers">{t('navbar.navigation.bestSellers')}</a></li>
            <li><a href="/categories">{t('navbar.navigation.categories')}</a></li>
            <li><a href="/lingerie">{t('navbar.navigation.lingerie')}</a></li>
            <li><a href="/accessoires">{t('navbar.navigation.accessoires')}</a></li>
            <li><a href="/idees-cadeaux">{t('navbar.navigation.ideesCadeaux')}</a></li>
            <li><a href="/promotions">{t('navbar.navigation.promotions')}</a></li>
          </ul>
        </div>
      </div>
      {isMobileSearchOpen && !isMobileMenuOpen && (
        <div className="mobile-search-standalone">
          <input type="text" placeholder={t('navbar.searchPlaceholder')} autoFocus />
        </div>
      )}

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-content">
          <div className="mobile-header">
            <div className="mobile-logo">
              <img src="/images/BTLogoMono.png" alt={t('navbar.logoAlt')} />
            </div>
            <button className="close-btn" onClick={toggleMobileMenu} title={t('navbar.close')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <div className="mobile-actions">
            <button type="button" title={t('navbar.favorites')} className="mobile-action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button type="button" title={t('navbar.cart')} className="mobile-action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </button>
            <button type="button" title={t('navbar.profile')} className="mobile-action-btn" onClick={toggleAuthForm}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          </div>

          {/* Champ de recherche dans le menu mobile ouvert */}
          {isMobileSearchOpen && isMobileMenuOpen && (
            <div className="mobile-search">
              <input type="text" placeholder={t('navbar.searchPlaceholder')} autoFocus />
            </div>
          )}

          <ul className="mobile-nav">
            <li><a href="/nouveautes">{t('navbar.navigation.nouveautes')}</a></li>
            <li><a href="/best-sellers">{t('navbar.navigation.bestSellers')}</a></li>
            <li><a href="/categories">{t('navbar.navigation.categories')}</a></li>
            <li><a href="/lingerie">{t('navbar.navigation.lingerie')}</a></li>
            <li><a href="/accessoires">{t('navbar.navigation.accessoires')}</a></li>
            <li><a href="/idees-cadeaux">{t('navbar.navigation.ideesCadeaux')}</a></li>
            <li><a href="/promotions">{t('navbar.navigation.promotions')}</a></li>
          </ul>
        </div>
      </div>

      {/* Formulaire d'authentification */}
      <AuthForm isOpen={isAuthFormOpen} />
    </nav>
  );
};

export default Navbar;
