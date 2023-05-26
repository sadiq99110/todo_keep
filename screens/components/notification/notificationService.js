import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

class PushNotificationManager {
  configure = () => {
    PushNotification.configure({
      // Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('Notification:', notification);
      },
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('Token:', token);
      },
      // Android only: GCM or FCM Sender ID
      senderID: '<YOUR_SENDER_ID>',
      // iOS only (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      // Request permissions to use local notifications.
      requestPermissions: true,
    });

    this.createNotificationChannel();
  };

  createNotificationChannel = () => {
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'your_channel_id', // Replace with your desired channel ID
          channelName: 'Your Channel Name', // Replace with your desired channel name
          channelDescription: 'Your Channel Description', // Replace with your desired channel description
          soundName: 'default', // Optional, sound resource for notifications
          importance: 4, // Optional, default importance level for notifications
          vibrate: true, // Optional, vibration for notifications
        },
        (created) => console.log(`Notification channel created: ${created}`)
      );
    }
  };

  localNotification = (title, message, date) => {
    PushNotification.localNotificationSchedule({
      channelId: 'your_channel_id', // Specify the channel ID for the notification
      title: title,
      message: message,
      date: date, // Specify the date and time for the notification
    });
  };

  scheduleNotification = (title, message, date) => {
    PushNotification.localNotificationSchedule({
      channelId: 'your_channel_id', // Specify the channel ID for the notification
      title: title,
      message: message,
      date: date, // Specify the date and time for the notification
    });
  };
}

export const pushNotificationManager = new PushNotificationManager();
