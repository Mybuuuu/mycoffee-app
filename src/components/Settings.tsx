import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  User, 
  Bell, 
  Moon, 
  Trash2, 
  RefreshCw, 
  LogOut, 
  Shield, 
  Zap, 
  Palette, 
  Sun,
  Lock,
  ChevronRight,
  Monitor,
  AlertTriangle,
  Info,
  Download,
  Check,
  Star
} from 'lucide-react';
import { UserProfile, DrinkType } from '../types';
import { cn } from '../lib/utils';

interface SettingsProps {
  profile: UserProfile;
  customDrinks: DrinkType[];
  onUpdate: (profile: UserProfile) => void;
  onBack: () => void;
  onReset: () => void;
  onRemoveCustomDrink: (id: string) => void;
}

export default function Settings({ profile, customDrinks, onUpdate, onBack, onReset, onRemoveCustomDrink }: SettingsProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'data' | 'custom'>('profile');

  const toggleTheme = () => {
    onUpdate({ ...profile, theme: profile.theme === 'light' ? 'dark' : 'light' });
  };

  const updateProfile = (field: keyof UserProfile, value: any) => {
    onUpdate({ ...profile, [field]: value });
  };

  const handleExport = () => {
    const data = {
      profile,
      customDrinks,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mycoffee-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 pb-32">
      <header className="mb-12">
        <button onClick={onBack} className="flex items-center gap-2 text-espresso/40 hover:text-espresso transition-colors font-bold uppercase tracking-widest text-xs mb-4">
          <ChevronLeft className="w-4 h-4" />
          Dashboard
        </button>
        <h1 className="text-5xl font-display font-black text-espresso tracking-tight">Settings</h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-72 space-y-2">
           {[
             { id: 'profile', label: 'Personal Profile', icon: <User className="w-5 h-5" /> },
             { id: 'custom', label: 'Custom Drinks', icon: <Star className="w-5 h-5" /> },
             { id: 'appearance', label: 'Appearance', icon: <Palette className="w-5 h-5" /> },
             { id: 'data', label: 'Data & Privacy', icon: <Shield className="w-5 h-5" /> },
           ].map(tab => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={cn(
                 "w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-bold transition-all text-left",
                 activeTab === tab.id 
                  ? "bg-coffee-brown text-white shadow-lg shadow-coffee-brown/20" 
                  : "text-espresso/40 hover:bg-white hover:text-espresso"
               )}
             >
               {tab.icon}
               {tab.label}
             </button>
           ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.section 
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-10 rounded-[3.5rem] border border-warm-beige/30 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-caramel/10 text-caramel rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-display font-black text-espresso">Personal Profile</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { label: 'Display Name', field: 'name', type: 'text' },
                    { label: 'Daily Limit (mg)', field: 'dailyLimit', type: 'number' },
                    { label: 'Weight (kg)', field: 'weight', type: 'number' },
                    { label: 'Target Bedtime', field: 'bedtime', type: 'time' },
                  ].map(input => (
                    <div key={input.field} className="space-y-4 text-left">
                      <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-[0.2em] px-4">{input.label}</label>
                      <input 
                        type={input.type}
                        value={profile[input.field as keyof UserProfile] as any}
                        onChange={(e) => updateProfile(input.field as any, input.type === 'number' ? Number(e.target.value) : e.target.value)}
                        className="w-full px-8 py-5 rounded-[2rem] bg-soft-white border border-warm-beige/20 focus:border-caramel/40 outline-none transition-all font-bold text-espresso"
                      />
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {activeTab === 'custom' && (
              <motion.section 
                key="custom"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-10 rounded-[3.5rem] border border-warm-beige/30 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-display font-black text-espresso">Custom Drinks</h2>
                </div>

                {customDrinks.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {customDrinks.map(drink => (
                      <div key={drink.id} className="flex items-center justify-between p-6 bg-soft-white rounded-[2rem] border border-warm-beige/10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
                            {drink.icon}
                          </div>
                          <div>
                            <p className="font-bold text-espresso">{drink.name}</p>
                            <p className="text-xs text-espresso/30">{drink.baseCaffeine}mg base</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => onRemoveCustomDrink(drink.id)}
                          className="p-3 text-espresso/10 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 opacity-30">
                    <p className="font-bold">No custom drinks created yet.</p>
                    <p className="text-sm">You can create them in the drink tracker.</p>
                  </div>
                )}
              </motion.section>
            )}

            {activeTab === 'appearance' && (
              <motion.section 
                key="appearance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-10 rounded-[3.5rem] border border-warm-beige/30 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center">
                    <Palette className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-display font-black text-espresso">Appearance</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-8 bg-soft-white rounded-[2.5rem] border border-warm-beige/10">
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                        profile.theme === 'dark' ? "bg-espresso text-white" : "bg-white text-amber-500 shadow-xl"
                      )}>
                        {profile.theme === 'dark' ? <Moon className="w-7 h-7" /> : <Sun className="w-7 h-7" />}
                      </div>
                      <div>
                         <p className="text-xl font-bold text-espresso">Dark Mode</p>
                         <p className="text-sm text-espresso/40">Easier on the eyes at night</p>
                      </div>
                    </div>
                    <button 
                      onClick={toggleTheme}
                      className={cn(
                        "w-20 h-10 rounded-full transition-all relative p-2",
                        profile.theme === 'dark' ? "bg-coffee-brown" : "bg-latte-cream shadow-inner"
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 bg-white rounded-full shadow-md transition-transform",
                        profile.theme === 'dark' ? "translate-x-10" : "translate-x-0"
                      )} />
                    </button>
                  </div>
                </div>
              </motion.section>
            )}

            {activeTab === 'data' && (
              <motion.section 
                key="data"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-10 rounded-[3.5rem] border border-warm-beige/30 shadow-xl overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                   <Shield className="w-48 h-48" />
                </div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-display font-black text-espresso flex items-center gap-3">
                    Data & Privacy
                  </h2>
                </div>

                <div className="space-y-8 relative z-10 text-left">
                  <div className="p-8 bg-red-50 rounded-[2.5rem] border border-red-100">
                    <div className="flex items-center gap-4 mb-4 text-red-600">
                      <AlertTriangle className="w-6 h-6" />
                      <h3 className="text-lg font-bold">Danger Zone</h3>
                    </div>
                    <p className="text-sm text-red-900/60 font-medium mb-8">
                      These actions affect your saved local app data and cannot be undone. 
                      No metabolic data is stored on our servers; everything stays on your device.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {!showResetConfirm ? (
                        <button 
                          onClick={() => setShowResetConfirm(true)}
                          className="flex-1 flex items-center justify-center gap-3 py-6 px-8 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition-all font-bold shadow-xl shadow-red-600/20"
                        >
                          <RefreshCw className="w-5 h-5" />
                          Purge All Data
                        </button>
                      ) : (
                        <div className="flex-1 flex gap-2">
                           <button 
                            onClick={onReset}
                            className="flex-[2] py-6 rounded-2xl bg-red-600 text-white font-bold hover:bg-red-700 transition-all shadow-xl shadow-red-600/30"
                           >
                             Confirm Purge
                           </button>
                           <button 
                            onClick={() => setShowResetConfirm(false)}
                            className="flex-1 py-6 rounded-2xl bg-white text-espresso font-bold border border-warm-beige/20 hover:bg-soft-white transition-all"
                           >
                             Cancel
                           </button>
                        </div>
                      )}
                      <button 
                         onClick={handleExport}
                         className="flex-1 flex items-center justify-center gap-3 py-6 px-8 rounded-2xl bg-espresso text-white hover:bg-black transition-all font-bold"
                      >
                         <Download className="w-5 h-5" />
                         Backup Data
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-espresso/20 pt-8">
                     <Info className="w-4 h-4" />
                     <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Version 2.4.0 • Built with Love</p>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
