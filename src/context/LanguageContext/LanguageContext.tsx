// LanguageContext.tsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

// Définition des types pour les clés de traduction
type TranslationKey = keyof typeof translations.en;

interface Translations {
  [key: string]: {
    [key in TranslationKey]: string;
  };
}

// Traductions complètes
const translations: Translations = {
  en: {
    profileSettings: 'Profile & Settings',
    account: 'Account',
    notifications: 'Notifications',
    language: 'Language',
    help: 'Help',
    inviteFriend: 'Invite a friend',
    logout: 'Logout',
    french: 'French',
    english: 'English',
  },
  fr: {
    profileSettings: 'Profil & Paramètres',
    account: 'Compte',
    notifications: 'Notifications',
    language: 'Langue',
    help: 'Aide',
    inviteFriend: 'Inviter un ami',
    logout: 'Déconnexion',
    french: 'Français',
    english: 'Anglais',
  },
};

// Configuration i18n
i18n.translations = translations;
i18n.fallbacks = true;
i18n.defaultLocale = 'en'; // Langue par défaut en anglais

interface LanguageContextValue {
  language: string;
  setLanguage: (lang: 'fr' | 'en') => void;
  t: (key: TranslationKey) => string;
  switchLanguage: () => void;
}

const defaultContextValue: LanguageContextValue = {
  language: 'en',
  setLanguage: () => console.warn('LanguageProvider not initialized'),
  t: (key) => {
    console.warn(`Missing translation for key: ${key}`);
    return key;
  },
  switchLanguage: () => console.warn('LanguageProvider not initialized'),
};

const LanguageContext = createContext<LanguageContextValue>(defaultContextValue);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'fr' | 'en'>('en');

  useEffect(() => {
    const initLanguage = async () => {
      try {
        const locales = await Localization.getLocales();
        const deviceLanguage = locales[0]?.languageCode;
        if (deviceLanguage === 'fr') {
          setLanguage('fr');
        }
      } catch (error) {
        console.error('Language detection error:', error);
      }
    };
    initLanguage();
  }, []);

  useEffect(() => {
    i18n.locale = language;
  }, [language]);

  const t = useCallback((key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  }, [language]);

  const switchLanguage = useCallback(() => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  }, []);

  const contextValue = {
    language,
    setLanguage,
    t,
    switchLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === defaultContextValue) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};