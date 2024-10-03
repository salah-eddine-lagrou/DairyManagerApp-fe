import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
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
  makeCommandeCharge: boolean = false;

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
    private navCtrl: NavController,
    private renderer: Renderer2
  ) { }

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.commande = navigation.extras.state['commande'];
      const gratuite = navigation.extras.state['gratuite'];
      const bl = navigation.extras.state['bl'];
      const trasnfertList = navigation.extras.state['trasnfertList'];
      const makeCommandeCharge = navigation.extras.state['makeCommandeCharge'];
      if (gratuite) {
        this.gratuite = gratuite;
      } else if (bl) {
        this.bl = bl;
        for (const item of this.items) {
          this.totalPrice += item.price * item.quantity;
        }
      } else if (trasnfertList) {
        this.trasnfertList = trasnfertList;
      } else if (makeCommandeCharge) {
        this.makeCommandeCharge = makeCommandeCharge;
      }

      if (this.commande) {
        // calculating the total price to display it
        for (const item of this.commande) {
          this.totalPrice += item.quantity * item.price;
        }
      }
    }

    // const loading = await this.loadingController.create({
    //   message: 'Loading...',
    //   duration: 200,
    // });
    // await loading.present();
    // // Simulate some data fetching or processing
    // setTimeout(() => {
    //   loading.dismiss();
    // }, 200);


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
      this.totalPrice -= (item.quantity - 1) * item.price;
      item.quantity = 1;
    }
  }

  updateTotalPrice(): void {
    this.totalPrice = this.commande.reduce((total, item) => total + (item.quantity * item.price), 0);
  }

  deleteItem(item: any) {
    this.commande = this.commande.filter(i => i !== item);
    this.updateTotalPrice();
  }

  backMakeMakeCommande(): void {
    const stringCommande = JSON.stringify(this.commande);
    const stringGratuite = JSON.stringify(this.gratuite);
    localStorage.setItem("commande", stringCommande);
    localStorage.setItem("gratuite", stringGratuite);
    this.navCtrl.setDirection("back");
    this.router.navigateByUrl("vendeur-pages/make-commande");
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

  isEncaisserModalOpen = false;
  setEncaisserOpen(isOpen: boolean) {
    this.isEncaisserModalOpen = isOpen;
  }



  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
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

  presentAlert2(item: any) {
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
        this.setOpen(false);
      }
    });
  }

  currentOpen: string | null = null;
  toggleAccordion(id: string) {
    this.currentOpen = this.currentOpen === id ? null : id;
  }

  confirmPaiement() {
    this.paiement.id = 1;
    this.setEncaisserOpen(false);

    setTimeout(() => {
      this.renderer.addClass(this.itemElement.nativeElement, 'highlight-animation');

      setTimeout(() => {
        this.renderer.removeClass(this.itemElement.nativeElement, 'highlight-animation');
      }, 1500);
    }, 100);

  }


  presentCancelAlert(home = false) {
    if (this.bl || this.trasnfertList) {
      this.navCtrl.setDirection("back");
      this.router.navigateByUrl("vendeur-pages/home");
    } else {
      Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Voulez-vous vraiment annuler ? La création de commande sera annulée.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Confirmer",
        cancelButtonText: "Annuler",
        heightAuto: false
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Alert confirmed');
          localStorage.clear();
          this.commande = [];
          this.paiement = {
            "id": 0,
            "montant": 0,
            "modePaiement": "especes",
            "note": ""
          };
          this.gratuite = false;
          this.navCtrl.setDirection("back");
          if (home)
            this.router.navigateByUrl("vendeur-pages/home");
          else
            this.router.navigateByUrl("vendeur-pages/client-actions");
        } else {
          console.log('Alert canceled');
        }
      });
    }

  }
}
