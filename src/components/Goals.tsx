import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Target, 
  Trophy, 
  Clock, 
  Zap, 
  Droplets, 
  Flame, 
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Goal } from '../types';
import { cn } from '../lib/utils';

interface GoalsProps {
  goals: Goal[];
  onBack: () => void;
}

const BADGES = [
  { id: '1', name: 'Smart Sipper', description: 'Stayed under limit for 3 days', icon: <Award className="w-8 h-8" />, unlocked: true },
  { id: '2', name: 'Sleep Master', description: 'No caffeine after 4 PM for a week', icon: <Clock className="w-8 h-8" />, unlocked: false },
  { id: '3', name: 'Consistency King', icon: <ShieldCheck className="w-8 h-8" />, description: '7-day logging streak', unlocked: true },
  { id: '4', name: 'Metabolic Expert', description: 'Read all education articles', icon: <Zap className="w-8 h-8" />, unlocked: false }
];

export default function Goals({ goals, onBack }: GoalsProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 pb-32">
      <header className="mb-16">
        <button onClick={onBack} className="flex items-center gap-2 text-espresso/40 hover:text-espresso transition-colors font-bold uppercase tracking-widest text-xs mb-6">
          <ChevronLeft className="w-4 h-4" />
          Dashboard
        </button>
        <div className="flex items-center justify-between">
           <div>
              <h1 className="text-5xl font-display font-black text-espresso tracking-tight">Wellness Goals</h1>
              <p className="text-espresso/40 font-medium mt-2">Small steps to better health.</p>
           </div>
           <div className="w-20 h-20 bg-caramel rounded-[2rem] flex items-center justify-center shadow-2xl shadow-caramel/20">
              <Trophy className="w-10 h-10 text-white" />
           </div>
        </div>
      </header>

      <div className="space-y-16">
        {/* Active Goals */}
        <section>
          <h2 className="text-xs font-bold text-espresso/20 uppercase tracking-[0.4em] mb-10 px-4">Active Goals</h2>
          <div className="grid gap-8">
            {goals.map((goal, i) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[3.5rem] border border-warm-beige/30 shadow-xl overflow-hidden relative group"
              >
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-10">
                  <div className={cn(
                    "w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-inner shrink-0 transition-all duration-700",
                    goal.isCompleted ? "bg-emerald-500 text-white scale-110 rotate-12" : "bg-latte-cream/40 text-espresso"
                  )}>
                    {goal.isCompleted ? <CheckCircle2 className="w-10 h-10" /> : (
                      <>
                        {goal.icon === 'Zap' && <Zap className="w-10 h-10" />}
                        {goal.icon === 'Moon' && <Clock className="w-10 h-10" />}
                        {goal.icon === 'Droplets' && <Droplets className="w-10 h-10" />}
                      </>
                    )}
                  </div>

                  <div className="flex-1 space-y-8">
                    <div>
                      <h3 className="text-2xl font-display font-black text-espresso mb-2">{goal.title}</h3>
                      <p className="text-espresso/40 font-medium text-sm leading-relaxed">{goal.description}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-bold text-espresso/40 uppercase tracking-widest">
                        <span>Progress</span>
                        <span>{goal.current} / {goal.target} {goal.id === 'sleep' ? 'Sessions' : 'Days'}</span>
                      </div>
                      <div className="h-4 w-full bg-warm-beige/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            goal.isCompleted ? "bg-emerald-500" : "bg-caramel"
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-center">
                    {goal.isCompleted ? (
                      <div className="flex flex-col items-center gap-2">
                        <span className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                          <Trophy className="w-6 h-6" />
                        </span>
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Goal Met</span>
                      </div>
                    ) : (
                      <div className="text-center bg-latte-cream/20 px-6 py-4 rounded-3xl border border-warm-beige/10">
                         <p className="text-2xl font-display font-black text-espresso">{Math.round((goal.current / goal.target) * 100)}%</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Achievement Badges */}
        <section>
          <div className="flex items-center justify-between mb-10 px-4">
            <h2 className="text-xs font-bold text-espresso/20 uppercase tracking-[0.4em]">Achievements</h2>
            <div className="flex items-center gap-2 text-caramel">
               <Sparkles className="w-4 h-4" />
               <span className="text-xs font-bold uppercase tracking-widest">2 Unlocked</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {BADGES.map((badge, i) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className={cn(
                    "bg-white p-8 rounded-[3rem] border border-warm-beige/30 shadow-sm flex flex-col items-center text-center gap-6 group hover:shadow-xl transition-all",
                    !badge.unlocked && "opacity-60 overflow-hidden"
                  )}
                >
                   <div className={cn(
                     "w-20 h-20 rounded-[2.5rem] flex items-center justify-center shadow-lg transition-all duration-700",
                     badge.unlocked ? "bg-espresso text-caramel group-hover:scale-110" : "bg-latte-cream/40 text-espresso/20"
                   )}>
                      {badge.unlocked ? badge.icon : <Lock className="w-8 h-8" />}
                   </div>
                   <div>
                      <h4 className={cn("text-lg font-display font-black mb-1", badge.unlocked ? "text-espresso" : "text-espresso/20")}>
                        {badge.name}
                      </h4>
                      <p className="text-[10px] font-medium text-espresso/30 leading-tight">
                        {badge.unlocked ? badge.description : 'Locked'}
                      </p>
                   </div>
                </motion.div>
             ))}
          </div>
        </section>

        {/* Global Challenge */}
        <section className="bg-espresso p-12 rounded-[4.5rem] text-soft-white border border-white/5 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 group-hover:rotate-45 transition-all duration-1000">
             <Flame className="w-48 h-48" />
           </div>
           <div className="max-w-md relative z-10">
              <h3 className="text-3xl font-display font-black mb-4">Elite 30-Day Challenge</h3>
              <p className="text-soft-white/40 font-medium leading-relaxed mb-10">Join 12,400+ users optimizing their habits together. Get an exclusive badge and personalized health report.</p>
              <div className="flex items-center gap-6">
                 <div className="flex -space-x-4">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-espresso bg-white overflow-hidden shadow-xl">
                         <img src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="User" />
                      </div>
                    ))}
                 </div>
                 <button className="px-10 py-5 bg-caramel text-espresso rounded-2xl font-display font-black text-sm hover:scale-105 active:scale-95 transition-all">
                   Join Community
                 </button>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
