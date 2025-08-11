import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './AuthForm.scss';

interface AuthFormProps {
  isOpen: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isOpen }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // Rafraîchir les champs après soumission
    setEmail('');
    setPassword('');
  };

  if (!isOpen) return null;

  return (
    <div className="auth-form-container">
      <div className="auth-content">
        <h2 className="auth-title">{t('auth.title')}</h2>

        <form onSubmit={handleSubmit} className="auth-form" autoComplete="new-password">
          <div className="form-group">
            <input
              type="text"
              name="login_email_field"
              placeholder={t('auth.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="new-password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-lpignore="true"
              data-form-type="other"
              data-1p-ignore="true"
              data-bwignore="true"
            />
          </div>

          <div className="form-group password-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="login_password_field"
              placeholder={t('auth.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-lpignore="true"
              data-form-type="other"
              data-1p-ignore="true"
              data-bwignore="true"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </>
                )}
              </svg>
            </button>
          </div>

          <button type="submit" className="auth-submit-btn">
            {t('auth.login')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
