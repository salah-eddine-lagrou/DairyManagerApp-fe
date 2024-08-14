import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournes',
  templateUrl: './tournes.page.html',
  styleUrls: ['./tournes.page.scss'],
})
export class TournesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("running from tournes responsable page");

  }

  selectedSegment: string = 'en-cours';

  setSegment(segment: string): void {
    this.selectedSegment = segment;
  }

  colorStyleEnCours: string = "";
  colorStyleDouteux: string = "color: #8b8b8b;";
  colorStyleVisite: string = "color: #8b8b8b;";

  changeSegmentColorLabel(label: string) {
    if (label === 'en-cours') {
      this.colorStyleEnCours = "";
      this.colorStyleDouteux = "color: #8b8b8b;";
      this.colorStyleVisite = "color: #8b8b8b;";
    } else if (label === 'douteux') {
      this.colorStyleEnCours = "color: #8b8b8b;";
      this.colorStyleDouteux = "";
      this.colorStyleVisite = "color: #8b8b8b;";
    } else if (label === 'visite') {
      this.colorStyleEnCours = "color: #8b8b8b;";
      this.colorStyleDouteux = "color: #8b8b8b;";
      this.colorStyleVisite = "";
    }
  }


  goToVendeurActions() :void {
    const tournes = true;
    this.router.navigate(['responsable-pages/vendeur-actions'], { state : { tournes }});
  }

}
