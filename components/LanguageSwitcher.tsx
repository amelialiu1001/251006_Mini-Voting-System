import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-gray-800/50 text-white font-bold py-2 px-4 rounded-full backdrop-blur-sm hover:bg-gray-700/70 transition-colors"
      aria-label="Toggle language"
    >
      {language === 'en' ? '中' : 'EN'}
    </button>
  );
};

export default LanguageSwitcher;
