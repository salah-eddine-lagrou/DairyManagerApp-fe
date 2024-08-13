import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bon-livraison',
  templateUrl: './bon-livraison.page.html',
  styleUrls: ['./bon-livraison.page.scss'],
})
export class BonLivraisonPage implements OnInit {
  commingFromHome: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    // ! this componenet can been access by one client or by them all
    console.log("running from bl responsable page");
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.commingFromHome = navigation.extras.state['commingFromHome'];
    }

  }

  selectedSegment: string = 'non-payee';
  setSegment(segment: string): void {
    this.selectedSegment = segment;
  }

  colorStyleInfo :string = "";
  colorStyleSec :string = "color: #8b8b8b;";
  changeSegmentColorLabel(label: string) {
    if (label === "non-payee") {
      this.colorStyleSec = "color: #8b8b8b;";
      this.colorStyleInfo = "";
    } else {
      this.colorStyleInfo = "color: #8b8b8b;";
      this.colorStyleSec = "";
    }
  }

  goToDetailsCommande() :void {
    const bl = true;
    this.router.navigate(['responsable-pages/details-commande'], {state : { bl }});
  }

}
