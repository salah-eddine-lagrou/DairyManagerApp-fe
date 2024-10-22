import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { AuthUser } from '../models/auth-user';
import { UserService } from '../services/user.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-auth-waiting-page',
  templateUrl: './auth-waiting-page.page.html',
  styleUrls: ['./auth-waiting-page.page.scss'],
})
export class AuthWaitingPagePage implements OnInit {
  user: User = new User();

  constructor(
    private router: Router,
    private navCntrl: NavController,
    private authService: AuthService,
    private userService: UserService
  ) { }


  async ngOnInit() {
    this.user = await this.userService.getUserStorage();

    if (this.user) {
      const PDACode: string = this.user.pda_code_access || '';
      if (PDACode) {
        this.maskedCode = this.maskLastFourCharacters(PDACode);
      }
    } else {
      this.router.navigate(['auth']);
    }
  }

  async ionViewWillEnter() {
    this.user = await this.userService.getUserStorage();

    if (this.user) {
      const PDACode: string = this.user.pda_code_access || '';
      if (PDACode) {
        this.maskedCode = this.maskLastFourCharacters(PDACode);
      }
    } else {
      this.router.navigate(['auth']);
    }
  }

  isLoading: boolean = false;
  logout() {
    Swal.fire({
      title: "Déconnecter de l'accueil ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.authService.logout(this.user).subscribe(
          (result: any) => {
            console.log('DEBUG logout : ', result);

            this.isLoading = false;  // Hide the spinner
            this.navCntrl.setDirection('back');
            this.router.navigate(['/auth']);  // Navigate to the authentication page
          }, (error: any) => {
            console.error('DEBUG logout : ', error);

            this.isLoading = false;  // Hide the spinner

          }
        );
      }
    });
  }

  isCodeVisible: boolean = false; // Flag to toggle between masked and full code
  maskedCode: string = ''; // The masked version of the code
  togglePDACode() {
    this.isCodeVisible = !this.isCodeVisible; // Toggle between masked and full code
  }
  maskLastFourCharacters(code: string): string {
    return code.slice(0, -4) + '****'; // Replace the last 4 characters with asterisks
  }

  isLoadingAccess: boolean = false;
  getAccess() {
    this.isLoadingAccess = true;
    const authuser: AuthUser = new AuthUser();
    authuser.email = this.user.email;
    authuser.password = this.user.password;
    authuser.device_uuid = this.user.device_uuid;
    this.authService.getAccess(authuser).subscribe(
      async (result: any) => {
        this.isLoadingAccess = false;
        if (result.token) {
          console.log('DEBUG getAccess : ', result);
          const user: User = result.user;
          const roleName = result.role_name;
          await Storage.set({
            key: 'role_name',
            value: roleName
          });
          const stringUser = JSON.stringify(user);
          await Storage.set({
            key: 'user',
            value: stringUser
          });
          this.authService.setToken(result.token);

          setTimeout(() => {
            this.router.navigateByUrl(`${roleName}-pages/home`, { replaceUrl: true });
          }, 100);

        } else {
          Swal.fire({
            icon: 'warning',
            title: result.status,
            text: result.message,
            toast: false,
            position: 'center',
            showConfirmButton: true,
            heightAuto: false
          });

        }

      },
      (error: any) => {
        this.isLoadingAccess = false;
        console.error('DEBUG getAccess : ', error);
        Swal.fire({
          icon: 'error',
          title: 'Une erreur est survenue !',
          text: 'Veuillez réessayer.',
          toast: false,
          position: 'center',
          showConfirmButton: true,
          heightAuto: false
        });
      }
    );
  }

}
