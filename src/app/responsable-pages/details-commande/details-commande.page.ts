import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-commande',
  templateUrl: './details-commande.page.html',
  styleUrls: ['./details-commande.page.scss'],
})
export class DetailsCommandePage implements OnInit {
  @ViewChild('itemElement') itemElement!: ElementRef;
  commande: any[] = [];
  paiement = {
    "id": 0,
    "montant": 0,
    "modePaiement": "especes",
    "note": ""
  };
  totalPrice: number = 0;
  gratuite: boolean = false;
  bl: boolean = false;
  trasnfertList: boolean = false;

  items = [
    { id: 1, maxQuantityDisplayed: false, name: 'pizzarella', image: "assets/img/produits/pizzarella.png", category: 'mozarella', quantity: 5, quantityStock: 20, price: 35 },
    { id: 2, maxQuantityDisplayed: false, name: 'pizza cheese', image: "assets/img/produits/pizza cheese.png", category: 'mozarella', quantity: 4, quantityStock: 25, price: 40 },
    { id: 3, maxQuantityDisplayed: false, name: 'creme du chef', image: "assets/img/produits/creme du chef.png", category: 'creme', quantity: 2, quantityStock: 30, price: 20 },
    { id: 4, maxQuantityDisplayed: false, name: 'creme pro', image: "assets/img/produits/creme pro.png", category: 'creme', quantity: 1, quantityStock: 10, price: 30 },
    { id: 5, maxQuantityDisplayed: false, name: 'cucina blue', image: "assets/img/produits/cucina blue.png", category: 'creme', quantity: 4, quantityStock: 5, price: 25 },
  ];

  constructor(
    private router: Router,
    private loadingController: LoadingController,
  ) { }

  async ngOnInit() {
    for (const item of this.items) {
      this.totalPrice += item.quantity * item.price;
    }
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 200,
    });

    await loading.present();

    // Simulate some data fetching or processing
    setTimeout(() => {
      loading.dismiss();
    }, 200);
  }

  isModalOpen = false;
  selectedItem: any;
  openModal(item: any) {
    this.selectedItem = item;
    this.isModalOpen = true;
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  currentOpen: string | null = null;
  toggleAccordion(id: string) {
    this.currentOpen = this.currentOpen === id ? null : id;
  }

}
