import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Milestone, ArrowRight, Shuffle, Info, Circle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function DisplayStations({ Path = [] }) {
  const { t, tStation, language } = useLanguage();

  // Check if we have a valid path calculated
  const isValidPath = Path && Path.length > 0 && Path[0].S !== undefined;

  if (!isValidPath) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-950/20 rounded-2xl border border-white/5 min-h-[220px]">
        <div className="p-3 bg-slate-900 border border-white/5 rounded-full mb-3 text-slate-400 animate-float">
          <Milestone className="h-6 w-6 text-blue-400" />
        </div>
        <h4 className="text-slate-300 font-semibold text-sm mb-1.5">{t('no_route_selected')}</h4>
        <p className="text-xs text-slate-500 max-w-[280px] leading-relaxed">
          {t('no_route_selected_desc')}
        </p>
      </div>
    );
  }

  // Calculate estimated time (~2.2 minutes per station spacing)
  const estTimeMinutes = Math.max(Path.length * 2, 2);

  // Calculate transfers (interchanges in path)
  const transfersCount = Path.filter((station, index) => {
    // Only count TS (transfer station) if it's not the first or last station
    return ((index) && (index<Path.length) && (Path[index-1].L != Path[index].L));
  }).length;

  const getLineDetails = (lineCode) => {
    switch (lineCode) {
      case 'L2':
        return { name: t('line_2'), bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20', dot: 'bg-red-500' };
      case 'L1':
        return { name: t('line_1'), bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', dot: 'bg-blue-500' };
      case 'L3':
        return { name: t('line_3'), bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-500' };
      case 'TS':
        return { name: t('interchange_hub'), bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', dot: 'bg-amber-500' };
      default:
        return { name: t('metro_line'), bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/20', dot: 'bg-slate-500' };
    }
  };

  // Container variants for staggered child transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  // Item variants for slide-up fade-in
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex flex-col gap-6 w-full text-start">
      {/* Route Journey Summary Card */}
      <div className="bg-gradient-to-tr from-slate-900 to-slate-950 border border-white/5 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 end-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none"></div>
        
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('journey_summary')}</h3>
        
        <div className="flex items-center gap-3 mb-5 border-b border-white/5 pb-4">
          <div className="text-xs font-semibold text-slate-200 truncate max-w-[130px] sm:max-w-none">{tStation(Path[0].S)}</div>
          <ArrowRight className="h-3.5 w-3.5 text-slate-500 shrink-0 rtl:rotate-180" />
          <div className="text-xs font-semibold text-slate-200 truncate max-w-[130px] sm:max-w-none">{tStation(Path[Path.length - 1].S)}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{t('total_stops')}</span>
            <span className="text-lg font-extrabold text-white">{Path.length}</span>
          </div>
          <div className="flex flex-col border-x border-white/5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{t('duration')}</span>
            <span className="text-lg font-extrabold text-blue-400 flex items-center justify-center gap-1">
              <Clock className="h-4.5 w-4.5 text-blue-500 shrink-0" />
              <span>~{estTimeMinutes}{language === 'ar' ? ' د' : 'm'}</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{t('transfers')}</span>
            <span className={`text-lg font-extrabold ${transfersCount > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
              {transfersCount}
            </span>
          </div>
        </div>
      </div>

      {/* Transit Timeline */}
      <div className="bg-slate-950/20 border border-white/5 rounded-2xl p-5 md:p-6 shadow-xl">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">{t('route_directions')}</h3>
        
        <motion.div 
          className="flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {Path.map((station, index) => {
            const isFirst = index === 0;
            const isLast = index === Path.length - 1;
            const line = getLineDetails(station.L);
            const nextStation = !isLast ? Path[index + 1] : null;

            const isTransfer = (!isFirst && !isLast && (Path[index-1].L != Path[index].L));

            
            // Vertical connector line color
            let connectorColor = 'bg-slate-800';
            if (station.L === 'L2') connectorColor = 'bg-red-500/40';
            else if (station.L === 'L1') connectorColor = 'bg-blue-500/40';
            else if (station.L === 'L3') connectorColor = 'bg-emerald-500/40';
            else connectorColor = 'bg-amber-500/40'; 

            return (
              <motion.div 
                key={index} 
                className="flex items-stretch gap-4 relative min-h-[64px]"
                variants={itemVariants}
              >
                {/* Visual Tracker Line (Left Side in LTR, Right Side in RTL) */}
                <div className="flex flex-col items-center shrink-0 w-6">
                  {/* Station Node Indicator */}
                  <div className={`z-10 flex items-center justify-center w-5 h-5 rounded-full ${isFirst || isLast ? 'ring-4 ring-slate-900/60' : ''} bg-slate-950 border-2 ${station.L === 'L2' &&(!isTransfer) ? 'border-red-500' : station.L === 'L1' &&(!isTransfer) ? 'border-blue-500' : station.L === 'L3' &&(!isTransfer)   ? 'border-emerald-500' : 'border-amber-500'}`}>
                    {isFirst || isLast ? (
                      <span className={`w-2.5 h-2.5 rounded-full ${station.L === 'L2' &&(!isTransfer) ? 'bg-red-500' : station.L === 'L1' &&(!isTransfer) ? 'bg-blue-500' : station.L === 'L3' &&(!isTransfer) ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                    ) : (
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                    )}
                  </div>
                  
                  {/* Vertical Connector bar */}
                  {!isLast && (
                    <div className={`w-1 grow ${connectorColor} rounded-full my-1`}></div>
                  )}
                </div>

                {/* Station Card Content (Right Side in LTR, Left Side in RTL) */}
                <div className="flex-1 pb-5 flex flex-col justify-center">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className={`text-sm font-semibold tracking-wide ${isFirst || isLast ? 'text-white font-bold' : 'text-slate-300'}`}>
                        {tStation(station.S)}
                      </span>
                      {isFirst && <span className="text-[10px] text-emerald-400 font-medium">{t('departure_station_badge')}</span>}
                      {isLast && <span className="text-[10px] text-red-400 font-medium">{t('destination_station_badge')}</span>}
                    </div>

                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${line.bg} ${line.text} ${line.border}`}>
                      {line.name}
                    </span>
                  </div>

                  {/* Transfer Note helper */}
                  {isTransfer && (
                    <div className="mt-2 flex items-center gap-1.5 bg-amber-500/5 border border-amber-500/10 text-amber-400/90 text-[10px] px-2.5 py-1.5 rounded-lg">
                      <Shuffle className="h-3 w-3 shrink-0" />
                      <span>{t('transfer_to_line')} {station.L=='L1' ? '1':station.L=='L2' ? '2':'3'}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

export default DisplayStations;