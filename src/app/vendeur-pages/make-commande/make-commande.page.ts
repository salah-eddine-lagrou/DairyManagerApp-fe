import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-make-commande',
  templateUrl: './make-commande.page.html',
  styleUrls: ['./make-commande.page.scss'],
})
export class MakeCommandePage implements OnInit {

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
  filteredItems = this.items;
  totalPrice: number = 0;

  alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit() {
    console.log("running from make commande");

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
    const item = this.items.find(item => item.id === id);
    if (item !== undefined && item.quantity > 0) {
      item.quantity--;
      this.totalPrice -= item.price;
    }
  }

  increaseQuantity(id: number, event: Event) {
    event.stopPropagation();
    const item = this.items.find(item => item.id === id);
    if (item !== undefined && item.quantity < item.quantityStock) {
      item.quantity++;
      this.totalPrice += item.price;
    }
  }

  maxQuantity(id: number, event: Event): void {
    event.stopPropagation();
    const item = this.items.find(item => item.id === id);
    if (item !== undefined && item.maxQuantityDisplayed === false) {
      item.maxQuantityDisplayed = true;
      this.totalPrice += (item.quantityStock - item.quantity) * item.price;
      item.quantity = item.quantityStock;
    }
  }

  resetQuantity(id: number, event: Event) {
    event.stopPropagation();
    const item = this.items.find(item => item.id === id);
    if (item !== undefined) {
      item.maxQuantityDisplayed = false;
      this.totalPrice -= item.quantity * item.price;
      item.quantity = 0;
    }
  }

  updateTotalPrice(): void {
    this.totalPrice = this.items.reduce((total, item) => total + (item.quantity * item.price), 0);
  }


  isModalOpen = false;
  selectedItem: any;
  openModal(item: any) {
    this.selectedItem = item;
    this.isModalOpen = true;
  }
  setOpen(isOpen: boolean, idItem: number = 0): void {
    this.isModalOpen = isOpen;
    if (idItem !== 0) {
      // Wait until modal is open
      setTimeout(() => {
        // Find the item element
        const itemElement = this.el.nativeElement.querySelector(`#item${idItem}`);
        if (itemElement) {
          // Scroll to the item element
          itemElement.scrollIntoView({ behavior: 'smooth' });

          // Add the animation class
          this.renderer.addClass(itemElement, 'highlight-animation');

          // Remove the animation class after animation ends
          setTimeout(() => {
            this.renderer.removeClass(itemElement, 'highlight-animation');
          }, 1000); // duration of the animation in milliseconds
        }
      }, 100); // delay to ensure modal is fully opened
    }
  }

  goToCommandeDetails(): void {
    const commande = this.items.filter(item => item.quantity > 0);
    console.log(commande);
    this.router.navigate(['vendeur-pages/details-commande'], { state: { commande } });
  }


  commandeStored: any;
  ionViewWillEnter() {
    const stringCommandeStored = localStorage.getItem("commande");
    if (stringCommandeStored) {
      this.commandeStored = JSON.parse(stringCommandeStored) as any[]; // Explicitly type as array

      // Create a map for quick lookup of commande items
      const commandeMap = new Map<number, number>();
      for (const commandeItem of this.commandeStored) {
        commandeMap.set(commandeItem.id, commandeItem.quantity);
      }

      // Update items quantities
      for (const item of this.items) {
        if (commandeMap.has(item.id)) {
          item.quantity = commandeMap.get(item.id) ?? 0; // Use optional chaining with a default value
        } else {
          item.quantity = 0;
          item.maxQuantityDisplayed = false;
        }
      }

      this.updateTotalPrice();
      localStorage.clear();
    } else {
      console.log("back from details commande: false");
    }
  }

  currentOpen: string | null = null;
  toggleAccordion(id: string) {
    this.currentOpen = this.currentOpen === id ? null : id;
  }




}
