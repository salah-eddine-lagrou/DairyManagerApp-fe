import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiKey = 'AIzaSyBfe0yxdclZyvhHpokrvJXxOIu0kJ3tZKE'; // Replace with your API key for geocoding
  private geocodingApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private geolocation: Geolocation, private http: HttpClient) { }

  getCurrentLocation(): Promise<Geoposition> {
    return this.geolocation.getCurrentPosition();
  }

  reverseGeocode(lat: number, lng: number): Observable<any> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    return this.http.get(url);
  }

}
