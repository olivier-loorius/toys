import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { useAuth } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement de l'application...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="main-content">
        {user && <Dashboard />}
      </main>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 