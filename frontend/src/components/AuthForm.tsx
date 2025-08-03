import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { t, getError } from '../utils/i18n';

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthForm: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    // Validation de base
    if (!formData.email || !formData.password) {
      setErrorMessage(getError('auth.validation.emailAndPasswordRequired'));
      return false;
    }

    // Validation spécifique à l'inscription
    if (!isLoginMode) {
      if (!formData.nom || !formData.prenom) {
        setErrorMessage(getError('auth.validation.nomAndPrenomRequired'));
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage(getError('auth.validation.passwordMismatch'));
        return false;
      }
      
      if (formData.password.length < 6) {
        setErrorMessage(getError('auth.validation.passwordTooShort'));
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      if (isLoginMode) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password, formData.nom, formData.prenom);
      }
    } catch (error) {
      setErrorMessage(getError('auth.generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrorMessage('');
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    resetForm();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-6">
          <h2 className="text-3xl mb-2">
            {isLoginMode ? t('auth.login.title') : t('auth.register.title')}
          </h2>
          <p className="lead">
            {isLoginMode ? t('auth.login.subtitle') : t('auth.register.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}

          {/* Champs nom et prénom (inscription uniquement) */}
          {!isLoginMode && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="prenom" className="form-label">
                  {t('auth.fields.prenom')} *
                </label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  required
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder={t('auth.placeholders.prenom')}
                  autoComplete="given-name"
                />
              </div>
              <div>
                <label htmlFor="nom" className="form-label">
                  {t('auth.fields.nom')} *
                </label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  required
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder={t('auth.placeholders.nom')}
                  autoComplete="family-name"
                />
              </div>
            </div>
          )}

          {/* Champ email */}
          <div>
            <label htmlFor="email" className="form-label">
              {t('auth.fields.email')} *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder={t('auth.placeholders.email')}
              autoComplete="email"
            />
          </div>

          {/* Champ mot de passe */}
          <div>
            <label htmlFor="password" className="form-label">
              {t('auth.fields.password')} *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              placeholder={t('auth.placeholders.password')}
              autoComplete={isLoginMode ? "current-password" : "new-password"}
            />
          </div>

          {/* Champ confirmation mot de passe (inscription uniquement) */}
          {!isLoginMode && (
            <div>
              <label htmlFor="confirmPassword" className="form-label">
                {t('auth.fields.confirmPassword')} *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-input"
                placeholder={t('auth.placeholders.password')}
                autoComplete="new-password"
              />
            </div>
          )}

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? (
              <>
                <span className="spinner mr-2"></span>
                {t('auth.buttons.loading')}
              </>
            ) : (
              isLoginMode ? t('auth.login.submit') : t('auth.register.submit')
            )}
          </button>

          {/* Bouton de basculement mode */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={toggleMode}
              className="btn btn--secondary"
            >
              {isLoginMode ? t('auth.buttons.switchToRegister') : t('auth.buttons.switchToLogin')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm; 