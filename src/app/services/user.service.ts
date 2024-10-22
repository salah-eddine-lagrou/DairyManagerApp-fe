import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { User } from '../models/user';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = new User();
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getUserRole(id_role: number): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/roles/${id_role}`);
  }

  async getUserStorage(): Promise<User> {
    const { value } = await Storage.get({ key: 'user' });
    if (value) {
      const parsedUser = JSON.parse(value);
      this.user = Object.assign(new User(), parsedUser);
    }
    return this.user;
  }

  async setUserStorage(user: User): Promise<void> {
    this.user = user;
    await Storage.set({ key: 'user', value: JSON.stringify(user) });
  }

  async clearUserStorage(): Promise<void> {
    this.user = new User();
    await Storage.remove({ key: 'user' });
  }
}
