import React from "react";
import ChooseStation from "./ChooseStation";
import { ArrowUpDown, MapPin, Navigation } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function SearchPanel({ FromStation, setFromStation, ToStation, setToStation }) {
  const { t } = useLanguage();

  const handleSwap = () => {
    const temp = FromStation;
    setFromStation(ToStation);
    setToStation(temp);
  };

  return (
    <div className="flex flex-col gap-4 relative">
      {/* From Station */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-slate-400 tracking-widest flex items-center gap-1.5">
          <Navigation className="h-3 w-3 text-emerald-400 fill-emerald-450/20" />
          <span>{t('departure')}</span>
        </label>
        <ChooseStation 
          Station2={ToStation} 
          Station={FromStation} 
          setStation={setFromStation} 
          placeholder="select_starting_point" 
        />
      </div>

      {/* Divider and Swap Button */}
      <div className="relative flex items-center justify-center my-0.5">
        <div className="absolute inset-x-0 border-t border-white/5"></div>
        <button 
          type="button"
          onClick={handleSwap}
          className="relative z-10 p-2.5 bg-slate-900 border border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-100 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          title={t('swap_stations')}
        >
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </div>

      {/* To Station */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-slate-400 tracking-widest flex items-center gap-1.5">
          <MapPin className="h-3 w-3 text-red-500 fill-red-500/20" />
          <span>{t('destination')}</span>
        </label>
        <ChooseStation 
          Station2={FromStation} 
          Station={ToStation} 
          setStation={setToStation} 
          placeholder="select_destination" 
        />
      </div>
    </div>
  );
}

export default SearchPanel;