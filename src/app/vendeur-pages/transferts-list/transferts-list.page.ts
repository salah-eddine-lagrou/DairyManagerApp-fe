import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transferts-list',
  templateUrl: './transferts-list.page.html',
  styleUrls: ['./transferts-list.page.scss'],
})
export class TransfertsListPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("running from transferts-list page");

  }

  goToDetailsCommande() :void {
    const trasnfertList = true;
    this.router.navigate(['vendeur-pages/details-commande'], {state : { trasnfertList }});
  }

  selectedSegment: string = 'default';
  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
  }

}
