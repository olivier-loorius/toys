import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../utils/i18n';

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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        {/* En-tête du dashboard */}
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">{t('dashboard.title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('dashboard.welcome')} {t('dashboard.subtitle')}
          </p>
        </div>

        {/* Informations utilisateur */}
        <div className="grid-layout">
          {/* Carte d'accueil */}
          <div className="gradient-card">
            <h2 className="text-2xl mb-2">{t('dashboard.greeting')} {user.prenom} !</h2>
            <p className="text-lg opacity-90">
              {t('dashboard.greetingSubtitle')}
            </p>
          </div>

          {/* Informations personnelles */}
          <div className="info-card">
            <h3 className="text-xl mb-4">{t('dashboard.userInfo')}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">{t('dashboard.fields.fullName')} :</span>
                <span>{user.prenom} {user.nom}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t('dashboard.fields.email')} :</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t('dashboard.fields.memberSince')} :</span>
                <span>{formatDate(user.created_at)}</span>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="info-card">
            <h3 className="text-xl mb-4">{t('dashboard.stats')}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">{t('dashboard.fields.userId')} :</span>
                <span className="text-sm font-mono">{user.id.slice(0, 8)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{t('dashboard.fields.status')} :</span>
                <span className="text-green-600 dark:text-green-400">{t('dashboard.status.active')}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="info-card">
            <h3 className="text-xl mb-4">{t('dashboard.actions')}</h3>
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full p-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                {t('dashboard.logout')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 