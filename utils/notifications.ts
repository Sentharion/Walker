import PushNotification from 'react-native-push-notification';
import { hasWalkedToday as checkWalkedToday } from './walksStorage';

PushNotification.configure({
  onNotification: function (notification:any) {
    console.log("NOTIFICATION:", notification);
  },
  popInitialNotification: true,
  requestPermissions: false, 
});

export const scheduleDailyReminder = async (isNotificationEnabled: boolean = true) => {
  if (!isNotificationEnabled) {
    PushNotification.cancelAllLocalNotifications(); 
    return;
  }

  const hasWalkedToday = await checkWalkedToday();
  const now = new Date();
  const reminderTime = new Date();
  reminderTime.setHours(15, 0, 0, 0);

  if (hasWalkedToday || now > reminderTime) {
    reminderTime.setDate(reminderTime.getDate() + 1);
  }
  PushNotification.cancelLocalNotifications({ id: 'daily-walk-reminder' });

  PushNotification.localNotificationSchedule({
    id: 'daily-walk-reminder',
    title: "Pora na spacer! 🐾",
    message: "Twoje dzienne cele czekają. Czy wyjdziesz dzisiaj na spacer?",
    date: reminderTime,
    allowWhileIdle: true,
    repeatType: 'day',
    importance: 'high',
    priority: 'high',
  });

  console.log(`Reminder scheduled for: ${reminderTime.toLocaleString()}`);
};
