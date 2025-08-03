import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-2xl font-anton text-primary">
              {user ? 'Dashboard' : 'MonApp'}
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {user ? (
              <>
                <a href="#dashboard" className="nav-link">Tableau de bord</a>
                <a href="#profile" className="nav-link">Profil</a>
                <a href="#settings" className="nav-link">Paramètres</a>
              </>
            ) : (
              <>
                <a href="#home" className="nav-link">Accueil</a>
                <a href="#about" className="nav-link">À propos</a>
                <a href="#contact" className="nav-link">Contact</a>
              </>
            )}
          </nav>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Bonjour, {user.prenom}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 