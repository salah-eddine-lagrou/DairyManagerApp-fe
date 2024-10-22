import { Component, OnInit } from '@angular/core';
import { AuthUser } from '../models/auth-user';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Device } from '@capacitor/device';
import { RealTimeService } from '../services/real-time.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.page.html',
  styleUrls: ['./auth-page.page.scss'],
})
export class AuthPagePage implements OnInit {

  authUser: AuthUser = new AuthUser();
  errorMessageEmail?: string;
  errorMessagePassword?: string;
  logged: boolean = false;

  constructor(
    private authService: AuthService,
    private realTimeService: RealTimeService,
    private router: Router,
  ) { }

  async ngOnInit() {
    console.log('Running from auth-page');

    const token = await this.getDeviceUniqueToken();
    console.log('Device Token:', token);
  }

  async getDeviceUniqueToken() {
    const { value: token } = await Storage.get({ key: 'device_token' });

    if (!token) {
      const newToken = uuidv4();
      await Storage.set({ key: 'device_token', value: newToken });
      this.authUser.device_uuid = newToken;
      return newToken;
    }

    this.authUser.device_uuid = token;
    return token;
  }

  togglePassword(inputId: string, event: Event): void {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const icon = (event.target as HTMLElement).closest('button')?.querySelector('ion-icon');

    if (input.type === 'password') {
      input.type = 'text';
      if (icon) {
        icon.name = 'eye-outline';
      }
    } else {
      input.type = 'password';
      if (icon) {
        icon.name = 'eye-off-outline';
      }
    }
  }

  forget: boolean = false;
  forgetPassword() {
    this.forget = true;
  }

  backToAuth() {
    this.forget = false;
  }

  isLoading: boolean = false;

  login() {
    // Clear previous error messages
    this.errorMessageEmail = undefined;
    this.errorMessagePassword = undefined;

    this.isLoading = true; // Set loading state to true

    // Validate inputs
    if (!this.authUser.email) {
      this.errorMessageEmail = 'L\'email est requis.'; // Email is required
    }
    if (!this.authUser.password) {
      this.errorMessagePassword = 'Le mot de passe est requis.'; // Password is required
    }

    // If there are validation errors, do not proceed with the login
    if (this.errorMessageEmail || this.errorMessagePassword) {
      this.isLoading = false;
      return;
    }

    // Make the login request to the server
    this.authService.login(this.authUser).subscribe(
      async (res: any) => {
        console.log('DEBUG Login response : ', res);

        this.isLoading = false; // Reset loading state

        if (res.token) {
          this.authService.setToken(res.token);
          // ! TODO Login successful redirect to home page of the vendeur
          // TODO simple and direct login to the home page
          const user: User = res.user;
          const roleName = res.role_name;
          await Storage.set({
            key: 'role_name',
            value: roleName
          });
          const stringUser = JSON.stringify(user);
          await Storage.set({
            key: 'user',
            value: stringUser
          });
          this.router.navigateByUrl(`${roleName}-pages/home`, { replaceUrl: true });


        } else {
          if (res.pda_code_access) {
            // ! TODO display at the same page the display code pda, waiting for login and a logout button
            // TODO case 1 treatement !
            const user: User = res.user;
            const roleName = res.role_name;
            await Storage.set({
              key: 'role_name',
              value: roleName
            });
            const stringUser = JSON.stringify(user);
            await Storage.set({
              key: 'user',
              value: stringUser
            });
            this.realTimeService.listenForPDAConfirmation(res.user.id);
            this.router.navigate(['/auth-waiting']);
            Swal.fire({
              icon: 'info',
              title: 'Connexion en attente',
              text: res.message,
              toast: false,
              position: 'center',
              showConfirmButton: true,
              heightAuto: false,
            });

          } else {
            if (res.case3) {
              Swal.fire({
                title: 'Attention !',
                text: res.message,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Oui",
                cancelButtonText: "Non",
                heightAuto: false
              }).then((result) => {
                if (result.isConfirmed) {
                  this.authService.scenariosCases(this.authUser).subscribe(
                    async (casesResult: any) => {
                      console.log('DEBUG scenairio response : ', casesResult);

                      // ! TODO display at the same page the display code pda, waiting for login and a logout button
                      const user: User = casesResult.user;
                      const roleName = casesResult.role_name;
                      await Storage.set({
                        key: 'role_name',
                        value: roleName
                      });
                      const stringUser = JSON.stringify(user);
                      await Storage.set({
                        key: 'user',
                        value: stringUser
                      });
                      this.router.navigate(['/auth-waiting']);
                      Swal.fire({
                        icon: 'info',
                        title: 'Connexion en attente',
                        text: casesResult.message,
                        toast: false,
                        position: 'center',
                        showConfirmButton: true,
                        heightAuto: false
                      });

                    }, (casesError: any) => {
                      console.error('DEBUG scenairio error : ', casesError);

                      Swal.fire({
                        icon: 'error',
                        title: 'Une erreur est survenue !',
                        text: casesError.message,
                        toast: false,
                        position: 'center',
                        showConfirmButton: true,
                        heightAuto: false

                      });
                    }
                  );
                } else {
                  return;
                }
              });
            }
          }
        }
      },
      (err) => {
        this.isLoading = false; // Reset loading state
        console.error(err);

        if (err.error.errors) {
          // Handle validation errors
          if (err.error.errors.email) {
            this.errorMessageEmail = err.error.errors.email[0];
          }
          if (err.error.errors.password) {
            this.errorMessagePassword = err.error.errors.password[0];
          }
        } else {
          // Handle other server errors
          Swal.fire({
            icon: 'error',
            title: 'Une erreur est survenue !',
            text: err.error.message || 'Veuillez réessayer.',
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000,

          });
        }
      }
    );
  }
}
