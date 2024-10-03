import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-stock-vehicule',
  templateUrl: './stock-vehicule.page.html',
  styleUrls: ['./stock-vehicule.page.scss'],
})
export class StockVehiculePage implements OnInit {
  items = [
    { id: 1, maxQuantityDisplayed: false, name: 'pizzarella', image: "assets/img/produits/pizzarella.png", category: 'mozarella', quantity: 0, quantityStock: 20, price: 35 },
    { id: 2, maxQuantityDisplayed: false, name: 'pizza cheese', image: "assets/img/produits/pizza cheese.png", category: 'mozarella', quantity: 0, quantityStock: 25, price: 40 },
    { id: 3, maxQuantityDisplayed: false, name: 'creme du chef', image: "assets/img/produits/creme du chef.png", category: 'creme', quantity: 0, quantityStock: 30, price: 20 },
    { id: 4, maxQuantityDisplayed: false, name: 'creme pro', image: "assets/img/produits/creme pro.png", category: 'creme', quantity: 0, quantityStock: 10, price: 30 },
    { id: 5, maxQuantityDisplayed: false, name: 'cucina blue', image: "assets/img/produits/cucina blue.png", category: 'creme', quantity: 0, quantityStock: 5, price: 25 },
    { id: 6, maxQuantityDisplayed: false, name: 'beurre fermier frais', image: "assets/img/produits/beurre fermier frais.png", category: 'beurre', quantity: 0, quantityStock: 6, price: 35 },
    { id: 7, maxQuantityDisplayed: false, name: 'sauce algerien', image: "assets/img/produits/sauce algerien.png", category: 'produits', quantity: 0, quantityStock: 60, price: 40 },
    { id: 8, maxQuantityDisplayed: false, name: 'burger sauce', image: "assets/img/produits/sauce burger.png", category: 'produits', quantity: 0, quantityStock: 30, price: 25 },
    { id: 9, maxQuantityDisplayed: false, name: 'veldhuyzen kaas gouda', image: "assets/img/produits/veldhuyzen kaas gouda.png", category: 'produits', quantity: 0, quantityStock: 9, price: 50 },
  ];

  filteredItems = this.items;

  public actionSheetButtons = [
    {
      text: 'Charger',
      icon: 'cloud-upload-outline',
      data: {
        action: 'charge',
      },
      cssClass: 'custom-action-sheet-btn',  // Add custom class
    },
    {
      text: 'Décharger',
      icon: 'cloud-download-outline',
      data: {
        action: 'discharge',
      },
      cssClass: 'custom-action-sheet-btn',
    },
    {
      text: 'Transférer',
      icon: 'swap-horizontal-outline',
      data: {
        action: 'transfer',
      },
      cssClass: 'custom-action-sheet-btn',
    },
    {
      text: 'Annuler',
      role: 'cancel',
      icon: 'close-outline',
      data: {
        action: 'cancel',
      },
      cssClass: 'custom-action-sheet-cancel',
    },
  ];


  constructor(
    private router: Router,
    private navCtrl: NavController,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit() {
    console.log("running from stock vehicule");
  }

  handleActionSheetDismiss(event: any) {
    const action = event.detail.data?.action;

    if (action) {
      switch (action) {
        case 'charge':
          this.navigateToChargeMakeCommande();
          break;
        case 'discharge':
          this.navigateToDechargeMakeCommande();
          break;
        case 'transfer':
          this.navigateToTransfertMakeCommande();
          break;
        case 'cancel':
          console.log('Action cancelled');
          break;
        default:
          break;
      }
    }
  }

  isModalOpen = false;
  selectedItem: any;
  openModal(item: any) {
    this.selectedItem = item;
    this.isModalOpen = true;
  }
  setOpen(isOpen: boolean): void {
    this.isModalOpen = isOpen;
  }

  currentOpen: string | null = null;
  toggleAccordion(id: string) {
    this.currentOpen = this.currentOpen === id ? null : id;
  }

  navigateToChargeMakeCommande(): void {
    const charge = true;
    this.router.navigate(["vendeur-pages/make-commande"], { state: { charge } })
  }

  navigateToDechargeMakeCommande(): void {
    const decharge = true;
    this.router.navigate(["vendeur-pages/make-commande"], { state: { decharge } })
  }

  navigateToTransfertMakeCommande(): void {
    const transfert = true;
    this.router.navigate(["vendeur-pages/make-commande"], { state: { transfert } })
  }

  selectedSegment: string = 'default';
  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
  }
}

