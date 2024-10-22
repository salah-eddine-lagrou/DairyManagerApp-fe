import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthUser } from '../models/auth-user';
import { User } from '../models/user';
import { Storage } from '@capacitor/storage';
import { UserService } from './user.service';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/api';
  private token: string | null = null;

  constructor(private http: HttpClient, private userService: UserService) { }

  login(authUser: AuthUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, authUser);
  }

  logout(user: User): Observable<any> {
    this.clearToken();
    this.userService.clearUserStorage();
    Storage.remove({ key: 'role_name' });
    return this.http.post(`${this.baseUrl}/logout`, user);
  }

  scenariosCases(authUser: AuthUser): any {
    return this.http.post(`${this.baseUrl}/scenarios-cases`, authUser);
  }

  getAccess(authUser: AuthUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/getAccessPDA`, authUser);
  }

  async setToken(token: string): Promise<void> {
    this.token = token;
    await Storage.set({
      key: 'auth_token',
      value: token
    });
  }

  async getToken(): Promise<string | null> {
    if (!this.token) {
      const storedToken = await Storage.get({ key: 'auth_token' });
      this.token = storedToken.value ? storedToken.value : null;
    }
    return this.token;
  }

  async clearToken(): Promise<void> {
    this.token = null;
    await Storage.remove({ key: 'auth_token' });
  }

  async isAuthenticated(): Promise<boolean> {
    const storedToken = await Storage.get({ key: 'auth_token' });
    return storedToken.value !== null;
  }
}
