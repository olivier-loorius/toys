import { useMemo } from 'react';
import fr from '../locales/fr.json';

type Locale = 'fr';

interface TranslationData {
  [key: string]: any;
}

const translations: Record<Locale, TranslationData> = {
  fr
};

export const useTranslation = (locale: Locale = 'fr') => {
  const t = useMemo(() => {
    const translation = translations[locale];
    
    return (key: string, params?: Record<string, string | number>): string => {
      const keys = key.split('.');
      let value: any = translation;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }
      
      if (typeof value !== 'string') {
        console.warn(`Translation value is not a string: ${key}`);
        return key;
      }
      
      // Replace parameters if provided
      if (params) {
        return value.replace(/\{(\w+)\}/g, (match: string, param: string) => {
          return params[param]?.toString() || match;
        });
      }
      
      return value;
    };
  }, [locale]);
  
  return { t, locale };
};
