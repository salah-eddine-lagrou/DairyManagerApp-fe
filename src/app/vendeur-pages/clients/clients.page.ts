import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("running from clients page");

  }

  goToClientActions() :void {
    this.router.navigate(['vendeur-pages/client-actions']);
  }

  navigateToNewClient() :void {
    this.router.navigate(['vendeur-pages/new-client']);
  }
}
