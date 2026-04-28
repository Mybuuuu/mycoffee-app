import React from 'react';
import { motion } from 'motion/react';
import { Bell, X, Info, AlertTriangle, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { Notification } from '../types';
import { cn } from '../lib/utils';

interface NotificationCenterProps {
  notifications: Notification[];
  onClose: () => void;
  onClear: () => void;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationCenter({ notifications, onClose, onClear, onMarkAsRead }: NotificationCenterProps) {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-espresso/30 backdrop-blur-md z-[300]"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-full max-w-lg bg-soft-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] z-[301] flex flex-col border-l border-warm-beige/30"
      >
        <div className="p-10 border-b border-warm-beige/30 flex items-center justify-between bg-white/50 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-espresso text-soft-white rounded-2xl flex items-center justify-center shadow-lg shadow-espresso/20">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-black text-espresso tracking-tight">Intelligence Log</h2>
              <p className="text-[10px] font-bold text-espresso/30 uppercase tracking-[0.2em] mt-1">{notifications.length} Active Alerts</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-4 rounded-2xl hover:bg-white transition-all text-espresso/20 hover:text-espresso"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-6 hide-scrollbar">
          {notifications.length > 0 ? (
            notifications.map((n, i) => (
              <motion.div 
                key={n.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onMarkAsRead(n.id)}
                className={cn(
                  "p-8 rounded-[2.5rem] border transition-all cursor-pointer group relative overflow-hidden",
                  !n.read ? "bg-white border-caramel/20 shadow-xl" : "bg-white/50 border-warm-beige/10 opacity-60",
                  n.type === 'alert' ? "border-l-4 border-l-red-500" : ""
                )}
              >
                {!n.read && (
                  <div className="absolute top-8 right-8 w-2 h-2 bg-caramel rounded-full" />
                )}
                
                <div className="flex items-start gap-6">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm shrink-0",
                    n.type === 'alert' ? "bg-red-500 text-white" : 
                    n.type === 'success' ? "bg-emerald-500 text-white" : 
                    "bg-blue-500 text-white"
                  )}>
                    {n.type === 'alert' ? <AlertTriangle className="w-5 h-5" /> : 
                     n.type === 'success' ? <CheckCircle className="w-5 h-5" /> : 
                     <Info className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-display font-black text-espresso mb-1 transition-colors group-hover:text-caramel">
                      {n.title}
                    </h4>
                    <p className="text-sm text-espresso/50 font-medium leading-relaxed mb-4">{n.message}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-espresso/20 uppercase tracking-[0.2em]">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-32 px-12">
              <div className="w-32 h-32 bg-latte-cream rounded-[3rem] flex items-center justify-center mb-10 shadow-inner">
                <Bell className="w-12 h-12 text-espresso/5" />
              </div>
              <h3 className="text-2xl font-display font-black text-espresso mb-4 tracking-tight">Bio-Rhythm Stable</h3>
              <p className="text-espresso/40 font-medium max-w-[240px] leading-relaxed">System logs are clear. Your metabolic clearance is operating within standard parameters.</p>
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-10 bg-white border-t border-warm-beige/30">
            <button 
              onClick={onClear}
              className="w-full py-6 rounded-[2rem] bg-soft-white text-sm font-bold text-red-500 hover:bg-red-50 transition-all flex items-center justify-center gap-3 border border-red-100"
            >
              <Trash2 className="w-4 h-4" />
              Purge Log History
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}
