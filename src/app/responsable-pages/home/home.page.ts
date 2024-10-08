import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("running from home responsable");

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

}
