import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-actions',
  templateUrl: './client-actions.page.html',
  styleUrls: ['./client-actions.page.scss'],
})
export class ClientActionsPage implements OnInit {

  constructor(private router :Router) { }

  ngOnInit() {
    console.log("running from client-actions");

  }

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  navigateToMakeCommande() :void {
    this.router.navigate(['vendeur-pages/make-commande']);
  }

  gratuiteToMakeCommande() :void {
    const gratuite = true;
    this.router.navigate(['vendeur-pages/make-commande'], { state: { gratuite } });
  }

  retourToMakeCommande() :void {
    const retour = true;
    this.router.navigate(['vendeur-pages/make-commande'], { state: { retour } });
  }

  navigateToReglement() :void {
    this.router.navigate(['vendeur-pages/reglement']);
  }

  navigateToBL() :void {
    this.router.navigate(['vendeur-pages/bon-livraison']);
  }

  navigateToEquipement() :void {
    this.router.navigate(['vendeur-pages/equipement']);
  }
}
