import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, stationTranslations } from '../utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', language);
    // Apply lang and dir attribute to HTML root
    const root = document.documentElement;
    if (language === 'ar') {
      root.dir = 'rtl';
      root.lang = 'ar';
    } else {
      root.dir = 'ltr';
      root.lang = 'en';
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const tStation = (stationName) => {
    if (!stationName) return '';
    return stationTranslations[stationName] && language === 'ar'
      ? stationTranslations[stationName]
      : stationName;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, tStation, isRTL: language === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
export default LanguageContext;
