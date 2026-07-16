import React from 'react';
import { motion } from 'framer-motion';
import { Train, ArrowRight, Zap, RefreshCw, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function Hero() {
  const { t } = useLanguage();

  const handleScrollToSearch = () => {
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Decorative radial glows */}
      <div className="absolute top-0 end-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 start-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <motion.div 
          className="flex flex-col items-center justify-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero text section */}
          <div className="max-w-4xl text-center">
            <motion.div 
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full mb-6"
              variants={itemVariants}
            >
              <Train className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-semibold text-blue-300 tracking-wide uppercase">{t('cairo_transit_hub')}</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight"
              variants={itemVariants}
            >
              {t('hero_title_1')} <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-400">
                {t('hero_title_2')}
              </span>
            </motion.h1>

            <motion.p 
              className="text-slate-400 text-lg max-w-3xl mx-auto mb-8 leading-relaxed"
              variants={itemVariants}
            >
              {t('hero_desc')}
            </motion.p>

            <motion.div 
              className="flex justify-center mb-10"
              variants={itemVariants}
            >
              <button 
                onClick={handleScrollToSearch}
                className="group inline-flex items-center gap-2 bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer"
              >
                <span>{t('start_planning')}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform duration-200" />
              </button>
            </motion.div>

            {/* Badges/Stats section */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/5 pt-8 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-1.5 bg-red-500/15 border border-red-500/20 rounded-lg text-red-400 mt-0.5">
                  <Zap className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{t('shortest_path')}</h4>
                  <p className="text-[10px] text-slate-400">{t('calculated_via_bfs')}</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-1.5 bg-blue-500/15 border border-blue-500/20 rounded-lg text-blue-400 mt-0.5">
                  <RefreshCw className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{t('transfer_station')}</h4>
                  <p className="text-[10px] text-slate-400">{t('optimal_lines_swap')}</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-3">
                <div className="p-1.5 bg-emerald-500/15 border border-emerald-500/20 rounded-lg text-emerald-400 mt-0.5">
                  <Compass className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{t('easy_planning')}</h4>
                  <p className="text-[10px] text-slate-400">{t('visual_station_timeline')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
