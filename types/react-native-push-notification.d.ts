declare module 'react-native-push-notification' {
  interface PushNotification {
    configure(options: any): void;
    localNotification(notification: any): void;
    localNotificationSchedule(notification: any): void;
    cancelLocalNotifications(notification: any): void;
    cancelAllLocalNotifications(): void;
    requestPermissions(permissions?: any): Promise<any>;
    subscribeToTopic(topic: string): void;
    unsubscribeFromTopic(topic: string): void;
    presentLocalNotification(notification: any): void;
    scheduleLocalNotification(notification: any): void;
    getChannels(callback: (channelIds: string[]) => void): void;
    channelExists(channelId: string, callback: (exists: boolean) => void): void;
    createChannel(channel: any, callback: (created: boolean) => void): void;
    deleteChannel(channelId: string): void;
    getScheduledLocalNotifications(callback: (notifications: any[]) => void): void;
    removeAllDeliveredNotifications(): void;
    getDeliveredNotifications(callback: (notifications: any[]) => void): void;
    removeDeliveredNotifications(identifiers: string[]): void;
    invokeApp(notification: any): void;
  }

  const PushNotification: PushNotification;
  export default PushNotification;
}
