import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Storage } from '@capacitor/storage';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  async canActivate(): Promise<boolean> {
    const roleData = await Storage.get({ key: 'role_name' });
    const role_name: string = roleData.value || '';
    const user: User = await this.userService.getUserStorage();

    const isAuthenticated = await this.authService.isAuthenticated();

    if (isAuthenticated) {
      if (role_name === 'vendeur' || role_name === 'magasinier' || role_name === 'responsable') {
        return true;
      } else {
        this.router.navigate(['auth-waiting']);
        console.error("AuthGuard: User has no valid role and can't access the app");
        Swal.fire({
          icon: 'error',
          title: 'Une erreur est survenue !',
          text: "Utilisateur n'a aucun rôle valide et ne peut pas accéder à l'application",
          toast: false,
          position: 'center',
          showConfirmButton: true,
          heightAuto: false

        });
        return false;
      }
    } else {
      if (user && user.login === true) {
        this.router.navigate(['auth-waiting']);
        return false;
      } else {
        this.router.navigate(['auth']);
        return false;
      }
    }
  }
}
