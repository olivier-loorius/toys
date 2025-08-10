import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { t, getError } from '../utils/i18n';
import './AuthForm.scss';

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
    if (!formData.email || !formData.password) {
      setErrorMessage(getError('auth.validation.emailAndPasswordRequired'));
      return false;
    }

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
        <div className="auth-header">
          <h1>{isLoginMode ? t('auth.login.title') : t('auth.register.title')}</h1>
          <p>{isLoginMode ? t('auth.login.subtitle') : t('auth.register.subtitle')}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLoginMode && (
            <>
              <div className="form-group">
                <label className="form-label">{t('auth.fields.nom')}</label>
                <input
                  type="text"
                  name="nom"
                  className="form-input"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{t('auth.fields.prenom')}</label>
                <input
                  type="text"
                  name="prenom"
                  className="form-input"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">{t('auth.fields.email')}</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('auth.fields.password')}</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          {!isLoginMode && (
            <div className="form-group">
              <label className="form-label">{t('auth.fields.confirmPassword')}</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          )}

          {errorMessage && (
            <div className="form-error">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('common.loading') : (isLoginMode ? t('auth.login.submit') : t('auth.register.submit'))}
          </button>
        </form>

        <div className="auth-toggle">
          <button
            type="button"
            className="btn-secondary"
            onClick={toggleMode}
          >
            {isLoginMode ? t('auth.login.switchToRegister') : t('auth.register.switchToLogin')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm; 