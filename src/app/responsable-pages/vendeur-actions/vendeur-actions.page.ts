import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendeur-actions',
  templateUrl: './vendeur-actions.page.html',
  styleUrls: ['./vendeur-actions.page.scss'],
})
export class VendeurActionsPage implements OnInit {
  tournes: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("running from vendeurs actions");
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.tournes = navigation.extras.state['tournes'];
    }
  }

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  goToReglement() :void {
    this.router.navigate(['responsable-pages/reglement']);
  }

  goToBL() :void {
    this.router.navigate(['responsable-pages/bon-livraison']);
  }

  goToEquipements() :void {
    this.router.navigate(['responsable-pages/equipements']);
  }

}
