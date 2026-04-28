export type View = 'LANDING' | 'ONBOARDING' | 'DASHBOARD' | 'ANALYTICS' | 'SETTINGS' | 'HISTORY' | 'EDUCATION' | 'GOALS';

export interface DrinkType {
  id: string;
  name: string;
  baseCaffeine: number; // mg
  icon: string;
  category: 'Coffee' | 'Tea' | 'Energy' | 'Other';
}

export interface ConsumptionLog {
  id: string;
  drinkId: string;
  name: string;
  caffeine: number;
  timestamp: Date;
  size: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  isCompleted: boolean;
  icon: string;
}

export interface UserProfile {
  name: string;
  weight: number;
  sensitivity: 'Low' | 'Medium' | 'High';
  sleepGoal: number; // hours
  bedtime?: string; // "22:00"
  lifestyle?: 'Student' | 'Office' | 'Creator' | 'Athlete' | 'Night worker';
  onboarded: boolean;
  dailyLimit: number;
  streak: number;
  lastLogDate?: string | null;
  theme: 'light' | 'dark';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'success' | 'alert';
  timestamp: Date;
  read: boolean;
}

export const DRINK_DATABASE: DrinkType[] = [
  { id: 'espresso', name: 'Espresso', baseCaffeine: 63, icon: '☕', category: 'Coffee' },
  { id: 'americano', name: 'Americano', baseCaffeine: 94, icon: '☕', category: 'Coffee' },
  { id: 'latte', name: 'Latte', baseCaffeine: 77, icon: '🥛', category: 'Coffee' },
  { id: 'cappuccino', name: 'Cappuccino', baseCaffeine: 77, icon: '☁️', category: 'Coffee' },
  { id: 'cold-brew', name: 'Cold Brew', baseCaffeine: 155, icon: '🧊', category: 'Coffee' },
  { id: 'flat-white', name: 'Flat White', baseCaffeine: 130, icon: '☕', category: 'Coffee' },
  { id: 'matcha', name: 'Matcha', baseCaffeine: 70, icon: '🍵', category: 'Tea' },
  { id: 'green-tea', name: 'Green Tea', baseCaffeine: 35, icon: '🍃', category: 'Tea' },
  { id: 'black-tea', name: 'Black Tea', baseCaffeine: 47, icon: '☕', category: 'Tea' },
  { id: 'energy-drink', name: 'Energy Drink', baseCaffeine: 160, icon: '⚡', category: 'Energy' },
  { id: 'pre-workout', name: 'Pre-workout', baseCaffeine: 250, icon: '💪', category: 'Energy' },
  { id: 'soda', name: 'Soda (Cola)', baseCaffeine: 35, icon: '🥤', category: 'Other' },
  { id: 'hot-chocolate', name: 'Hot Chocolate', baseCaffeine: 10, icon: '🍫', category: 'Other' },
  { id: 'water', name: 'Glass of Water', baseCaffeine: 0, icon: '💧', category: 'Other' },
];
