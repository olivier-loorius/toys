import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-light dark:bg-dark transition-colors duration-300">
      {/* Header/Navigation */}
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
              {/* Theme toggle sera ajouté ici */}
              {user && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Bonjour, {user.prenom}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                MonApp
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Application moderne de gestion d'utilisateurs construite avec React, TypeScript et Supabase.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                Liens rapides
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
                Contact
              </h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>contact@monapp.com</li>
                <li>+33 1 23 45 67 89</li>
                <li>Paris, France</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-600 dark:text-gray-400">
              © 2024 MonApp. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 