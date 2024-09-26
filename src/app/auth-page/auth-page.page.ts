import { Component, OnInit } from '@angular/core';
import { AuthUser } from '../models/auth-user';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.page.html',
  styleUrls: ['./auth-page.page.scss'],
})
export class AuthPagePage implements OnInit {

  authUser: AuthUser = new AuthUser();
  errorMessageEmail?: string;
  errorMessagePassword?: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log("running from auth-page");

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

    console.log(this.authUser);

    this.authService.login(this.authUser).subscribe(
      (res: any) => {
        this.isLoading = false; // Reset loading state
        // TODO Handle successful login response...

        if (res.token) {
          localStorage.setItem('auth_token', res.token);
          console.log(res);
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
          this.errorMessageEmail = 'Une erreur est survenue. Veuillez réessayer.';
          this.errorMessagePassword = 'Une erreur est survenue. Veuillez réessayer.';
          Swal.fire({
            icon: 'error',
            title: 'Une erreur est survenue',
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    );
  }

}
