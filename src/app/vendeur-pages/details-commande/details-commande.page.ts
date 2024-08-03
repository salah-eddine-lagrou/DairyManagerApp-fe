import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-details-commande',
  templateUrl: './details-commande.page.html',
  styleUrls: ['./details-commande.page.scss'],
})
export class DetailsCommandePage implements OnInit {
  commande: any[] = [];
  totalPrice: number = 0;

  constructor(private router: Router, private loadingController: LoadingController) { }

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.commande = navigation.extras.state['commande'];
    }

    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 500,
    });

    await loading.present();

    // Simulate some data fetching or processing
    setTimeout(() => {
      loading.dismiss();
    }, 500);

    // calculating the total price to display it
    for (const item of this.commande) {
      this.totalPrice += item.quantity * item.price;
    }
  }

  decreaseQuantity(id: number, event: Event) {
    event.stopPropagation();
    const item = this.commande.find(item => item.id === id);
    if (item !== undefined && item.quantity > 1) {
      item.quantity--;
      this.totalPrice -= item.price;
    }
  }

  increaseQuantity(id: number, event: Event) {
    event.stopPropagation();
    const item = this.commande.find(item => item.id === id);
    if (item !== undefined && item.quantity < item.quantityStock) {
      item.quantity++;
      this.totalPrice += item.price;
    }
  }

  maxQuantity(id: number, event: Event): void {
    event.stopPropagation();
    const item = this.commande.find(item => item.id === id);
    if (item !== undefined && item.maxQuantityDisplayed === false) {
      item.maxQuantityDisplayed = true;
      this.totalPrice += (item.quantityStock - item.quantity) * item.price;
      item.quantity = item.quantityStock;
    }
  }

  resetQuantity(id: number, event: Event) {
    event.stopPropagation();
    const item = this.commande.find(item => item.id === id);
    if (item !== undefined) {
      item.maxQuantityDisplayed = false;
      this.totalPrice -= item.quantity * item.price;
      item.quantity = 0;
    }
  }

  updateTotalPrice(): void {
    this.totalPrice = this.commande.reduce((total, item) => total + (item.quantity * item.price), 0);
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

}
