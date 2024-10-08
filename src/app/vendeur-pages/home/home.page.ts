import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild("swiper")
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  constructor(private router :Router) { }

  ngOnInit() {
    console.log("running from home vendeur");

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

  // navigations
  navigateToClients() :void {
    this.router.navigate(['vendeur-pages/clients']);
  }

  navigateToReglement() :void {
    this.router.navigate(['vendeur-pages/reglement-list']);
  }

  navigateToBL() :void {
    const commingFromHome = true;
    this.router.navigate(['vendeur-pages/bon-livraison'], { state : { commingFromHome }});
  }

  navigateToStockVehicule() :void {
    this.router.navigate(['vendeur-pages/stock-vehicule']);
  }

  navigateTotrasnfertList() :void {
    this.router.navigate(['vendeur-pages/transferts-list']);
  }

  navigateToTournes() :void {
    this.router.navigate(['vendeur-pages/tournes']);
  }

}
