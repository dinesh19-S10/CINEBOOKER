import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { translations } from '../translations';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, options?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
  };

  const t = useCallback((key: string, options?: Record<string, string | number>): string => {
    let text = translations[language]?.[key] || translations['en'][key] || key;
    if (options) {
      Object.keys(options).forEach(optKey => {
        text = text.replace(`{${optKey}}`, String(options[optKey]));
      });
    }
    return text;
  }, [language]);

  const value = { language, setLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
