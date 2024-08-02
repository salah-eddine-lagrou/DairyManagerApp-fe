import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-make-commande',
  templateUrl: './make-commande.page.html',
  styleUrls: ['./make-commande.page.scss'],
})
export class MakeCommandePage implements OnInit {

  items = [
    { id: 1 , maxQuantityDisplayed: false, name: 'pizzarella', image: "assets/img/produits/pizzarella.png", category: 'mozarella', quantity: 0, quantityStock: 20, price: 35 },
    { id: 2 , maxQuantityDisplayed: false, name: 'pizza cheese', image: "assets/img/produits/pizza cheese.png", category: 'mozarella', quantity: 0, quantityStock: 25, price: 40 },
    { id: 3 , maxQuantityDisplayed: false, name: 'creme du chef', image: "assets/img/produits/creme du chef.png", category: 'creme', quantity: 0, quantityStock: 30, price: 20 },
    { id: 4 , maxQuantityDisplayed: false, name: 'creme pro', image: "assets/img/produits/creme pro.png", category: 'creme', quantity: 0, quantityStock: 10, price: 30 },
    { id: 5 , maxQuantityDisplayed: false, name: 'cucina blue', image: "assets/img/produits/cucina blue.png", category: 'creme', quantity: 0, quantityStock: 5, price: 25 },
    { id: 6 , maxQuantityDisplayed: false, name: 'beurre fermier frais', image: "assets/img/produits/beurre fermier frais.png", category: 'beurre', quantity: 0, quantityStock: 6, price: 35 },
    { id: 7 , maxQuantityDisplayed: false, name: 'sauce algerien', image: "assets/img/produits/sauce algerien.png", category: 'produits', quantity: 0, quantityStock: 60, price: 40 },
    { id: 8 , maxQuantityDisplayed: false, name: 'burger sauce', image: "assets/img/produits/sauce burger.png", category: 'produits', quantity: 0, quantityStock: 30, price: 25 },
    { id: 9 , maxQuantityDisplayed: false, name: 'veldhuyzen kaas gouda', image: "assets/img/produits/veldhuyzen kaas gouda.png", category: 'produits', quantity: 0, quantityStock: 9, price: 50 },
    // Add more items as needed
  ];
  categories = [
    { value: 'all', label: 'All' },
    { value: 'mozarella', label: 'Mozarella' },
    { value: 'creme', label: 'Crème de cuisson & liaison' },
    { value: 'produits', label: 'Produits d’importation' },
    { value: 'beurre', label: 'Beurre' },
  ];
  selectedCategory = 'all';
  filteredItems = this.items;
  totalPrice: number = 0;

  constructor(private router :Router) { }

  ngOnInit() {
    console.log("running from make-commande");
  }

  segmentChanged(category: string) {
    this.selectedCategory = category;
    if (category === 'all') {
      this.filteredItems = this.items;
    } else {
      this.filteredItems = this.items.filter(item => item.category === category);
    }
  }

  decreaseQuantity(id: number) {
    const item = this.items.find(item => item.id === id);
    if (item !== undefined && item.quantity > 0) {
      item.quantity--;
      this.totalPrice -= item.price;
    }
  }

  increaseQuantity(id: number) {
    const item = this.items.find(item => item.id === id);
    if (item !== undefined && item.quantity < item.quantityStock) {
      item.quantity++;
      this.totalPrice += item.price;
    }
  }

  maxQuantity(id: number) :void{
    const item = this.items.find(item => item.id === id);
    if (item !== undefined && item.maxQuantityDisplayed === false) {
      item.maxQuantityDisplayed = true;
      this.totalPrice += (item.quantityStock - item.quantity) * item.price;
      item.quantity = item.quantityStock;
    }
  }

  resetQuantity(id: number) {
    const item = this.items.find(item => item.id === id);
    if (item !== undefined) {
      item.maxQuantityDisplayed = false;
      this.totalPrice -= item.quantity * item.price;
      item.quantity = 0;
    }
  }

  navigateToViewProduct(item: any) {
    this.router.navigate(['vendeur-pages/view-product'], { state: { item } });
  }

}
