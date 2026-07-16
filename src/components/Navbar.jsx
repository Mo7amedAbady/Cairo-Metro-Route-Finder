import React from 'react';
import { Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

function Navbar() {
  const { t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/5 px-4 lg:px-8 py-3 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-tr from-blue-600 to-emerald-500 p-2 rounded-xl text-white shadow-lg shadow-blue-500/10">
          <Activity className="h-5 w-5 animate-pulse" />
        </div>
        <div>
          <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
            {t('logo_name')}
          </span>
          <span className="ms-1.5 text-[10px] font-semibold bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
            v1.0
          </span>
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center gap-3">
        <LanguageToggle />
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 flex items-center justify-center"
          aria-label={t('github_tooltip')}
          title={t('github_tooltip')}
        >
          <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
