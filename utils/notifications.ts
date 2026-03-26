import * as Notifications from 'expo-notifications';
import { hasWalkedToday as checkWalkedToday } from './walksStorage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Schedules a daily reminder at 15:00 if the user hasn't walked today.
 * If they have already walked or it's past 15:00, it schedules for tomorrow.
 */
export const scheduleDailyReminder = async (isNotificationEnabled: boolean = true) => {
  if (!isNotificationEnabled) {
    await Notifications.cancelAllScheduledNotificationsAsync(); // Clear all if disabled
    return;
  }

  const hasWalkedToday = await checkWalkedToday();
  const now = new Date();
  const reminderTime = new Date();
  reminderTime.setHours(15, 0, 0, 0);

  // If already walked today OR it's past 15:00, move reminder to tomorrow
  if (hasWalkedToday || now > reminderTime) {
    reminderTime.setDate(reminderTime.getDate() + 1);
  }

  // Cancel previous reminders to avoid duplicates
  await Notifications.cancelAllScheduledNotificationsAsync();

 await Notifications.scheduleNotificationAsync({
    content: {
      title: "Pora na spacer! 🐾",
      body: "Twoje dzienne cele czekają. Czy wyjdziesz dzisiaj na spacer?",
      sound: true,
    },
    trigger: {
      type: 'time',       // 🔑 Wymagane!
      timestamp: reminderTime.getTime(), // milisekundy od epoki
    } as any,
  });

  console.log(`Reminder scheduled for: ${reminderTime.toLocaleString()}`);
};
