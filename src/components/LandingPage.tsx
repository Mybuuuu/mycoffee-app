import React from 'react';
import { motion } from 'motion/react';
import { Coffee, ChevronRight, Zap, Shield, Moon, Star, ArrowRight, Play, Sparkles } from 'lucide-react';
import { View } from '../types';

interface LandingPageProps {
  onStart: () => void;
  onNavigate: (view: View) => void;
}

export default function LandingPage({ onStart, onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-soft-white overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-espresso p-2 rounded-xl">
             <Coffee className="w-6 h-6 text-soft-white" />
          </div>
          <span className="font-display font-black text-2xl text-espresso tracking-tight">MyCoffee</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <button className="text-sm font-bold text-espresso/40 hover:text-espresso transition-colors">Protocol</button>
          <button className="text-sm font-bold text-espresso/40 hover:text-espresso transition-colors">Science</button>
          <button className="text-sm font-bold text-espresso/40 hover:text-espresso transition-colors">Lab</button>
        </div>
        <button 
          onClick={onStart}
          className="px-8 py-4 bg-espresso text-soft-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all text-sm"
        >
          Initialize Lab
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-latte-cream rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-coffee-brown mb-10 shadow-sm border border-warm-beige/20">
               <Sparkles className="w-4 h-4 fill-coffee-brown" />
               Metabolic Intelligence v2.4
            </div>
            <h1 className="text-7xl md:text-8xl font-display font-black text-espresso leading-[0.85] tracking-tighter mb-10">
              Drink Smart.<br />
              <span className="text-caramel">Stay Sharp.</span>
            </h1>
            <p className="text-xl md:text-2xl text-espresso/40 font-medium leading-relaxed max-w-lg mb-12">
              Optimize your caffeine intake patterns with bio-metric precision. Engineer your focus, protect your sleep.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto px-12 py-8 bg-coffee-brown text-white rounded-[2.5rem] font-display font-black text-2xl flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all premium-shadow shadow-coffee-brown/30"
              >
                Access Prototype
                <ArrowRight className="w-8 h-8" />
              </button>
              <button className="flex items-center gap-4 text-espresso font-bold hover:gap-6 transition-all group">
                 <div className="w-16 h-16 rounded-full bg-white border border-warm-beige/30 flex items-center justify-center shadow-lg group-hover:shadow-caramel/10">
                   <Play className="w-6 h-6 fill-espresso" />
                 </div>
                 Watch Protocol
              </button>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-caramel/5 rounded-full blur-[120px]" />
             <div className="relative bg-white p-6 rounded-[5rem] border border-warm-beige/30 shadow-[0_50px_100px_-20px_rgba(111,78,55,0.2)]">
                <img 
                  src="https://images.unsplash.com/photo-1511920170033-f83969a4c348?q=80&w=1000&auto=format&fit=crop" 
                  alt="Premium Coffee" 
                  className="rounded-[4.5rem] w-full h-[600px] object-cover"
                />
                
                {/* Floating UI Elements */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-10 -right-10 bg-espresso p-8 rounded-[3rem] text-soft-white shadow-2xl border border-white/10"
                >
                   <p className="text-[10px] font-bold text-caramel uppercase tracking-widest mb-4">Deep Focus Active</p>
                   <div className="flex items-center gap-6">
                      <div>
                         <p className="text-3xl font-display font-black">160mg</p>
                         <p className="text-[8px] text-white/40 uppercase">Total Load</p>
                      </div>
                      <div className="w-px h-10 bg-white/10" />
                      <Zap className="w-10 h-10 text-caramel fill-caramel" />
                   </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[3rem] text-espresso shadow-2xl border border-warm-beige/30"
                >
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                         <Shield className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">Safe Zone</span>
                   </div>
                   <p className="text-sm font-medium text-espresso/40">Next cup: <span className="font-bold text-espresso">Recommended in 4h</span></p>
                </motion.div>
             </div>
          </motion.div>
        </div>
      </main>

      {/* Social Proof */}
      <section className="bg-espresso py-24">
        <div className="max-w-7xl mx-auto px-8">
           <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.5em] mb-16 underline decoration-caramel decoration-2 underline-offset-8">Engineered for High-Performance Teams</p>
           <div className="flex flex-wrap justify-center items-center gap-20 opacity-30 grayscale contrast-125">
             <span className="text-3xl font-display font-black text-white italic tracking-tighter">Stripe</span>
             <span className="text-3xl font-display font-black text-white italic tracking-tighter">Linear</span>
             <span className="text-3xl font-display font-black text-white italic tracking-tighter">Figma</span>
             <span className="text-3xl font-display font-black text-white italic tracking-tighter">Vercel</span>
             <span className="text-3xl font-display font-black text-white italic tracking-tighter">Notion</span>
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-24">
           <h2 className="text-5xl font-display font-black text-espresso mb-6">Metabolic Command Center.</h2>
           <p className="text-xl text-espresso/40 font-medium max-w-2xl mx-auto">More than a tracker. A biological engineering tool for modern digital operators.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<Zap className="w-8 h-8" />}
            title="Real-time Clearance"
            desc="Track the half-life of your specific drink types with metabolic adjustment logic."
          />
          <FeatureCard 
            icon={<Moon className="w-8 h-8" />}
            title="Sleep Shield"
            desc="Predict the optimal timestamp for your last cup to ensure 90%+ sleep quality scores."
          />
          <FeatureCard 
            icon={<Shield className="w-8 h-8" />}
            title="Threshold Alarms"
            desc="Smart alerts that trigger when you hit personalized cardiovascular saturation levels."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-warm-beige/20 bg-white">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
             <Coffee className="w-8 h-8 text-coffee-brown" />
             <span className="font-display font-black text-2xl text-espresso">MyCoffee</span>
          </div>
          <div className="flex items-center gap-10">
             <button className="text-xs font-bold text-espresso/40 uppercase tracking-widest hover:text-espresso transition-colors">Privacy</button>
             <button className="text-xs font-bold text-espresso/40 uppercase tracking-widest hover:text-espresso transition-colors">Terms</button>
             <button className="text-xs font-bold text-espresso/40 uppercase tracking-widest hover:text-espresso transition-colors">Lab Access</button>
          </div>
          <p className="text-xs font-bold text-espresso/20 uppercase tracking-widest">© 2026 MyCoffee Intelligence Lab</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-12 rounded-[4rem] bg-white border border-warm-beige/30 shadow-xl hover:shadow-2xl transition-all group">
       <div className="w-16 h-16 bg-latte-cream rounded-2xl flex items-center justify-center text-coffee-brown mb-8 group-hover:scale-110 transition-transform">
          {icon}
       </div>
       <h3 className="text-2xl font-display font-black text-espresso mb-4">{title}</h3>
       <p className="text-espresso/40 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}
