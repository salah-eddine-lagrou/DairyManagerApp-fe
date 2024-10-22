import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientCategory } from '../models/client-category';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { ClientSubcategory } from '../models/client-subcategory';

@Injectable({
  providedIn: 'root'
})
export class ClientCategoryService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getCategoryById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/client-categories/${id}`);
  }

  getSubCategoryById(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/client-subcategories/${id}`);
  }

  getCategories(): Observable<Object>{
    return this.http.get(`${this.baseUrl}/client-categories`);
  }

  getSubCategories(): Observable<Object>{
    return this.http.get(`${this.baseUrl}/client-subcategories`);
  }

  async getCategoriesFS(): Promise<ClientCategory[]> {
    try {
      const result = await Filesystem.readFile({
        path: 'clientCategories.json',  // File path
        directory: Directory.Data
      });

      let data: string;

      if (typeof result.data === 'string') {
        data = result.data;  // If it's a string, use it directly
      } else {
        const blob = new Blob([result.data]);
        data = await blob.text();  // Convert Blob to text
      }

      const clientCategories: ClientCategory[] = JSON.parse(data);
      return clientCategories;

    } catch (error) {
      console.error('Error reading clientCategories from filesystem:', error);
      return [];
    }
  }


  async setCategoriesFS(clientCategories: ClientCategory[]): Promise<void> {
    try {
      await Filesystem.writeFile({
        path: 'clientCategories.json',
        data: JSON.stringify(clientCategories),
        directory: Directory.Data,
        encoding: Encoding.UTF8
      });
      console.log('ClientCategories saved to filesystem successfully.');
    } catch (error) {
      console.error('Error saving clientCategories to filesystem:', error);
    }
  }

  async getSubCategoriesFS(): Promise<ClientSubcategory[]> {
    try {
      const result = await Filesystem.readFile({
        path: 'clientSubCategories.json',  // File path
        directory: Directory.Data
      });

      let data: string;

      if (typeof result.data === 'string') {
        data = result.data;  // If it's a string, use it directly
      } else {
        const blob = new Blob([result.data]);
        data = await blob.text();  // Convert Blob to text
      }

      const clientSubCategories: ClientSubcategory[] = JSON.parse(data);
      return clientSubCategories;

    } catch (error) {
      console.error('Error reading clientSubCategories from filesystem:', error);
      return [];
    }
  }


  async setSubCategoriesFS(clientSubCategories: ClientSubcategory[]): Promise<void> {
    try {
      await Filesystem.writeFile({
        path: 'clientSubCategories.json',
        data: JSON.stringify(clientSubCategories),
        directory: Directory.Data,
        encoding: Encoding.UTF8
      });
      console.log('ClientSubCategories saved to filesystem successfully.');
    } catch (error) {
      console.error('Error saving clientSubCategories to filesystem:', error);
    }
  }
}
