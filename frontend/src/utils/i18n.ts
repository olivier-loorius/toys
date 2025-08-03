import fr from '../locales/fr.json';
import errors from '../locales/errors.json';

// Type pour les traductions
type Translations = typeof fr;
type Errors = typeof errors;

// Fonction pour récupérer un texte depuis fr.json
export const t = (key: string): string => {
  const keys = key.split('.');
  let value: any = fr;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Clé de traduction manquante: ${key}`);
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
};

// Fonction pour récupérer un message d'erreur
export const getError = (key: string): string => {
  const keys = key.split('.');
  let value: any = errors;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Clé d'erreur manquante: ${key}`);
      return 'Une erreur est survenue';
    }
  }
  
  return typeof value === 'string' ? value : 'Une erreur est survenue';
};

// Fonction pour remplacer des variables dans les messages
export const formatMessage = (message: string, variables: Record<string, string | number>): string => {
  let formattedMessage = message;
  
  Object.entries(variables).forEach(([key, value]) => {
    formattedMessage = formattedMessage.replace(new RegExp(`{${key}}`, 'g'), String(value));
  });
  
  return formattedMessage;
};

// Export des types pour TypeScript
export type { Translations, Errors }; 