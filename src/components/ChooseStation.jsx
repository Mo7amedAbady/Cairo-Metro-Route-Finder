import React from "react";
import { ChevronDown } from "lucide-react";
import Stations from "../../Data/shortest_path";
import { useLanguage } from "../context/LanguageContext";

function ChooseStation({ Station2, Station, setStation, placeholder = "select_station" }) {
    const { t, tStation } = useLanguage();

    return (
        <div className="relative w-full">
            <select 
                value={Station || ""} 
                onChange={(e) => setStation(e.target.value)} 
                className="w-full bg-slate-950/50 hover:bg-slate-950/80 border border-white/5 hover:border-white/15 text-slate-100 rounded-xl ps-4 pe-10 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all duration-200 cursor-pointer appearance-none text-start"
            >
                <option value="" disabled className="bg-slate-950 text-slate-400">
                    {t(placeholder)}
                </option>
                {Stations.map((element) => (
                    (element.station!=Station2)&&<option 
                        key={element.station} 
                        value={element.station} 
                        className="bg-slate-900 text-slate-200"
                    >
                        {tStation(element.station)}
                    </option>
                ))}
            </select>
            <div className="absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown className="h-4 w-4" />
            </div>
        </div>
    );
}

export default ChooseStation;