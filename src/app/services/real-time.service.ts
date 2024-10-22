import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { ToastController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RealTimeService {

  private echo: Echo;

  constructor(private toastController: ToastController, private authService: AuthService) {
    // Initialize Echo with Pusher
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: '84c83ae250f4961e7a70',  // Replace with your Pusher key
      cluster: 'eu',
      forceTLS: true,
      encrypted: true,
      client: new Pusher('84c83ae250f4961e7a70', {
        cluster: 'eu'
      })
    });
  }

  listenForPDAConfirmation(userId: number) {
    this.echo.channel('pda-confirmations')
      .listen('PDACodeConfirmed', (event: any) => {
        if (event.user.id === userId) {
          console.log("PDA Code Confirmation received: ", event.message);

          // Store the token in localStorage
          this.authService.setToken(event.token);

          // Handle Web (Browser) notifications
          if ('Notification' in window) {
            if (Notification.permission === 'granted') {
              this.showWebNotification(event.message);
            } else if (Notification.permission !== 'denied') {
              Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  this.showWebNotification(event.message);
                }
              });
            }
          }

          // Handle Toast notification for Android (and in-app for web)
          this.presentToast(event.message);
        }
      });
  }

  // Method to show browser notifications (for Web)
  showWebNotification(message: string) {
    new Notification('PDA Code Confirmation', {
      body: message,
      icon: '../../assets/img/LOGO-GASTROMIXTE-RGB-2.png' // Optional: path to a notification icon
    });
  }

  // Method to show Toast notifications (for Android and Web in-app)
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
