import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bon-livraison',
  templateUrl: './bon-livraison.page.html',
  styleUrls: ['./bon-livraison.page.scss'],
})
export class BonLivraisonPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("running from bl page");

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

}
