import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Bell, 
  TrendingUp, 
  Clock, 
  ChevronRight, 
  Zap, 
  Moon, 
  Calendar,
  Activity,
  Award,
  BookOpen,
  Settings as SettingsIcon,
  Droplets,
  ShieldAlert,
  Sparkles,
  Heart,
  Coffee,
  Flame
} from 'lucide-react';
import { ConsumptionLog, UserProfile, View } from '../types';
import { cn } from '../lib/utils';
import { 
  getDailyTotal, 
  getRemainingLimit, 
  getCaffeineStatus, 
  getProgressPercentage,
  getTodaysLogs
} from '../utils/caffeine';

interface DashboardProps {
  logs: ConsumptionLog[];
  profile: UserProfile;
  onAddDrink: () => void;
  onLogWater: () => void;
  onNavigate: (view: View) => void;
  onToggleNotifs: () => void;
  hasUnreadNotifs: boolean;
}

export default function Dashboard({ logs, profile, onAddDrink, onLogWater, onNavigate, onToggleNotifs, hasUnreadNotifs }: DashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  const todaysLogs = getTodaysLogs(logs);
  const totalCaffeine = getDailyTotal(logs);
  const remaining = getRemainingLimit(totalCaffeine, profile.dailyLimit);
  const percentage = getProgressPercentage(totalCaffeine, profile.dailyLimit);
  const status = getCaffeineStatus(totalCaffeine, profile.dailyLimit);
  
  const isWarning = totalCaffeine > profile.dailyLimit * 0.8;
  const isDanger = totalCaffeine >= profile.dailyLimit;

  const waterGlasses = todaysLogs.filter(l => l.drinkId === 'water').length;

  const recommendation = () => {
    if (isDanger) return "You've passed your limit. Avoid more caffeine today and drink plenty of water.";
    if (isWarning) return "You're close to your limit. Consider switching to water or herbal tea.";
    if (totalCaffeine === 0) return "Starting fresh! Track your first drink when you're ready.";
    return "You're doing great! You're still within your healthy range.";
  };

  const lastLogTime = todaysLogs.length > 0 
    ? new Date(todaysLogs[0].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'None';

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 md:p-12 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-coffee-brown"
        >
          <Coffee className="w-16 h-16 opacity-20" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-12 pb-32">
      {/* Header */}
      <header className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 bg-espresso text-soft-white rounded-2xl flex items-center justify-center shadow-2xl shadow-espresso/20">
             <Coffee className="w-8 h-8" />
           </div>
           <div>
              <h1 className="text-3xl font-display font-black text-espresso tracking-tight">Today’s Caffeine</h1>
              <p className="text-[10px] font-bold text-espresso/30 uppercase tracking-[0.4em] mt-1">{profile.name || 'Coffee Lover'}'s Tracker</p>
           </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleNotifs}
            className="p-4 rounded-[1.25rem] bg-white border border-warm-beige/30 text-espresso relative hover:scale-105 active:scale-95 transition-all"
          >
            <Bell className="w-6 h-6" />
            {hasUnreadNotifs && <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />}
          </button>
          <button 
            onClick={() => onNavigate('SETTINGS')}
            className="p-4 rounded-[1.25rem] bg-white border border-warm-beige/30 text-espresso hover:scale-105 active:scale-95 transition-all"
          >
            <SettingsIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Main Consumption Card */}
        <div className="lg:col-span-12 xl:col-span-8">
          <div className="relative overflow-hidden bg-white rounded-[4rem] p-12 border border-warm-beige/30 shadow-2xl">
             <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
                <Coffee className="w-96 h-96" />
             </div>
             
             <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                   <div>
                      <div className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6",
                        isDanger ? "bg-red-50 text-red-600" : isWarning ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                      )}>
                        {isDanger ? <ShieldAlert className="w-3.5 h-3.5" /> : <Activity className="w-3.5 h-3.5" />}
                        {status}
                      </div>
                      <h2 className="text-5xl font-display font-black text-espresso tracking-tight leading-[0.9]">
                        Daily <br /> Progress
                      </h2>
                   </div>

                   <p className="text-espresso/60 font-medium leading-relaxed max-w-sm">
                     {recommendation()}
                   </p>

                   <div className="flex gap-12">
                      <div>
                         <p className="text-[10px] font-bold text-espresso/20 uppercase tracking-widest mb-2">Total mg</p>
                         <p className="text-4xl font-display font-black text-espresso">{totalCaffeine}</p>
                      </div>
                      <div className="w-px h-16 bg-warm-beige/30 mt-4" />
                      <div>
                         <p className="text-[10px] font-bold text-espresso/20 uppercase tracking-widest mb-2">Remaining</p>
                         <p className="text-4xl font-display font-black text-espresso">{totalCaffeine >= profile.dailyLimit ? 0 : remaining}<span className="text-sm font-bold text-espresso/20 ml-1">mg</span></p>
                      </div>
                   </div>

                   <div className="flex flex-wrap gap-4">
                     <button 
                      onClick={onAddDrink}
                      className="flex items-center gap-4 px-10 py-6 bg-coffee-brown text-white rounded-[2rem] font-display font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-coffee-brown/20 group"
                     >
                       Log Drink
                       <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-500" />
                     </button>
                     <button 
                      onClick={() => onNavigate('HISTORY')}
                      className="flex items-center gap-4 px-8 py-6 bg-white border border-warm-beige/30 text-espresso rounded-[2rem] font-bold text-sm hover:bg-soft-white transition-all"
                     >
                       Full History
                     </button>
                   </div>
                </div>

                <div className="relative flex items-center justify-center">
                   <svg className="w-72 h-72 transform -rotate-90">
                     <circle 
                      cx="144" cy="144" r="130" 
                      className="stroke-latte-cream fill-none" 
                      strokeWidth="24"
                     />
                     <motion.circle 
                      cx="144" cy="144" r="130" 
                      className={cn(
                        "fill-none transition-all duration-1000 ease-out",
                        isDanger ? "stroke-red-500" : isWarning ? "stroke-amber-500" : "stroke-caramel"
                      )}
                      strokeWidth="24"
                      strokeDasharray={816}
                      initial={{ strokeDashoffset: 816 }}
                      animate={{ strokeDashoffset: 816 - (816 * percentage) / 100 }}
                      strokeLinecap="round"
                     />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-6xl font-display font-black text-espresso">{Math.round(percentage)}%</span>
                      <span className="text-[10px] font-bold text-espresso/30 uppercase tracking-[0.3em]">of Limit</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-8">
           <div className="grid grid-cols-2 gap-8">
              <MiniCard 
                icon={<Clock className="w-5 h-5" />}
                label="Last Drink"
                value={lastLogTime}
                color="text-amber-600"
                bg="bg-amber-50"
              />
              <MiniCard 
                icon={<Flame className="w-5 h-5" />}
                label="Daily Streak"
                value={`${profile.streak} Days`}
                color="text-orange-600"
                bg="bg-orange-50"
              />
              <MiniCard 
                icon={<Droplets className="w-5 h-5" />}
                label="Water Goal"
                value={`${waterGlasses} / 8`}
                color="text-blue-600"
                bg="bg-blue-50"
                onClick={onLogWater}
              />
              <MiniCard 
                icon={<Moon className="w-5 h-5" />}
                label="Sleep Goal"
                value={`${profile.sleepGoal}h`}
                color="text-indigo-600"
                bg="bg-indigo-50"
              />
           </div>

           <div className="bg-espresso p-10 rounded-[3rem] text-soft-white border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 group-hover:rotate-45 transition-all duration-1000">
                <Sparkles className="w-32 h-32" />
              </div>
              <h3 className="text-xl font-display font-black mb-4 flex items-center gap-3">
                 <Award className="w-6 h-6 text-caramel fill-caramel" />
                 Consistency Reward
              </h3>
              <p className="text-soft-white/40 text-sm font-medium leading-relaxed">Stay under your limit for 2 more days to earn the "Smart Sipper" badge.</p>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex -space-x-4">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full border-4 border-espresso bg-white overflow-hidden shadow-xl">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Friend" />
                     </div>
                   ))}
                </div>
                <button onClick={() => onNavigate('GOALS')} className="text-xs font-bold text-caramel uppercase tracking-widest hover:text-white transition-colors">View Goals</button>
              </div>
           </div>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
         <NavCard icon={<TrendingUp className="w-6 h-6" />} label="Analytics" view="ANALYTICS" onClick={onNavigate} />
         <NavCard icon={<Calendar className="w-6 h-6" />} label="History" view="HISTORY" onClick={onNavigate} />
         <NavCard icon={<BookOpen className="w-6 h-6" />} label="Education" view="EDUCATION" onClick={onNavigate} />
         <NavCard icon={<Heart className="w-6 h-6" />} label="Goals" view="GOALS" onClick={onNavigate} />
      </div>

      {/* Recent History */}
      <section className="mt-16">
        <div className="flex items-center justify-between mb-10 px-4">
           <h3 className="text-2xl font-display font-black text-espresso tracking-tight">Recent Drinks</h3>
           <button onClick={() => onNavigate('HISTORY')} className="text-xs font-bold text-espresso/30 uppercase tracking-widest hover:text-caramel transition-colors flex items-center gap-2">
             See History
             <ChevronRight className="w-4 h-4" />
           </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {todaysLogs.length > 0 ? (
             todaysLogs.slice(0, 3).map((log, i) => (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 rounded-[2.5rem] border border-warm-beige/30 shadow-sm flex items-center gap-5 group hover:shadow-xl transition-all"
                >
                   <div className="w-16 h-16 bg-latte-cream/40 rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                      {(() => {
                        if (log.drinkId === 'water') return '💧';
                        if (log.drinkId === 'espresso') return '☕';
                        if (log.drinkId.includes('tea')) return '🍵';
                        if (log.drinkId.includes('energy')) return '⚡';
                        return '☕';
                      })()}
                   </div>
                   <div className="flex-1">
                      <h4 className="font-display font-black text-espresso">{log.name}</h4>
                      <p className="text-[10px] font-bold text-espresso/30 uppercase tracking-widest mt-1">Today • {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                   </div>
                   <div className="bg-soft-white px-4 py-2 rounded-2xl border border-warm-beige/20 text-center">
                      <p className="text-sm font-black text-espresso">{log.caffeine}</p>
                      <p className="text-[8px] font-bold text-espresso/20 uppercase">mg</p>
                   </div>
                </motion.div>
             ))
           ) : (
             <div className="md:col-span-3 py-20 text-center bg-white rounded-[3rem] border border-dashed border-warm-beige/40">
                <div className="w-20 h-20 bg-latte-cream rounded-full flex items-center justify-center mx-auto mb-6">
                   <Coffee className="w-10 h-10 text-espresso/10" />
                </div>
                <p className="text-espresso/40 font-medium font-display text-xl">No drinks tracked yet today.</p>
             </div>
           )}
        </div>
      </section>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 md:hidden">
         <button 
           onClick={onAddDrink}
           className="w-20 h-20 bg-coffee-brown text-white rounded-full flex items-center justify-center shadow-2xl shadow-coffee-brown/40 hover:scale-110 active:scale-95 transition-all"
         >
           <Plus className="w-10 h-10" />
         </button>
      </div>
    </div>
  );
}

function MiniCard({ icon, label, value, color, bg, onClick }: { icon: React.ReactNode, label: string, value: string, color: string, bg: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "bg-white p-6 rounded-[2.5rem] border border-warm-beige/30 shadow-sm transition-all text-left group",
        onClick && "hover:shadow-xl hover:-translate-y-1 active:scale-95"
      )}
    >
       <div className={`w-10 h-10 ${bg} ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          {icon}
       </div>
       <p className="text-[8px] font-bold text-espresso/30 uppercase tracking-[0.2em] mb-1">{label}</p>
       <div className="flex items-center justify-between">
          <p className="text-lg font-display font-black text-espresso">{value}</p>
          {onClick && <Plus className="w-4 h-4 text-espresso/20 group-hover:text-espresso" />}
       </div>
    </button>
  );
}

function NavCard({ icon, label, view, onClick }: { icon: React.ReactNode, label: string, view: View, onClick: (v: View) => void }) {
  return (
    <button 
      onClick={() => onClick(view)}
      className="bg-white p-8 rounded-[3rem] border border-warm-beige/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col items-center text-center gap-5"
    >
       <div className="w-14 h-14 bg-latte-cream/40 text-espresso/40 rounded-2xl flex items-center justify-center group-hover:bg-caramel group-hover:text-white transition-all duration-500">
         {icon}
       </div>
       <span className="text-[10px] font-bold text-espresso/40 uppercase tracking-[0.3em] group-hover:text-espresso transition-colors">{label}</span>
    </button>
  );
}
