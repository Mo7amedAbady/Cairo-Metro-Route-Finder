import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchPanel from './components/SearchPanal'
import MetroMap from './components/MetroMap'
import DisplayStations from './components/DisplayStations'
import { BFS } from '../Data/shortest_path'
import { ArrowRight } from 'lucide-react'
import { LanguageProvider, useLanguage } from './context/LanguageContext'

function AppContent() {
  const [FromStation, setFromStation] = useState(null);
  const [ToStation, setToStation] = useState(null);
  const [path, setpath] = useState([{}]);
  const { t } = useLanguage();

  const handleFindRoute = () => {
    if (!FromStation || !ToStation) {
      return;
    }
    const result = BFS(FromStation, ToStation);
    setpath(result);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-blue-500/30 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Hero Header Section */}
      <Hero />

      {/* Main Core Search & Navigation Grid */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 lg:px-8 pb-16" id="search-section">
        <div className="grid grid-cols-1 place-items-center">
          
          {/* Left panel: Directions Card & Timeline Output */}
          <div className="w-full max-w-2xl flex flex-col gap-6">
            
            {/* Directions input card */}
            <section className="glass-panel rounded-3xl p-6 shadow-2xl border border-white/5 relative overflow-hidden">
              {/* Radial card glow */}
              <div className="absolute top-0 end-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none"></div>
              
              <h2 className="text-base font-bold text-white mb-6 tracking-wide uppercase flex items-center gap-2 text-start">
                <span>{t('plan_route')}</span>
              </h2>

              <SearchPanel 
                FromStation={FromStation} 
                setFromStation={setFromStation} 
                ToStation={ToStation} 
                setToStation={setToStation}
              />

              <button 
                className="w-full mt-6 bg-gradient-to-tr from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-550 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/10 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-650"
                onClick={handleFindRoute}
                disabled={!FromStation || !ToStation}
              >
                <span>{t('find_shortest_route')}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
              </button>
            </section>

            {/* Path details output timeline */}
            <section className="w-full">
              <DisplayStations Path={path} />
            </section>
          </div>

        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App;
