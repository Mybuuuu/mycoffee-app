import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Coffee, Sparkles, Scale, User, Clock, Zap, Shield, Check, Moon, Star, Heart, Activity } from 'lucide-react';
import { UserProfile } from '../types';
import { cn } from '../lib/utils';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const STEPS = [
  { id: 'welcome', title: 'Welcome to MyCoffee', subtitle: 'Start your caffeine journey' },
  { id: 'profile', title: 'Personal Details', subtitle: 'Your physical profile' },
  { id: 'sleep', title: 'Sleep Routine', subtitle: 'Rest and recovery' },
  { id: 'goals', title: 'Your Goals', subtitle: 'What do you want to achieve?' },
  { id: 'result', title: 'Your Daily Limit', subtitle: 'Personalized for you' }
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: '',
    weight: 70,
    sensitivity: 'Medium' as 'Low' | 'Medium' | 'High',
    sleepGoal: 8,
    bedtime: '23:00',
    lifestyle: 'Office' as UserProfile['lifestyle'],
    age: 25,
    sleepQuality: 'Good' as 'Poor' | 'Good' | 'Great',
    wellnessGoal: 'Energy' as 'Energy' | 'Sleep' | 'Health' | 'Anxiety'
  });

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  const calculateLimit = () => {
    let limit = 400; // Base healthy limit
    if (data.weight < 60) limit -= 50;
    if (data.sensitivity === 'High') limit -= 150;
    if (data.sensitivity === 'Low') limit += 100;
    if (data.wellnessGoal === 'Anxiety') limit -= 100;
    if (data.wellnessGoal === 'Sleep') limit -= 50;
    if (data.sleepQuality === 'Poor') limit -= 50;
    return Math.max(100, Math.min(600, limit));
  };

  const finish = () => {
    onComplete({
      name: data.name,
      weight: data.weight,
      sensitivity: data.sensitivity,
      sleepGoal: data.sleepGoal,
      bedtime: data.bedtime,
      lifestyle: data.lifestyle,
      onboarded: true,
      dailyLimit: calculateLimit(),
      streak: 1,
      lastLogDate: new Date().toDateString(),
      theme: 'light'
    });
  };

  return (
    <div className="min-h-screen bg-soft-white flex flex-col justify-between overflow-hidden">
      {/* Progress Bar */}
      <div className="pt-12 px-12">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-3 mb-4">
          {STEPS.map((s, i) => (
             <div key={s.id} className={cn(
               "flex-1 h-2 rounded-full transition-all duration-700",
               i <= step ? "bg-coffee-brown" : "bg-warm-beige/20"
             )} />
          ))}
        </div>
        <div className="max-w-xl mx-auto flex items-center justify-between">
           <span className="text-[10px] font-bold text-coffee-brown uppercase tracking-widest">Step 0{step + 1}</span>
           <span className="text-[10px] font-bold text-espresso/20 uppercase tracking-widest">{STEPS[step].subtitle}</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div 
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="w-32 h-32 bg-latte-cream rounded-[3rem] items-center justify-center flex mx-auto mb-10 shadow-xl shadow-latte-cream/20">
                   <Coffee className="w-12 h-12 text-coffee-brown rotate-[-12deg]" />
                </div>
                <h1 className="text-5xl font-display font-black text-espresso mb-6 tracking-tight">Drink Smart.</h1>
                <p className="text-xl text-espresso/40 font-medium mb-12 max-w-md mx-auto leading-relaxed">Let's find your perfect caffeine balance to keep you energized and healthy.</p>
                
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-[0.4em]">Your Name</label>
                  <input 
                    type="text"
                    placeholder="Enter your name..."
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="w-full px-10 py-7 rounded-[2.5rem] bg-white border border-warm-beige/30 focus:border-caramel/40 outline-none transition-all font-display font-bold text-2xl text-center text-espresso placeholder:text-espresso/10"
                  />
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="text-center">
                   <h2 className="text-4xl font-display font-black text-espresso mb-4">Personal Details</h2>
                   <p className="text-espresso/40 font-medium tracking-tight">Your body's metabolism depends on several factors.</p>
                </div>

                <div className="space-y-10">
                   <div className="space-y-4">
                      <div className="flex items-center justify-between px-6">
                        <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest">Weight (kg)</label>
                        <span className="text-2xl font-display font-black text-espresso">{data.weight}</span>
                      </div>
                      <input 
                        type="range"
                        min="40"
                        max="150"
                        value={data.weight}
                        onChange={(e) => setData({ ...data, weight: Number(e.target.value) })}
                        className="w-full h-1.5 bg-latte-cream rounded-full appearance-none cursor-pointer accent-coffee-brown"
                      />
                   </div>

                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest px-6 mb-4 block">Caffeine Sensitivity</label>
                      <div className="grid grid-cols-3 gap-3">
                         {(['Low', 'Medium', 'High'] as const).map(s => (
                           <button
                             key={s}
                             onClick={() => setData({ ...data, sensitivity: s })}
                             className={cn(
                               "py-6 rounded-3xl text-sm font-bold transition-all border-2",
                               data.sensitivity === s 
                                 ? "bg-white border-caramel text-caramel shadow-lg" 
                                 : "bg-white/50 border-warm-beige/20 text-espresso/30 opacity-60"
                             )}
                           >
                             {s}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="sleep"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="text-center">
                   <h2 className="text-4xl font-display font-black text-espresso mb-4">Sleep Routine</h2>
                   <p className="text-espresso/40 font-medium tracking-tight">Caffeine affects your sleep quality long after your last sip.</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest px-6 block">Target Bedtime</label>
                      <input 
                        type="time"
                        value={data.bedtime}
                        onChange={(e) => setData({ ...data, bedtime: e.target.value })}
                        className="w-full px-10 py-6 rounded-[2rem] bg-white border border-warm-beige/30 outline-none text-2xl font-bold text-espresso text-center"
                      />
                   </div>

                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest px-6 block">Sleep Quality</label>
                      <div className="grid grid-cols-3 gap-3">
                         {(['Poor', 'Good', 'Great'] as const).map(q => (
                           <button
                             key={q}
                             onClick={() => setData({ ...data, sleepQuality: q })}
                             className={cn(
                               "py-6 rounded-3xl text-sm font-bold transition-all border-2",
                               data.sleepQuality === q 
                                 ? "bg-white border-caramel text-caramel shadow-lg" 
                                 : "bg-white/50 border-warm-beige/20 text-espresso/30 opacity-60"
                             )}
                           >
                             {q}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="goals"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div className="text-center">
                   <h2 className="text-4xl font-display font-black text-espresso mb-4">Your Health Goals</h2>
                   <p className="text-espresso/40 font-medium tracking-tight">Choose what's most important for your wellness.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   {(['Energy', 'Sleep', 'Health', 'Anxiety'] as const).map(g => (
                     <button
                       key={g}
                       onClick={() => setData({ ...data, wellnessGoal: g })}
                       className={cn(
                         "p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 text-center",
                         data.wellnessGoal === g 
                           ? "bg-white border-caramel text-caramel shadow-xl" 
                           : "bg-white/50 border-warm-beige/20 text-espresso/40"
                       )}
                     >
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center",
                          data.wellnessGoal === g ? "bg-caramel text-white" : "bg-latte-cream/40"
                        )}>
                          {g === 'Energy' && <Zap className="w-6 h-6" />}
                          {g === 'Sleep' && <Moon className="w-6 h-6" />}
                          {g === 'Health' && <Heart className="w-6 h-6" />}
                          {g === 'Anxiety' && <Activity className="w-6 h-6" />}
                        </div>
                        <span className="font-bold text-sm tracking-tight">{g}</span>
                     </button>
                   ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-48 h-48 rounded-full bg-emerald-500/10 border-4 border-emerald-500/20 flex items-center justify-center mx-auto mb-10 relative">
                   <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     transition={{ type: "spring", delay: 0.5 }}
                     className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20"
                   >
                      <Check className="w-8 h-8 text-white" />
                   </motion.div>
                   <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin duration-[2000ms]" />
                </div>
                
                <h2 className="text-[10px] font-display font-black text-emerald-500 uppercase tracking-[0.5em] mb-4">Metabolic profile ready</h2>
                <h1 className="text-7xl font-display font-black text-espresso mb-8 tracking-tighter">
                  {calculateLimit()}<span className="text-2xl text-espresso/20 ml-2 uppercase">mg/day</span>
                </h1>
                
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-12">
                   <div className="bg-white p-6 rounded-3xl border border-warm-beige/20 shadow-sm text-left">
                      <p className="text-[10px] font-bold text-espresso/30 uppercase tracking-widest mb-2">Cut-off Time</p>
                      <p className="text-xl font-display font-black text-espresso">
                        {(() => {
                          const [h, m] = data.bedtime.split(':').map(Number);
                          const cutOff = new Date();
                          cutOff.setHours(h - 8, m);
                          return cutOff.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        })()}
                      </p>
                   </div>
                   <div className="bg-white p-6 rounded-3xl border border-warm-beige/20 shadow-sm text-left">
                      <p className="text-[10px] font-bold text-espresso/30 uppercase tracking-widest mb-2">Smart Score</p>
                      <p className="text-xl font-display font-black text-emerald-500">98/100</p>
                   </div>
                   <div className="col-span-2 bg-latte-cream/20 p-6 rounded-3xl border border-warm-beige/10 text-left">
                      <p className="text-xs font-medium text-espresso/60 leading-relaxed">
                        We've optimized your limit for <strong>{data.wellnessGoal}</strong>. 
                        Staying under {calculateLimit()}mg will help you maintain deep sleep cycles and avoid afternoon crashes.
                      </p>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="p-12 mb-12 flex items-center justify-center gap-6">
        {step > 0 && (
          <button 
            onClick={back}
            className="p-8 rounded-[2rem] bg-latte-cream/50 text-espresso/40 hover:bg-latte-cream transition-all flex items-center justify-center"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        )}
        
        <button 
          onClick={step === 4 ? finish : next}
          disabled={step === 0 && !data.name}
          className={cn(
            "flex-1 max-w-sm py-8 rounded-[2.5rem] font-display font-black text-2xl transition-all flex items-center justify-center gap-3 premium-shadow",
            step === 4 ? "bg-emerald-500 text-white shadow-emerald-500/20" : "bg-coffee-brown text-white shadow-coffee-brown/20",
            (step === 0 && !data.name) && "opacity-50 grayscale cursor-not-allowed"
          )}
        >
          {step === 4 ? "Start Tracking" : "Continue"}
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
