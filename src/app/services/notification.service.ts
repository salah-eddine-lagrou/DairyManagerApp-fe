import { Injectable } from '@angular/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Platform } from '@ionic/angular';
import Pusher from 'pusher-js';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private pusher?: Pusher;
  private channel: any;

  constructor(private platform: Platform) {
    this.initializePushNotifications();
    this.initializePusher();
  }

  // Initialize Pusher
  private initializePusher() {
    this.pusher = new Pusher('YOUR_PUSHER_APP_KEY', {
      cluster: 'YOUR_PUSHER_APP_CLUSTER',
      // encrypted: true
    });

    // Subscribe to the channel
    this.channel = this.pusher.subscribe('your-channel-name');

    // Bind to the event
    this.channel.bind('your-event-name', (data: any) => {
      console.log('Pusher notification received:', data);
      this.presentLocalNotification(data);
    });
  }

  initializePushNotifications() {
    if (this.platform.is('capacitor')) {
      // Request permission to use push notifications
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          // Register the device for push notifications
          PushNotifications.register();
        } else {
          console.log('Push notification permission denied');
        }
      });

      // Listen for registration of the push token
      PushNotifications.addListener('registration', (token: Token) => {
        console.log('Push registration success, token: ' + token.value);
        // Save the token for backend use (send to your backend to save)
      });

      // Listen for push notification received
      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        console.log('Push notification received', notification);
        this.presentLocalNotification(notification);
      });

      // Listen for when a notification is tapped
      PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
        console.log('Push notification action performed', notification);
        // Handle the notification action here
      });
    }
  }

  // Display a local notification
  async presentLocalNotification(notification: any) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: notification.title,
          body: notification.body,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000) },
          actionTypeId: '',
          extra: null
        }
      ]
    });
  }
}
