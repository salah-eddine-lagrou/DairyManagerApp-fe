import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.page.html',
  styleUrls: ['./demandes.page.scss'],
})
export class DemandesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToDetailsDemande() :void {
    this.router.navigate(['vendeur-pages/details-demande']);
  }

  selectedSegment: string = 'default';
  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
  }

}
