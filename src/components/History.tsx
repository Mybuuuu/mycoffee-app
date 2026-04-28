import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  History as HistoryIcon, 
  Clock, 
  Coffee, 
  Trash2, 
  ChevronLeft, 
  Search, 
  Filter, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { ConsumptionLog, DRINK_DATABASE } from '../types';

interface HistoryProps {
  logs: ConsumptionLog[];
  onBack: () => void;
  onRemoveLog: (id: string) => void;
}

export default function History({ logs, onBack, onRemoveLog }: HistoryProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | 'Coffee' | 'Tea' | 'Energy' | 'Other'>('All');

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const drink = DRINK_DATABASE.find(d => d.id === log.drinkId);
      const matchesSearch = log.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'All' || drink?.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [logs, search, filter]);

  const groupedLogs = useMemo((): Record<string, ConsumptionLog[]> => {
    return filteredLogs.reduce((acc, log) => {
      const date = new Date(log.timestamp).toLocaleDateString(undefined, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      if (!acc[date]) acc[date] = [];
      acc[date].push(log);
      return acc;
    }, {} as Record<string, ConsumptionLog[]>);
  }, [filteredLogs]);

  const totalCaffeine = filteredLogs.reduce((sum, log) => sum + log.caffeine, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 pb-32">
      <header className="mb-12">
        <button onClick={onBack} className="flex items-center gap-2 text-espresso/40 hover:text-espresso transition-colors font-bold uppercase tracking-widest text-xs mb-6">
          <ChevronLeft className="w-4 h-4" />
          Dashboard
        </button>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div>
              <h1 className="text-5xl font-display font-black text-espresso tracking-tight">Drinking History</h1>
              <p className="text-espresso/40 font-medium mt-2">Every sip tracked and analyzed.</p>
           </div>
           <div className="bg-latte-cream/50 px-8 py-4 rounded-3xl border border-warm-beige/20 flex items-center gap-8 shadow-sm">
              <div className="text-center">
                <p className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest mb-1">Total Logs</p>
                <p className="text-2xl font-display font-black text-espresso">{filteredLogs.length}</p>
              </div>
              <div className="w-px h-8 bg-warm-beige/30" />
              <div className="text-center">
                <p className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest mb-1">Total mg</p>
                <p className="text-2xl font-display font-black text-espresso">{totalCaffeine}</p>
              </div>
           </div>
        </div>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
         <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-espresso/20 group-focus-within:text-caramel transition-colors" />
            <input 
              type="text"
              placeholder="Search drinks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-8 py-6 rounded-[2rem] bg-white border border-warm-beige/30 focus:border-caramel/40 outline-none transition-all font-medium text-espresso placeholder:text-espresso/20"
            />
         </div>
         <div className="flex gap-2 p-1.5 bg-latte-cream/30 rounded-[2rem] border border-warm-beige/20 overflow-x-auto no-scrollbar">
            {(['All', 'Coffee', 'Tea', 'Energy'] as const).map(f => (
               <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-8 py-4 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  filter === f ? 'bg-coffee-brown text-white' : 'text-espresso/40 hover:text-espresso'
                }`}
               >
                 {f}
               </button>
            ))}
         </div>
      </div>

      {Object.keys(groupedLogs).length > 0 ? (
        <div className="space-y-12">
          {(Object.entries(groupedLogs) as [string, ConsumptionLog[]][]).map(([date, dayLogs]) => (
            <section key={date} className="space-y-6">
              <div className="flex items-center gap-4 px-4">
                 <div className="w-2 h-2 rounded-full bg-caramel" />
                 <h3 className="text-xs font-bold text-espresso/30 uppercase tracking-[0.3em] font-display">{date}</h3>
                 <div className="flex-1 h-px bg-warm-beige/10" />
              </div>
              <div className="grid gap-4">
                {dayLogs.map((log, i) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white p-6 rounded-[2.5rem] border border-warm-beige/30 shadow-sm flex items-center justify-between group hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-latte-cream/40 rounded-[1.5rem] flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        {(() => {
                          const drink = DRINK_DATABASE.find(d => d.id === log.drinkId);
                          if (log.drinkId === 'water') return '💧';
                          if (drink?.category === 'Coffee') return '☕';
                          if (drink?.category === 'Tea') return '🍵';
                          if (drink?.category === 'Energy') return '⚡';
                          return '🥤';
                        })()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-display font-black text-espresso text-xl">{log.name}</h4>
                          {(() => {
                            const drink = DRINK_DATABASE.find(d => d.id === log.drinkId);
                            if (!drink) return null;
                            return (
                              <span className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-latte-cream text-espresso/40 uppercase tracking-widest mt-0.5">
                                {drink.category}
                              </span>
                            );
                          })()}
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2 text-xs text-espresso/40 font-bold uppercase tracking-widest">
                            <Clock className="w-4 h-4 text-caramel/40" />
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-espresso/40 font-bold uppercase tracking-widest">
                             <Coffee className="w-4 h-4 text-caramel/40" />
                             {log.caffeine}mg
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <button 
                        onClick={() => {
                          if (confirm('Are you sure you want to remove this log?')) {
                            onRemoveLog(log.id);
                          }
                        }}
                        className="p-4 rounded-2xl hover:bg-red-50 text-espresso/10 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                       >
                         <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[4rem] p-24 text-center border border-warm-beige/30 shadow-sm">
          <div className="w-32 h-32 bg-latte-cream rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
            <Search className="w-12 h-12 text-espresso/10" />
          </div>
          <h2 className="text-3xl font-display font-black text-espresso mb-4">No Matches Found</h2>
          <p className="text-espresso/40 font-medium max-w-sm mx-auto leading-relaxed">
            {search ? `We couldn't find any logs matching "${search}" in the ${filter} category.` : 'Your history is clear. Start tracking your drinks on the dashboard.'}
          </p>
          {search && (
            <button 
              onClick={() => { setSearch(''); setFilter('All'); }}
              className="mt-10 px-8 py-4 bg-espresso text-white rounded-2xl font-bold transition-all hover:scale-105"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
