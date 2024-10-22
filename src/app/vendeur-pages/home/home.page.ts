import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import Swiper from 'swiper';
import { App } from '@capacitor/app';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild("swiper")
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  user: User = new User();

  constructor(
    private router: Router,
    private authService: AuthService,
    private navCntrl: NavController,
    private popoverController: PopoverController,
    private userService: UserService
  ) {
  }

  async ngOnInit() {
    console.log("running from home vendeur");
    this.user = await this.userService.getUserStorage();
    console.log("OnInit: ", this.user);

  }

  async ionViewWillEnter() {
    this.user = await this.userService.getUserStorage();
    console.log("ViewWillEnter: ", this.user);
  }

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  selectedSegment: string = 'informations';
  setSegment(segment: string): void {
    this.selectedSegment = segment;
  }

  colorStyleInfo: string = "";
  colorStyleSec: string = "color: #8b8b8b;";
  changeSegmentColorLabel(label: string) {
    if (label === "Informations") {
      this.colorStyleSec = "color: #8b8b8b;";
      this.colorStyleInfo = "";
    } else {
      this.colorStyleInfo = "color: #8b8b8b;";
      this.colorStyleSec = "";
    }
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

  // navigations
  navigateToClients(): void {
    this.router.navigate(['vendeur-pages/clients']);
  }

  navigateToReglement(): void {
    this.router.navigate(['vendeur-pages/reglement-list']);
  }

  navigateToBL(): void {
    const commingFromHome = true;
    this.router.navigate(['vendeur-pages/bon-livraison'], { state: { commingFromHome } });
  }

  navigateToStockVehicule(): void {
    this.router.navigate(['vendeur-pages/stock-vehicule']);
  }

  navigateTotrasnfertList(): void {
    this.router.navigate(['vendeur-pages/transferts-list']);
  }

  navigateToTournes(): void {
    this.router.navigate(['vendeur-pages/tournes']);
  }

  async logout() {
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
        this.authService.logout(this.user).subscribe(
          async (result: any) => {
            console.log('DEBUG logout : ', result);
            const popover = await this.popoverController.getTop(); // Get the active popover
            if (popover) {
              await popover.dismiss(); // Dismiss the popover
            }
            localStorage.removeItem('user');
            this.navCntrl.setDirection('back');
            this.router.navigate(['/auth']);  // Navigate to the authentication page
          }, (error: any) => {
            console.error('DEBUG logout : ', error);


          }
        );
      }
    });
  }

}
