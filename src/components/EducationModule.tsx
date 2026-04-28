import { motion } from 'motion/react';
import { ChevronLeft, GraduationCap, Star, Coffee, Zap, Moon, Heart, Info, ChevronRight, Clock, Sparkles } from 'lucide-react';

interface EducationModuleProps {
  onBack: () => void;
}

const ARTICLES = [
  {
    id: '1',
    title: 'The Half-Life Mystery',
    summary: 'Why your 2 PM espresso is still haunting your sleep at midnight. Learn how to time your last sip.',
    icon: <Clock className="w-6 h-6" />,
    color: 'bg-amber-50 text-amber-600',
    readTime: '3 min',
    tag: 'Science'
  },
  {
    id: '2',
    title: 'The 90-Minute Rule',
    summary: 'Waiting 90 minutes after waking up can naturally cure your afternoon crash. Here is the protocol.',
    icon: <Sun className="w-6 h-6" />,
    color: 'bg-orange-50 text-orange-600',
    readTime: '4 min',
    tag: 'Daily Hack'
  },
  {
    id: '3',
    title: 'Deep Sleep Mastery',
    summary: 'Caffeine blocks your "sleep pressure" signals. Discover how to clear it before bedtime.',
    icon: <Moon className="w-6 h-6" />,
    color: 'bg-blue-50 text-blue-600',
    readTime: '5 min',
    tag: 'Wellness'
  },
  {
    id: '4',
    title: 'Tea: The Jitter-Free IQ',
    summary: 'Why L-Theanine in tea makes you focused without the anxiety. A guide for high performers.',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'bg-emerald-50 text-emerald-600',
    readTime: '3 min',
    tag: 'Performance'
  }
];

function Sun(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

export default function EducationModule({ onBack }: EducationModuleProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 pb-32">
      <header className="mb-12">
        <button onClick={onBack} className="flex items-center gap-2 text-espresso/40 hover:text-espresso transition-colors font-bold uppercase tracking-widest text-xs mb-6">
          <ChevronLeft className="w-4 h-4" />
          Dashboard
        </button>
        <h1 className="text-5xl font-display font-black text-espresso tracking-tight">Caffeine Academy</h1>
        <p className="text-espresso/40 font-medium mt-2">Expert tips for a smarter, sharper you.</p>
      </header>

      <section className="mb-12 relative overflow-hidden bg-coffee-brown rounded-[3.5rem] p-10 text-soft-white group shadow-2xl shadow-coffee-brown/20">
        <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 group-hover:scale-110 group-hover:rotate-45 transition-all duration-1000">
           <GraduationCap className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-lg">
           <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full w-fit mb-8 text-[10px] font-bold uppercase tracking-widest text-caramel">
             <Star className="w-3 h-3 fill-caramel" />
             Must Read
           </div>
           <h2 className="text-4xl font-display font-black mb-6 leading-tight">Mastering Your <br />Energy Cycles</h2>
           <p className="text-soft-white/60 font-medium leading-relaxed mb-10">Stop crashing at 3 PM. Learn how to work with your bodies natural rhythms instead of fighting them with more coffee.</p>
           <button className="px-10 py-5 bg-caramel text-espresso rounded-3xl font-display font-black text-sm flex items-center gap-3 hover:scale-105 active:scale-95 transition-all group shadow-xl shadow-caramel/20">
             Unlock Insight
             <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {ARTICLES.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[3rem] border border-warm-beige/30 hover:border-caramel/30 transition-all group cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1"
          >
            <div className={`w-14 h-14 ${article.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
              {article.icon}
            </div>
            <div className="flex items-center gap-2 mb-4">
               <span className="text-[10px] font-bold text-espresso/20 uppercase tracking-widest">{article.readTime} Read</span>
               <span className="w-1 h-1 bg-warm-beige rounded-full" />
               <span className="text-[10px] font-bold text-caramel uppercase tracking-widest">{article.tag}</span>
            </div>
            <h3 className="text-2xl font-display font-black text-espresso mb-4 group-hover:text-caramel transition-colors leading-tight">{article.title}</h3>
            <p className="text-espresso/40 font-medium text-sm leading-relaxed mb-0">{article.summary}</p>
          </motion.div>
        ))}
      </div>

      <div className="p-12 rounded-[4rem] bg-latte-cream/30 border border-warm-beige/20 text-center relative overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-br from-caramel/5 to-transparent transition-opacity opacity-0 group-hover:opacity-100" />
         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm relative z-10">
            <Info className="w-8 h-8 text-caramel" />
         </div>
         <h3 className="text-2xl font-display font-black text-espresso mb-3 relative z-10">Beyond the Beans</h3>
         <p className="text-espresso/40 font-medium max-w-sm mx-auto leading-relaxed mb-0 text-sm relative z-10">Our community has analyzed over 500+ drinks. Access the full database and metabolic profiles in our deep-dive library.</p>
         <button className="mt-10 px-8 py-4 text-xs font-bold text-caramel uppercase tracking-widest hover:text-espresso transition-colors relative z-10">
           Browse Full Library
         </button>
      </div>
    </div>
  );
}
