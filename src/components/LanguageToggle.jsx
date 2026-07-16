import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-slate-900/80 hover:border-white/15 text-slate-300 hover:text-white transition-all duration-200 cursor-pointer text-xs font-bold uppercase tracking-wider shadow-md"
      title={language === 'en' ? 'Switch to Arabic / تغيير اللغة للعربية' : 'Switch to English / تغيير اللغة للإنجليزية'}
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Globe className="h-3.5 w-3.5 text-blue-400" />
      <span>{language === 'en' ? 'AR' : 'EN'}</span>
    </button>
  );
}

export default LanguageToggle;
