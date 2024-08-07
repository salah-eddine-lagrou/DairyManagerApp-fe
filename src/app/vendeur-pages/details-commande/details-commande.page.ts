import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

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
      if (gratuite) {
        this.gratuite = gratuite;
      } else {
        console.log("coming from make gratuite: false");
      }
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

  public alertButtons = [
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
        this.isAlertOpen = false;
      },
    },
    {
      text: 'Confirmer',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.deleteItem(this.itemToDelete);
        this.isAlertOpen = false;
      },
    },
  ];
  public alertButtons2 = [
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
        this.isAlertOpen = false;
      },
    },
    {
      text: 'Confirmer',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.deleteItem(this.itemToDelete);
        this.isAlertOpen = false;
        this.setOpen(false);
      },
    },
  ];

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  public isAlertOpen = false;
  private itemToDelete: any;
  presentAlert(item: any) {
    this.itemToDelete = item;
    this.isAlertOpen = true;
  }
  public isAlertOpen2 = false;
  presentAlert2(item: any) {
    this.itemToDelete = item;
    this.isAlertOpen2 = true;
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


  public alertCancelButtons = [
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
        this.isCancelAlertOpen = false;
      },
    },
    {
      text: 'Confirmer',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.isCancelAlertOpen = false;
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
        if (this.homeRouting)
          this.router.navigateByUrl("vendeur-pages/home");
        else
          this.router.navigateByUrl("vendeur-pages/client-actions");
      },
    },
  ];
  public isCancelAlertOpen = false;
  homeRouting = false;
  presentCancelAlert(home=false) {
    this.isCancelAlertOpen = true;
    this.homeRouting = home;
  }

  backToHome() :void {
    this.presentCancelAlert(true);
  }
}
