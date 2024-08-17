import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-action',
  templateUrl: './details-action.page.html',
  styleUrls: ['./details-action.page.scss'],
})
export class DetailsActionPage implements OnInit {
  charge: boolean = false;
  decharge: boolean = false;

  items = [
    { id: 1, maxQuantityDisplayed: false, name: 'pizzarella', image: "assets/img/produits/pizzarella.png", category: 'mozarella', quantity: 5, quantityStock: 20, price: 35 },
    { id: 2, maxQuantityDisplayed: false, name: 'pizza cheese', image: "assets/img/produits/pizza cheese.png", category: 'mozarella', quantity: 4, quantityStock: 25, price: 40 },
    { id: 3, maxQuantityDisplayed: false, name: 'creme du chef', image: "assets/img/produits/creme du chef.png", category: 'creme', quantity: 2, quantityStock: 30, price: 20 },
    { id: 4, maxQuantityDisplayed: false, name: 'creme pro', image: "assets/img/produits/creme pro.png", category: 'creme', quantity: 1, quantityStock: 10, price: 30 },
    { id: 5, maxQuantityDisplayed: false, name: 'cucina blue', image: "assets/img/produits/cucina blue.png", category: 'creme', quantity: 4, quantityStock: 5, price: 25 },
  ];

  constructor(private router: Router, private navCtrl: NavController) { }

  async ngOnInit() {
    console.log("running from details action for charge and decharge pages");
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.charge = navigation.extras.state['charge'];
      this.decharge = navigation.extras.state['decharge'];
    }
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

  currentOpen: string | null = null;
  toggleAccordion(id: string) {
    this.currentOpen = this.currentOpen === id ? null : id;
  }

  decreaseQuantity(id: number, event: Event) {
    event.stopPropagation();
    const item = this.items.find(item => item.id === id);
    if (item !== undefined && item.quantity > 1) {
      item.quantity--;
    }
  }

  increaseQuantity(id: number, event: Event) {
    event.stopPropagation();
    const item = this.items.find(item => item.id === id);
    if (item !== undefined && item.quantity < item.quantityStock) {
      item.quantity++;
    }
  }

  maxQuantity(id: number, event: Event): void {
    event.stopPropagation();
    const item = this.items.find(item => item.id === id);
    if (item !== undefined && item.maxQuantityDisplayed === false) {
      item.maxQuantityDisplayed = true;
      item.quantity = item.quantityStock;
    }
  }

  resetQuantity(id: number, event: Event) {
    event.stopPropagation();
    const item = this.items.find(item => item.id === id);
    if (item !== undefined) {
      item.maxQuantityDisplayed = false;
      item.quantity = 1;
    }
  }

  deleteItem(item: any) {
    this.items = this.items.filter(i => i !== item);
  }

  updateTotalPrice(): void {
    this.items.reduce((total, item) => total + (item.quantity * item.price), 0);
  }

  presentAlert(item: any) {
    // this.itemToDelete = item;
    // this.isAlertOpen = true;
    Swal.fire({
      title: "Confirmer la suppression ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, retirer !",
      cancelButtonText: "Annuler",
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteItem(item);
      }
    });
  }

  confirmeCharge() :void {
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
      title: "La demande a été confirmée avec succèe"
    });
    this.navCtrl.setDirection("back");
    if (this.charge)
      this.router.navigateByUrl("magasinier-pages/charge-action");
    else if (this.decharge)
      this.router.navigateByUrl("magasinier-pages/decharge-action");
  }

  soumieDemande() :void {
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
      icon: "info",
      title: "La demande a été soumise pour la validation"
    });
    this.navCtrl.setDirection("back");
    if (this.charge)
      this.router.navigateByUrl("magasinier-pages/charge-action");
    else if (this.decharge)
      this.router.navigateByUrl("magasinier-pages/decharge-action");
  }


}
