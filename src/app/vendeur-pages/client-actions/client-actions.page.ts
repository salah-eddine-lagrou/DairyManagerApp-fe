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

  navigateToMakeCommande() :void{
    this.router.navigate(['vendeur-pages/make-commande']);
  }
}