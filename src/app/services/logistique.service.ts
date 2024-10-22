import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogistiqueService {
  private baseUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) { }

  getWarehouse(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/warehouse/${id}`);
  }

  getAgency(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/agency/${id}`);
  }

  getZones(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/zones/${id}`);
  }

  getSectors(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/sectors/${id}`);
  }

  async getDataFS<T>(key: string): Promise<T | null> {
    try {
      const result = await Filesystem.readFile({
        path: `${key}.json`,  // Dynamic file path based on key
        directory: Directory.Data
      });

      let data: string;

      if (typeof result.data === 'string') {
        data = result.data;  // Use it directly if it's a string
      } else {
        const blob = new Blob([result.data]);
        data = await blob.text();  // Convert Blob to text
      }

      const parsedData: T = JSON.parse(data);
      return parsedData;

    } catch (error) {
      console.error(`Error reading ${key} from filesystem:`, error);
      return null;  // Return null if error occurs
    }
  }

  async setDataFS<T>(key: string, data: T): Promise<void> {
    try {
      await Filesystem.writeFile({
        path: `${key}.json`,  // Dynamic file path based on key
        data: JSON.stringify(data),
        directory: Directory.Data,
        encoding: Encoding.UTF8
      });
      console.log(`${key} saved to filesystem successfully.`);
    } catch (error) {
      console.error(`Error saving ${key} to filesystem:`, error);
    }
  }



}
