import { useMemo } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  TrendingUp, 
  Calendar, 
  Zap, 
  PieChart, 
  Activity, 
  Clock, 
  Info,
  CheckCircle,
  AlertCircle,
  Coffee
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ConsumptionLog, UserProfile, DRINK_DATABASE } from '../types';
import { 
  calculateWeeklyAverage, 
  calculatePeakHour, 
  groupLogsByDate,
  getProgressPercentage
} from '../utils/caffeine';

interface AnalyticsProps {
  logs: ConsumptionLog[];
  profile: UserProfile;
  onBack: () => void;
}

export default function Analytics({ logs, profile, onBack }: AnalyticsProps) {
  const chartData = useMemo(() => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toDateString();
    });

    return last7Days.map(day => {
      const dayLogs = logs.filter(l => new Date(l.timestamp).toDateString() === day);
      const total = dayLogs.reduce((sum, l) => sum + l.caffeine, 0);
      return {
        name: day.split(' ')[0], // Mon, Tue...
        amount: total,
        fullDate: day
      };
    });
  }, [logs]);

  const stats = useMemo(() => {
    const weeklyAvg = calculateWeeklyAverage(logs);
    const peakHour = calculatePeakHour(logs);
    const peakIntake = Math.max(...chartData.map(d => d.amount));
    
    // Days under limit (past week)
    const daysUnderLimit = chartData.filter(d => d.amount <= profile.dailyLimit && d.amount > 0).length;
    
    // Category counts
    const categoryCounts: Record<string, number> = {};
    logs.forEach(log => {
      const drink = DRINK_DATABASE.find(d => d.id === log.drinkId);
      const cat = drink?.category || 'Other';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
    
    const topCategory = Object.entries(categoryCounts).length > 0 
      ? Object.entries(categoryCounts).sort((a,b) => b[1] - a[1])[0][0]
      : 'None';

    return { 
      weeklyAvg: Math.round(weeklyAvg), 
      peakIntake, 
      peakHour, 
      daysUnderLimit,
      topCategory
    };
  }, [logs, chartData, profile.dailyLimit]);

  const insights = useMemo(() => {
    const list = [];
    if (stats.peakHour >= 0) {
      const period = stats.peakHour >= 12 ? 'PM' : 'AM';
      const hour = stats.peakHour % 12 || 12;
      list.push({
        text: `Your peak caffeine intake is around ${hour} ${period}.`,
        icon: <Clock className="w-5 h-5 text-blue-500" />
      });
    }
    if (stats.daysUnderLimit >= 5) {
      list.push({
        text: `Great consistency! You stayed under your limit ${stats.daysUnderLimit} of the last 7 days.`,
        icon: <CheckCircle className="w-5 h-5 text-emerald-500" />
      });
    } else if (logs.length > 5) {
      list.push({
        text: `You've exceeded your limit ${7 - stats.daysUnderLimit} times this week. Try reducing afternoon cups.`,
        icon: <AlertCircle className="w-5 h-5 text-amber-500" />
      });
    }
    if (stats.topCategory !== 'None') {
      list.push({
        text: `${stats.topCategory} is your most logged category this week.`,
        icon: <Activity className="w-5 h-5 text-caramel" />
      });
    }
    return list;
  }, [stats, logs.length]);

  if (logs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 md:p-12 min-h-[80vh] flex flex-col">
        <button onClick={onBack} className="flex items-center gap-2 text-espresso/40 hover:text-espresso transition-colors font-bold uppercase tracking-widest text-xs mb-12">
          <ChevronLeft className="w-4 h-4" />
          Dashboard
        </button>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 bg-latte-cream rounded-[3rem] flex items-center justify-center mb-10 shadow-inner">
               <TrendingUp className="w-12 h-12 text-espresso/10" />
            </div>
            <h2 className="text-4xl font-display font-black text-espresso mb-4">No Insights Yet</h2>
            <p className="text-espresso/40 font-medium max-w-sm leading-relaxed mb-10">
              Log your first drinks to unlock powerful analytics about your caffeine habits and energy levels.
            </p>
            <button 
              onClick={onBack}
              className="px-10 py-5 bg-coffee-brown text-white rounded-[2rem] font-bold transition-all hover:scale-105"
            >
              Start Logging
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12">
      <header className="mb-12">
        <button onClick={onBack} className="flex items-center gap-2 text-espresso/40 hover:text-espresso transition-colors font-bold uppercase tracking-widest text-xs mb-4">
          <ChevronLeft className="w-4 h-4" />
          Dashboard
        </button>
        <h1 className="text-5xl font-display font-black text-espresso tracking-tight">Caffeine Analytics</h1>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <StatCard 
          icon={<TrendingUp className="w-6 h-6" />}
          label="Weekly Average"
          value={`${stats.weeklyAvg}mg`}
          subtext="mg per day"
          color="bg-caramel"
        />
        <StatCard 
          icon={<Zap className="w-6 h-6" />}
          label="Peak Intake"
          value={`${stats.peakIntake}mg`}
          subtext="Past 7 days"
          color="bg-coffee-brown"
        />
        <StatCard 
          icon={<Activity className="w-6 h-6" />}
          label="Adherence"
          value={`${Math.round((stats.daysUnderLimit / 7) * 100)}%`}
          subtext="Healthy days"
          color="bg-emerald-500"
        />
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-warm-beige/30 shadow-xl overflow-hidden">
            <div className="flex items-center justify-between mb-8 px-4">
              <h3 className="text-xl font-display font-black text-espresso flex items-center gap-3">
                <Calendar className="w-5 h-5 text-caramel" />
                7-Day Intake Trend
              </h3>
            </div>
            <div className="h-[350px] w-full pr-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C68B59" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C68B59" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EADBC8" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#2C1810', opacity: 0.4, fontSize: 10, fontWeight: 700 }}
                    dy={15}
                  />
                  <YAxis hide domain={[0, Math.max(profile.dailyLimit, stats.peakIntake) + 50]} />
                  <Tooltip 
                    content={<CustomTooltip />}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#C68B59" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-warm-beige/30 shadow-xl">
             <h3 className="text-xl font-display font-black text-espresso mb-8 flex items-center gap-3">
               <Info className="w-5 h-5 text-caramel" />
               Personalized Insights
             </h3>
             <div className="grid gap-6">
                {insights.map((insight, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-5 p-6 rounded-3xl bg-latte-cream/20 border border-warm-beige/10"
                  >
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                        {insight.icon}
                     </div>
                     <p className="text-sm font-medium text-espresso/70">{insight.text}</p>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-espresso p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                 <Zap className="w-32 h-32" />
              </div>
              <h3 className="text-xl font-display font-black mb-8 relative z-10">Healthy Range</h3>
              <div className="space-y-6 relative z-10">
                 <div className="flex items-end justify-between">
                    <div>
                       <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Weekly Success</p>
                       <p className="text-3xl font-display font-black text-emerald-400">{stats.daysUnderLimit} / 7 Days</p>
                    </div>
                 </div>
                 <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(stats.daysUnderLimit / 7) * 100}%` }}
                      className="h-full bg-emerald-400"
                    />
                 </div>
                 <p className="text-xs text-white/40 font-medium leading-relaxed">
                   Great job! You've maintained your healthy caffeine limit for most of the week.
                 </p>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] border border-warm-beige/30 shadow-xl">
             <h3 className="text-xl font-display font-black text-espresso mb-8">Most Logged</h3>
             <div className="space-y-6">
                {stats.topCategory !== 'None' ? (
                  <div className="flex items-center gap-5 p-6 rounded-3xl bg-soft-white border border-warm-beige/20">
                    <div className="w-12 h-12 bg-caramel text-white rounded-2xl flex items-center justify-center shadow-md">
                      <Coffee className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-lg font-display font-black text-espresso">{stats.topCategory}</p>
                      <p className="text-[10px] font-bold text-espresso/30 uppercase tracking-widest">Favorite Choice</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-espresso/30 text-sm py-4">No categories yet.</p>
                )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, subtext, color }: { icon: React.ReactNode, label: string, value: string, subtext: string, color: string }) {
  return (
    <div className="bg-white p-8 rounded-[3rem] border border-warm-beige/30 shadow-xl flex items-center gap-6 group hover:translate-y-[-4px] transition-all duration-500">
      <div className={`w-16 h-16 ${color} text-white rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-espresso/30 uppercase tracking-[0.2em] mb-1">{label}</p>
        <p className="text-3xl font-display font-black text-espresso mb-1">{value}</p>
        <p className="text-xs text-espresso/40 font-medium">{subtext}</p>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-espresso p-5 rounded-3xl shadow-2xl border border-white/5">
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">{payload[0].payload.fullDate}</p>
        <p className="text-white text-xl font-display font-black">{payload[0].value} <span className="text-xs text-white/30">mg</span></p>
      </div>
    );
  }
  return null;
};
