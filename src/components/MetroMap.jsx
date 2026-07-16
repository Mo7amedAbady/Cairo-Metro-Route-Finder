import React, { useMemo } from 'react';
import { HelpCircle, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Core coordinate mapping for the stylized SVG Cairo Metro Map
const MAP_STATIONS = [
  // Line 1 (Red)
  { id: 'Helwan', x: 140, y: 350, label: 'Helwan', line: 'L1' },
  { id: 'Maadi', x: 140, y: 300, label: 'Maadi', line: 'L1' },
  { id: 'El Malek El Saleh', x: 140, y: 250, label: 'El Malek El Saleh', line: 'L1' },
  { id: 'Sadat', x: 140, y: 190, label: 'Sadat (TS)', line: 'TS' }, // Intersection L1/L2
  { id: 'Nasser', x: 140, y: 140, label: 'Nasser (TS)', line: 'TS' }, // Intersection L1/L3
  { id: 'Al Shohadaa', x: 160, y: 90, label: 'Al Shohadaa (TS)', line: 'TS' }, // Intersection L1/L2
  { id: 'Helmeyet El Zaitoun', x: 230, y: 60, label: 'H. Zaitoun', line: 'L1' },
  { id: 'New El Marg', x: 290, y: 40, label: 'New Marg', line: 'L1' },

  // Line 2 (Blue)
  { id: 'El Moneeb', x: 50, y: 320, label: 'El Moneeb', line: 'L2' },
  { id: 'Giza', x: 70, y: 270, label: 'Giza', line: 'L2' },
  { id: 'Cairo University', x: 90, y: 220, label: 'Cairo Univ. (TS)', line: 'TS' }, // Intersection L2/L3
  { id: 'Dokki', x: 110, y: 205, label: 'Dokki', line: 'L2' },
  { id: 'Mohamed Naguib', x: 190, y: 175, label: 'M. Naguib', line: 'L2' },
  { id: 'Attaba', x: 220, y: 140, label: 'Attaba (TS)', line: 'TS' }, // Intersection L2/L3
  { id: 'Shubra El Kheima', x: 120, y: 40, label: 'Shubra', line: 'L2' },

  // Line 3 (Green)
  { id: 'Kit Kat', x: 50, y: 110, label: 'Kit Kat', line: 'L3' },
  { id: 'Safaa Hegazy', x: 90, y: 130, label: 'S. Hegazy', line: 'L3' },
  { id: 'Abbassia', x: 270, y: 145, label: 'Abbassia', line: 'L3' },
  { id: 'Heliopolis', x: 310, y: 155, label: 'Heliopolis', line: 'L3' },
  { id: 'Adly Mansour', x: 350, y: 165, label: 'Adly Mansour', line: 'L3' }
];

function MetroMap({ Path = [] }) {
  const { t, tStation, language } = useLanguage();

  // Extract set of station names in current route
  const activeStationNames = useMemo(() => {
    if (!Path || Path.length === 0 || !Path[0].S) return new Set();
    return new Set(Path.map(p => p.S));
  }, [Path]);

  // Check if a line segment is active
  const isSegmentActive = (stationIdA, stationIdB) => {
    if (activeStationNames.size === 0) return false;
    const indexA = Path.findIndex(p => p.S === stationIdA);
    const indexB = Path.findIndex(p => p.S === stationIdB);
    if (indexA === -1 || indexB === -1) return false;
    // They must be adjacent in the path
    return Math.abs(indexA - indexB) === 1;
  };

  return (
    <div className="w-full glass-panel rounded-3xl p-6 relative overflow-hidden shadow-2xl border border-white/5 flex flex-col h-full min-h-[480px] lg:min-h-[580px] text-start">
      {/* Decorative backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Map Header */}
      <div className="flex items-center justify-between mb-4 z-10 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">{t('live_route_visualizer')}</h3>
        </div>
        <div className="flex gap-2 text-[10px] text-slate-400">
          <span className="flex items-center gap-1"><span className="w-2.5 h-1 bg-red-500 rounded"></span> {t('line_1')}</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-1 bg-blue-500 rounded"></span> {t('line_2')}</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-1 bg-emerald-500 rounded"></span> {t('line_3')}</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> {t('map_legend_interchange')}</span>
        </div>
      </div>

      {/* SVG Container */}
      <div className="flex-1 w-full bg-slate-950/40 rounded-2xl p-2 border border-white/5 relative flex items-center justify-center">
        <svg 
          viewBox="0 0 400 400" 
          className="w-full h-full max-h-[420px] select-none"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* TRACK LINES - BACKDROP (GRAY TRACKS) */}
          {/* Line 1 (Red) */}
          <path d="M 140 350 L 140 250 L 140 190 L 140 140 L 160 90 L 230 60 L 290 40" stroke="#334155" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Line 2 (Blue) */}
          <path d="M 50 320 L 70 270 L 90 220 L 110 205 L 140 190 L 190 175 L 220 140 L 160 90 L 120 40" stroke="#334155" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Line 3 (Green) */}
          <path d="M 90 220 L 50 110 L 90 130 L 140 140 L 220 140 L 270 145 L 310 155 L 350 165" stroke="#334155" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

          {/* ACTIVE TRACK SEGMENTS */}
          {/* Line 1 Active */}
          <path 
            d="M 140 350 L 140 250 L 140 190 L 140 140 L 160 90 L 230 60 L 290 40" 
            stroke="#ef4444" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-all duration-700"
            strokeDasharray={activeStationNames.size > 0 ? "none" : "0 1000"}
            opacity={activeStationNames.size > 0 ? 0.9 : 0}
          />
          {/* Line 2 Active */}
          <path 
            d="M 50 320 L 70 270 L 90 220 L 110 205 L 140 190 L 190 175 L 220 140 L 160 90 L 120 40" 
            stroke="#3b82f6" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-all duration-700"
            strokeDasharray={activeStationNames.size > 0 ? "none" : "0 1000"}
            opacity={activeStationNames.size > 0 ? 0.9 : 0}
          />
          {/* Line 3 Active */}
          <path 
            d="M 90 220 L 50 110 L 90 130 L 140 140 L 220 140 L 270 145 L 310 155 L 350 165" 
            stroke="#10b981" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-all duration-700"
            strokeDasharray={activeStationNames.size > 0 ? "none" : "0 1000"}
            opacity={activeStationNames.size > 0 ? 0.9 : 0}
          />

          {/* STATION NODES */}
          {MAP_STATIONS.map((station) => {
            const isActive = activeStationNames.has(station.id);
            const isTS = station.line === 'TS';
            
            // Choose node color
            let color = '#64748b'; // default gray
            if (isActive) {
              if (station.line === 'L1') color = '#ef4444';
              else if (station.line === 'L2') color = '#3b82f6';
              else if (station.line === 'L3') color = '#10b981';
              else color = '#f59e0b'; // TS
            } else {
              if (station.line === 'L1') color = '#b91c1c';
              else if (station.line === 'L2') color = '#1d4ed8';
              else if (station.line === 'L3') color = '#047857';
              else color = '#d97706'; // TS
            }

            const translatedLabel = tStation(station.id);
            const displayLabel = language === 'ar'
              ? (isTS ? `${translatedLabel} (${t('map_legend_interchange')})` : translatedLabel)
              : station.label;

            return (
              <g key={station.id} className="cursor-pointer group">
                {/* Outer Glow for Active Stations */}
                {isActive && (
                  <circle
                    cx={station.x}
                    cy={station.y}
                    r={isTS ? 12 : 9}
                    fill={color}
                    opacity="0.4"
                    className="animate-ping"
                  />
                )}
                {/* Station Node Circle */}
                <circle
                  cx={station.x}
                  cy={station.y}
                  r={isTS ? 6 : 4.5}
                  fill={isActive ? color : '#0f172a'}
                  stroke={color}
                  strokeWidth={isTS ? 3 : 2}
                  className="transition-all duration-300 group-hover:scale-125"
                />
                
                {/* Station Label */}
                <text
                  x={station.x}
                  y={station.y - (isTS ? 10 : 8)}
                  textAnchor="middle"
                  fill={isActive ? '#f1f5f9' : '#94a3b8'}
                  fontSize={isTS ? '7.5' : '6.5'}
                  fontWeight={isActive ? 'bold' : 'normal'}
                  className="pointer-events-none select-none transition-colors duration-300"
                >
                  {displayLabel}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Info panel when no route selected */}
        {activeStationNames.size === 0 && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 rounded-2xl">
            <div className="bg-slate-900 border border-white/5 p-4 rounded-full mb-3 text-slate-400">
              <RefreshCw className="h-8 w-8 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <h4 className="text-slate-200 font-semibold mb-1">{t('visualizer_standby')}</h4>
            <p className="text-xs text-slate-400 max-w-[240px]">
              {t('visualizer_standby_desc')}
            </p>
          </div>
        )}
      </div>  
      
      {/* Map Legend */}
      <div className="mt-4 text-[11px] text-slate-400 leading-relaxed border-t border-white/5 pt-3">
        <span className="font-semibold text-slate-300">{t('map_legend_title')}</span> {t('map_legend_desc')}
      </div>
    </div>
  );
}

export default MetroMap;
