import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gratuites',
  templateUrl: './gratuites.page.html',
  styleUrls: ['./gratuites.page.scss'],
})
export class GratuitesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("running from gratuite responsable pages");

  }

  goToDetailCommande() :void {
    const gratuites = true;
    this.router.navigate(['responsable-pages/details-commande'], { state : { gratuites }});
  }

}
