import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Coffee, Zap, Leaf, Check, ChevronRight, Clock, Moon, Sparkles, Star, Plus } from 'lucide-react';
import { DRINK_DATABASE, DrinkType, ConsumptionLog } from '../types';
import { cn } from '../lib/utils';

interface DrinkTrackerProps {
  onClose: () => void;
  onLog: (log: ConsumptionLog) => void;
  customDrinks: DrinkType[];
  onAddCustomDrink: (drink: DrinkType) => void;
}

const CATEGORIES = [
  { id: 'all', name: 'All Drinks', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'Coffee', name: 'Coffee', icon: <Coffee className="w-4 h-4" /> },
  { id: 'Tea', name: 'Tea', icon: <Leaf className="w-4 h-4" /> },
  { id: 'Energy', name: 'Energy', icon: <Zap className="w-4 h-4" /> },
  { id: 'Custom', name: 'Saved', icon: <Star className="w-4 h-4" /> },
];

const SIZES = [
  { id: 'S', name: 'Small', multiplier: 0.8, volume: '8oz' },
  { id: 'M', name: 'Medium', multiplier: 1, volume: '12oz' },
  { id: 'L', name: 'Large', multiplier: 1.5, volume: '16oz' },
];

export default function DrinkTracker({ onClose, onLog, customDrinks, onAddCustomDrink }: DrinkTrackerProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedDrink, setSelectedDrink] = useState<DrinkType | null>(null);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customDrinkName, setCustomDrinkName] = useState('');
  const [customDrinkCaffeine, setCustomDrinkCaffeine] = useState('');

  const combinedDatabase = useMemo(() => [...DRINK_DATABASE, ...customDrinks], [customDrinks]);

  const filteredDrinks = useMemo(() => {
    return combinedDatabase.filter(d => {
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === 'all' || 
                         (category === 'Custom' ? customDrinks.some(cd => cd.id === d.id) : d.category === category);
      return matchesSearch && matchesCat;
    });
  }, [search, category, combinedDatabase, customDrinks]);

  const handleCreateCustom = () => {
    if (!customDrinkName || !customDrinkCaffeine) return;
    const newDrink: DrinkType = {
      id: `custom-${Date.now()}`,
      name: customDrinkName,
      baseCaffeine: Number(customDrinkCaffeine),
      icon: '✨',
      category: 'Other'
    };
    onAddCustomDrink(newDrink);
    setShowCustomForm(false);
    setCustomDrinkName('');
    setCustomDrinkCaffeine('');
    setCategory('Custom');
  };

  const handleLog = () => {
    if (!selectedDrink) return;
    
    const log: ConsumptionLog = {
      id: Math.random().toString(36).substr(2, 9),
      drinkId: selectedDrink.id,
      name: selectedDrink.name,
      caffeine: Math.round(selectedDrink.baseCaffeine * selectedSize.multiplier),
      timestamp: new Date(),
      size: selectedSize.name,
    };
    
    setIsSuccess(true);
    setTimeout(() => {
      onLog(log);
      onClose();
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-espresso/80 backdrop-blur-md z-[200] flex items-end md:items-center justify-center p-0 md:p-6"
    >
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-soft-white w-full max-w-2xl h-[94vh] md:h-auto md:max-h-[90vh] rounded-t-[4rem] md:rounded-[4rem] overflow-hidden flex flex-col relative shadow-2xl"
      >
        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-[250] flex flex-col items-center justify-center text-center p-12"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20"
              >
                <Check className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-4xl font-display font-black text-espresso mb-2">Drink Logged!</h2>
              <p className="text-espresso/40 font-medium tracking-tight">Your caffeine status has been updated.</p>
            </motion.div>
          )}

          {showCustomForm && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 z-[240] bg-white flex flex-col items-center justify-center p-12 text-center"
            >
              <button 
                onClick={() => setShowCustomForm(false)}
                className="absolute top-10 right-10 p-4 rounded-2xl bg-soft-white text-espresso/20 hover:text-espresso transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="w-20 h-20 bg-caramel/10 text-caramel rounded-3xl flex items-center justify-center mb-8">
                <Sparkles className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-display font-black text-espresso mb-8">Create Custom Drink</h2>
              <div className="w-full max-w-sm space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest pl-4">Drink Name</label>
                  <input 
                    type="text"
                    placeholder="e.g. Extra Strong Brew"
                    value={customDrinkName}
                    onChange={(e) => setCustomDrinkName(e.target.value)}
                    className="w-full px-8 py-6 rounded-[2rem] bg-soft-white border border-warm-beige/20 focus:border-caramel/40 outline-none font-bold text-espresso"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest pl-4">Caffeine (mg)</label>
                  <input 
                    type="number"
                    placeholder="e.g. 150"
                    value={customDrinkCaffeine}
                    onChange={(e) => setCustomDrinkCaffeine(e.target.value)}
                    className="w-full px-8 py-6 rounded-[2rem] bg-soft-white border border-warm-beige/20 focus:border-caramel/40 outline-none font-bold text-espresso"
                  />
                </div>
                <button 
                  onClick={handleCreateCustom}
                  className="w-full py-7 rounded-[2rem] bg-caramel text-white font-display font-black text-xl shadow-xl shadow-caramel/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Save & Select
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-10 border-b border-warm-beige/30 bg-white/50 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display font-black text-espresso tracking-tight">Add Caffeine</h2>
              <p className="text-[10px] font-bold text-espresso/30 uppercase tracking-[0.4em] mt-2">What are you drinking?</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowCustomForm(true)}
                className="px-6 py-4 rounded-2xl bg-caramel/10 text-caramel font-bold text-xs flex items-center gap-2 hover:bg-caramel/20 transition-all border border-caramel/10"
              >
                <Plus className="w-4 h-4" />
                Custom
              </button>
              <button onClick={onClose} className="p-4 rounded-[1.5rem] bg-soft-white hover:bg-warm-beige/20 transition-colors">
                <X className="w-6 h-6 text-espresso/20" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-espresso/20 group-focus-within:text-caramel transition-colors" />
              <input 
                type="text"
                placeholder="Search compounds..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-10 py-6 rounded-[2.5rem] bg-white border border-warm-beige/30 focus:border-caramel/40 outline-none transition-all font-bold text-espresso placeholder:text-espresso/10"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "px-8 py-4 rounded-3xl text-xs font-bold flex items-center gap-3 whitespace-nowrap transition-all border-2",
                    category === cat.id 
                      ? "bg-coffee-brown border-coffee-brown text-white shadow-xl shadow-coffee-brown/20" 
                      : "bg-white border-warm-beige/20 text-espresso/40 hover:border-caramel/30"
                  )}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 grid grid-cols-2 lg:grid-cols-3 gap-5 hide-scrollbar min-h-[350px]">
          {filteredDrinks.map(drink => (
            <button
              key={drink.id}
              onClick={() => setSelectedDrink(drink)}
              className={cn(
                "p-8 rounded-[3.5rem] border-2 transition-all flex flex-col items-center justify-center text-center group relative",
                selectedDrink?.id === drink.id 
                  ? "bg-white border-caramel shadow-2xl scale-[1.05]" 
                  : "bg-white/50 border-warm-beige/10 hover:border-warm-beige/40"
              )}
            >
              <div className={cn(
                "w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl mb-6 transition-all duration-700",
                selectedDrink?.id === drink.id ? "bg-caramel text-white rotate-12" : "bg-latte-cream/40"
              )}>
                {drink.icon}
              </div>
              <p className="font-display font-black text-espresso text-lg mb-1">{drink.name}</p>
              <p className="text-[10px] font-bold text-espresso/20 uppercase tracking-[0.2em]">{drink.baseCaffeine}mg base</p>
              
              {selectedDrink?.id === drink.id && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute top-6 right-6"
                >
                   <div className="w-8 h-8 rounded-full bg-caramel flex items-center justify-center shadow-lg shadow-caramel/20">
                     <Check className="w-4 h-4 text-white" />
                   </div>
                </motion.div>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {selectedDrink && (
            <motion.div 
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              className="p-10 bg-white border-t border-warm-beige/30 shadow-[0_-20px_60px_rgba(0,0,0,0.1)] relative z-10"
            >
              <div className="flex flex-col lg:flex-row items-center gap-10">
                <div className="flex-1 w-full space-y-4">
                  <div className="flex items-center justify-between mb-4 px-4">
                    <span className="text-[10px] font-bold text-espresso/40 uppercase tracking-widest">Select Size</span>
                    <span className="text-xl font-display font-black text-espresso">
                      {Math.round(selectedDrink.baseCaffeine * selectedSize.multiplier)}mg
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 p-2 bg-soft-white rounded-[3rem] border border-warm-beige/20 shadow-inner">
                    {SIZES.map(size => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "py-5 rounded-[2.5rem] text-xs font-bold transition-all flex flex-col items-center",
                          selectedSize.id === size.id 
                            ? "bg-white text-caramel shadow-xl border border-warm-beige/10" 
                            : "text-espresso/30 opacity-60 hover:opacity-100 hover:scale-105"
                        )}
                      >
                        <span>{size.name}</span>
                        <span className="text-[9px] opacity-40 font-medium">{size.volume}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 w-full flex items-center gap-4">
                  <div className="flex items-center gap-2 p-5 bg-latte-cream/40 rounded-[2.5rem] border border-warm-beige/20 flex-1">
                    <Moon className="w-5 h-5 text-espresso/20" />
                    <div className="text-left">
                       <p className="text-[10px] font-bold text-espresso/30 uppercase tracking-widest">Sleep Impact</p>
                       <p className="text-xs font-bold text-espresso">~9.4h clearance</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleLog}
                    className="flex-[2] py-8 rounded-[3rem] bg-coffee-brown text-white font-display font-black text-xl flex items-center justify-center gap-4 hover:scale-[1.03] active:scale-[0.97] transition-all premium-shadow group shadow-coffee-brown/30"
                  >
                    Log Drink
                    <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
