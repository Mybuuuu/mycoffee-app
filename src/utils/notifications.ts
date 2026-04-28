import { Notification, UserProfile, ConsumptionLog } from '../types';
import { getDailyTotal, isLateCaffeine } from './caffeine';

export const createNotification = (
  title: string,
  message: string,
  type: 'info' | 'warning' | 'success' | 'alert'
): Notification => ({
  id: Math.random().toString(36).substr(2, 9),
  title,
  message,
  type,
  timestamp: new Date(),
  read: false,
});

export const checkAndUpdateNotifications = (
  logs: ConsumptionLog[],
  profile: UserProfile,
  existingNotifications: Notification[]
): Notification | null => {
  const dailyTotal = getDailyTotal(logs);
  const todayStr = new Date().toISOString().split('T')[0];

  // Limit check (80%)
  if (dailyTotal >= profile.dailyLimit * 0.8 && dailyTotal < profile.dailyLimit) {
    const key = `limit-80-${todayStr}`;
    if (!existingNotifications.some(n => n.id.includes(key))) {
      return {
        ...createNotification(
          "Almost at your limit ☕",
          "You've reached 80% of your healthy daily caffeine limit. Maybe switch to water?",
          'warning'
        ),
        id: key
      };
    }
  }

  // Limit check (100%)
  if (dailyTotal >= profile.dailyLimit) {
    const key = `limit-100-${todayStr}`;
    if (!existingNotifications.some(n => n.id.includes(key))) {
      return {
        ...createNotification(
          "Daily limit reached!",
          "You've passed your recommended caffeine limit for today. Stay hydrated!",
          'alert'
        ),
        id: key
      };
    }
  }

  // Late caffeine check
  const lastLog = logs[0];
  if (lastLog && isLateCaffeine(lastLog.timestamp, profile.bedtime)) {
    const key = `late-caffeine-${lastLog.id}`;
    if (!existingNotifications.some(n => n.id.includes(key))) {
      return {
        ...createNotification(
          "Late caffeine alert",
          "Drinking caffeine this late might affect your deep sleep tonight.",
          'warning'
        ),
        id: key
      };
    }
  }

  return null;
};
