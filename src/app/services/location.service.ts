import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private geocodingApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient, private platform: Platform) { }

  async getCurrentLocation(): Promise<any> {
    if (this.platform.is('capacitor')) {
      try {
        const position = await Geolocation.getCurrentPosition();
        return position;
      } catch (error) {
        console.error('Error getting location', error);
        throw error;
      }
    } else if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error)
          );
        } else {
          reject('Geolocation is not supported by this browser.');
        }
      });
    } else {
      throw new Error('Unsupported platform');
    }
  }

  reverseGeocode(lat: number, lng: number): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    return this.http.get(url);
  }

  async checkPermissions(): Promise<boolean> {
    if (this.platform.is('capacitor')) {
      try {
        const { location } = await Geolocation.requestPermissions();
        return location === 'granted';
      } catch (error) {
        console.error('Error requesting permissions', error);
        return false;
      }
    }
    return true; // On web, permissions are handled by the browser.
  }
}
