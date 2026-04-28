import { ConsumptionLog, UserProfile } from '../types';

export const getTodaysLogs = (logs: ConsumptionLog[]) => {
  const today = new Date().setHours(0, 0, 0, 0);
  return logs.filter(log => new Date(log.timestamp).setHours(0, 0, 0, 0) === today);
};

export const getDailyTotal = (logs: ConsumptionLog[]) => {
  return getTodaysLogs(logs).reduce((acc, log) => acc + log.caffeine, 0);
};

export const getRemainingLimit = (total: number, limit: number) => {
  return Math.max(0, limit - total);
};

export const getCaffeineStatus = (total: number, limit: number) => {
  if (total >= limit) return 'Over Limit';
  if (total >= limit * 0.8) return 'Almost at Limit';
  return 'Healthy Range';
};

export const getProgressPercentage = (total: number, limit: number) => {
  return Math.min((total / limit) * 100, 100);
};

export const isLateCaffeine = (timestamp: Date | string, bedtime?: string) => {
  const time = new Date(timestamp);
  const hour = time.getHours();
  
  if (bedtime) {
    const [bedHour] = bedtime.split(':').map(Number);
    const hoursBeforeBed = (bedHour + 24 - hour) % 24;
    return hoursBeforeBed < 8;
  }
  
  return hour >= 18; // Default to 6 PM
};

export const estimateSleepImpact = (caffeine: number, timestamp: Date | string, bedtime?: string) => {
  const isLate = isLateCaffeine(timestamp, bedtime);
  if (!isLate) return 'Low';
  if (caffeine > 150) return 'High';
  return 'Moderate';
};

export const groupLogsByDate = (logs: ConsumptionLog[]) => {
  return logs.reduce((acc, log) => {
    const date = new Date(log.timestamp).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(log);
    return acc;
  }, {} as Record<string, ConsumptionLog[]>);
};

export const calculateWeeklyAverage = (logs: ConsumptionLog[]) => {
  const last7Days = new Array(7).fill(0).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  });

  const dailyTotals = last7Days.map(dayTime => {
    return logs
      .filter(log => new Date(log.timestamp).setHours(0, 0, 0, 0) === dayTime)
      .reduce((sum, log) => sum + log.caffeine, 0);
  });

  return dailyTotals.reduce((a, b) => a + b, 0) / 7;
};

export const calculatePeakHour = (logs: ConsumptionLog[]) => {
  const hours = new Array(24).fill(0);
  logs.forEach(log => {
    const h = new Date(log.timestamp).getHours();
    hours[h]++;
  });
  const peak = hours.indexOf(Math.max(...hours));
  return peak;
};
