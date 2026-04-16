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


export const scheduleDailyReminder = async (isNotificationEnabled: boolean = true) => {
  if (!isNotificationEnabled) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    return;
  }

  const hasWalkedToday = await checkWalkedToday();
  const now = new Date();
  const reminderTime = new Date();
  reminderTime.setHours(15, 0, 0, 0);

  if (hasWalkedToday || now > reminderTime) {
    reminderTime.setDate(reminderTime.getDate() + 1);
  }

  await Notifications.cancelAllScheduledNotificationsAsync();

 await Notifications.scheduleNotificationAsync({
    content: {
      title: "Pora na spacer! 👣",
      body: "Twoje dzienne cele czekają. Czy wyjdziesz dzisiaj na spacer?",
      sound: true,
    },
    trigger: {
      type: 'time',
      timestamp: reminderTime.getTime(),
    } as any,
  });

  console.log(`Reminder scheduled for: ${reminderTime.toLocaleString()}`);
};
