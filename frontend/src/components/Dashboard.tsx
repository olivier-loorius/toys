import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../utils/i18n';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="loading-message">
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <h1>{t('dashboard.title')}</h1>
          <p>{t('dashboard.welcome')} {user.prenom} !</p>
        </div>

        <div className="dashboard-content">
          <div className="user-info">
            <h2>{t('dashboard.userInfo')}</h2>
            <div className="info-list">
              <div className="info-item">
                <span className="label">{t('dashboard.fields.fullName')} :</span>
                <span className="value">{user.prenom} {user.nom}</span>
              </div>
              <div className="info-item">
                <span className="label">{t('dashboard.fields.email')} :</span>
                <span className="value">{user.email}</span>
              </div>
              <div className="info-item">
                <span className="label">{t('dashboard.fields.memberSince')} :</span>
                <span className="value">{formatDate(user.created_at)}</span>
              </div>
            </div>
          </div>

          <button onClick={handleLogout} className="btn-primary">
            {t('auth.logout')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 