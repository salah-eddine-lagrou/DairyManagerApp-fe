import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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

  colorStyleInfo :string = "";
  colorStyleSec :string = "color: #8b8b8b;";
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

  goToVendeurs() :void {
    this.router.navigate(['responsable-pages/vendeurs']);
  }

  goToBL() :void {
    const commingFromHome = true;
    this.router.navigate(['responsable-pages/bon-livraison'], { state : { commingFromHome }});
  }

  goToTournes() :void {
    this.router.navigate(['responsable-pages/tournes']);
  }

  goToReglementsList() :void {
    this.router.navigate(['responsable-pages/reglements-list']);
  }

  goToDemandes() :void {
    this.router.navigate(['responsable-pages/demandes']);
  }

  goToGratuites() :void {
    this.router.navigate(['responsable-pages/gratuites']);
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
