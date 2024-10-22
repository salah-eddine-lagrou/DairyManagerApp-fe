import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8000/api/clients';
  private clients: Client[] = [];

  constructor(private http: HttpClient) { }

  getClientsByVendeur(id: number): Observable<Object> {
    const endpoint = "/getClientsByVendeur";
    const apiUrl = this.baseUrl + endpoint;
    return this.http.get(`${apiUrl}/${id}`);
  }

  getClientById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createClient(client: Client): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, client);
  }

  updateClient(id: number, client: Client): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, client);
  }

  deleteClient(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  async getClientsFS(): Promise<Client[]> {
    try {
      const result = await Filesystem.readFile({
        path: 'clients.json',  // File path
        directory: Directory.Data
      });

      let data: string;

      // If the result data is a Blob, convert it to a string
      if (typeof result.data === 'string') {
        data = result.data;  // If it's a string, use it directly
      } else {
        // Convert Blob to string if necessary (this step might depend on the platform)
        const blob = new Blob([result.data]);
        data = await blob.text();  // Convert Blob to text
      }

      // Parse the string into an array of clients
      const clients: Client[] = JSON.parse(data);
      return clients;

    } catch (error) {
      console.error('Error reading clients from filesystem:', error);
      return [];  // Return an empty array if there was an error or file not found
    }
  }


  async setClientsFS(clients: Client[]): Promise<void> {
    try {
      await Filesystem.writeFile({
        path: 'clients.json',  // File path
        data: JSON.stringify(clients),  // Convert the clients array to a string
        directory: Directory.Data,
        encoding: Encoding.UTF8
      });
      console.log('Clients saved to filesystem successfully.');
    } catch (error) {
      console.error('Error saving clients to filesystem:', error);
    }
  }

  async addClientToFS(newClient: Client): Promise<void> {
    try {
      const clients = await this.getClientsFS();
      clients.push(newClient);
      await this.setClientsFS(clients);
    } catch (error) {
      console.error('Error adding client to storage:', error);
    }
  }

  async removeAllClientsFromFS(): Promise<void> {
    try {
      await Filesystem.deleteFile({
        path: 'clients.json',
        directory: Directory.Data,
      });
      console.log('All clients removed successfully.');
    } catch (error) {
      console.error('Error removing clients from storage:', error);
    }
  }


}
