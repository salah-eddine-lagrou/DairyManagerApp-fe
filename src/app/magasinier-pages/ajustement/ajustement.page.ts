import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajustement',
  templateUrl: './ajustement.page.html',
  styleUrls: ['./ajustement.page.scss'],
})
export class AjustementPage implements OnInit {
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
  categories = [
    { value: 'all', label: 'All' },
    { value: 'mozarella', label: 'Mozarella' },
    { value: 'creme', label: 'Crème de cuisson & liaison' },
    { value: 'produits', label: 'Produits d’importation' },
    { value: 'beurre', label: 'Beurre' },
  ];

  selectedCategory = 'all';
  filteredItems: any[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    console.log("running from ajustement page");
    this.filteredItems = this.items;
  }

  segmentChanged(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(item => item.category === category);
    }
  }

  decreaseQuantity(id: number, event: Event) {
    event.stopPropagation();
    let item = this.items.find(item => item.id === id);
    if (item) {
      if (item.quantity > 0) {
        item.quantity--;
        item.quantityStock++;
      }
      this.updateTotalPrice();
    } else {
      console.error('Item not found');
    }
  }

  increaseQuantity(id: number, event: Event) {
    event.stopPropagation();
    let item = this.items.find(item => item.id === id);
    if (item) {
      if (item.quantity < item.quantityStock) {
        item.quantity++;
        item.quantityStock--;
      }
      this.updateTotalPrice();
    } else {
      console.error('Item not found');
    }
  }


  maxQuantity(id: number, event: Event): void {
    event.stopPropagation();
    let item = this.items.find(item => item.id === id);
    if (item) {
      if (item.maxQuantityDisplayed === false) {
        item.maxQuantityDisplayed = true;
        item.quantity = item.quantityStock;
      }
      this.updateTotalPrice();
    }
  }

  resetQuantity(id: number, event: Event) {
    event.stopPropagation();
    let item = this.items.find(item => item.id === id);
    if (item) {
      item.maxQuantityDisplayed = false;
      item.quantity = 0;
      this.updateTotalPrice();
    }
  }

  updateTotalPrice(): void {
    this.items.reduce((total, item) => total + (item.quantity * item.price), 0);
  }


  isModalOpen = false;
  selectedItem: any;
  openModal(item: any) {
    this.selectedItem = item;
    this.isModalOpen = true;
  }
  setOpen(isOpen: boolean, idItem: number = 0): void {
    this.isModalOpen = isOpen;
  }

  currentOpen: string | null = null;
  toggleAccordion(id: string) {
    this.currentOpen = this.currentOpen === id ? null : id;
  }

  ajuster() :void {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Mise à jour a été effectuer avec succée"
    });
    this.navCtrl.setDirection("back");
    this.router.navigateByUrl("magasinier-pages/home");
  }

}
