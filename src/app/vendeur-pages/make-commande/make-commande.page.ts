
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import Swal from 'sweetalert2';

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
  // simple example for retour
  clientCommande = {
    items: [
      {
        id: 1,
        item: this.items[0],
        quantity: 6
      },
      {
        id: 2,
        item: this.items[1],
        quantity: 5
      },
      {
        id: 3,
        item: this.items[2],
        quantity: 10
      }
    ]
  }
  selectedCategory = 'all';
  filteredItems: any[] = [];
  totalPrice: number = 0;

  gratuite: boolean = false;
  gratuiteBack: boolean = false;
  retour: boolean = false;
  charge: boolean = false;  // ! takes its own page interface !
  decharge: boolean = false;
  transfert: boolean = false;



  constructor(
    private router: Router,
    private navCtrl: NavController,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit() {
    console.log("running from make commande");
    this.filteredItems = this.items;
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const gratuite = navigation.extras.state['gratuite'];
      const retour = navigation.extras.state['retour'];
      const charge = navigation.extras.state['charge'];
      const decharge = navigation.extras.state['decharge'];
      const transfert = navigation.extras.state['transfert'];
      if (gratuite) {
        this.gratuite = gratuite;
        console.log("comming from gratuite : true");

      } else if (retour) {
        this.retour = retour;
        console.log("comming from retour : true");
        this.filteredItems = this.clientCommande.items.map(itemObj => ({
          item: itemObj.item,       // Copy item details
          quantity: itemObj.quantity // Copy quantity
        }));
      } else if (charge) {
        this.charge = charge;
        console.log("comming from charge : true");
      } else if (decharge) {
        this.decharge = decharge;
        console.log("comming from decharge : true");
      } else if (transfert) {
        this.transfert = transfert;
        console.log("comming from transfert : true");
      }
    }
  }


  presentAlert() {
    Swal.fire({
      title: 'Retour est prêt',
      text: 'Confirmer le retour !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Alert confirmed');
        // TODO discuss with the team about the process of the return
        this.router.navigate(['vendeur-pages/client-actions']);
      } else {
        console.log('Alert canceled');
      }
    });
  }

  segmentChanged(category: string) {
    this.selectedCategory = category;
    if (this.retour) {
      if (category === 'all') {
        this.filteredItems = this.clientCommande.items;
      } else {
        this.filteredItems = this.clientCommande.items.filter(item => item.item.category === category);
      }
    } else {
      if (category === 'all') {
        this.filteredItems = this.items;
      } else {
        this.filteredItems = this.items.filter(item => item.category === category);
      }
    }

  }

  decreaseQuantity(id: number, event: Event) {
    event.stopPropagation();
    let item = this.items.find(item => item.id === id);
    if (item) {
      if (this.retour) {
        let itemReturn = this.clientCommande.items.find(itemObj => itemObj.item.id === id);
        if (itemReturn) {
          if (item.quantity > 0) {
            item.quantityStock--;
            item.quantity--;

            itemReturn.quantity++;
            // Update filteredItems
            this.filteredItems = this.clientCommande.items;
          }
        } else {
          console.error('ItemReturn not found');
        }
      } else {
        if (item.quantity > 0) {
          item.quantity--;
          item.quantityStock++;
          this.totalPrice -= item.price;
        }
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
      if (this.retour) {
        let itemReturn = this.clientCommande.items.find(itemObj => itemObj.item.id === id);

        if (itemReturn) {
          if (itemReturn.quantity > 0) {
            item.quantityStock++;
            item.quantity++;

            itemReturn.quantity--;
            // Update filteredItems
            this.filteredItems = this.clientCommande.items;

          }
        } else {
          console.error('ItemReturn not found');
        }
      } else {
        if (item.quantity < item.quantityStock) {
          item.quantity++;
          item.quantityStock--;
          this.totalPrice += item.price;
        }
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
      if (this.retour) {
        let itemReturn = this.clientCommande.items.find(itemObj => itemObj.item.id === id);
        itemReturn!.item.maxQuantityDisplayed = true;
        item.quantity = itemReturn!.quantity;
        itemReturn!.quantity = 0;
        // Update filteredItems
        this.filteredItems = this.clientCommande.items;

      } else {
        if (item.maxQuantityDisplayed === false) {
          item.maxQuantityDisplayed = true;
          this.totalPrice += (item.quantityStock - item.quantity) * item.price;
          item.quantity = item.quantityStock;
        }
      }
      this.updateTotalPrice();
    }
  }

  resetQuantity(id: number, event: Event) {
    event.stopPropagation();
    let item = this.items.find(item => item.id === id);
    if (item) {
      if (this.retour) {
        let itemReturn = this.clientCommande.items.find(itemObj => itemObj.item.id === id);
        itemReturn!.item.maxQuantityDisplayed = false;
        itemReturn!.quantity = item.quantity;
        item.quantity = 0;
        // Update filteredItems
        this.filteredItems = this.clientCommande.items;

      } else {
        item.maxQuantityDisplayed = false;
        this.totalPrice -= item.quantity * item.price;
        item.quantity = 0;
      }
      this.updateTotalPrice();
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
      setTimeout(() => {
        const itemElement = this.el.nativeElement.querySelector(`#item${idItem}`);
        if (itemElement) {
          itemElement.scrollIntoView({ behavior: 'smooth' });

          this.renderer.addClass(itemElement, 'highlight-animation');

          setTimeout(() => {
            this.renderer.removeClass(itemElement, 'highlight-animation');
          }, 1000);
        }
      }, 100);
    }
  }

  goToCommandeDetails(): void {
    const commande = this.items.filter(item => item.quantity > 0);
    if (this.gratuite) {
      const gratuite = this.gratuite;
      this.router.navigate(['vendeur-pages/details-commande'], { state: { gratuite, commande } });
    } else {
      this.router.navigate(['vendeur-pages/details-commande'], { state: { commande } });
    }
  }


  commandeStored: any;
  ionViewWillEnter() {
    const stringCommandeStored = localStorage.getItem("commande");
    const stringGratuiteStored = localStorage.getItem("gratuite");

    if (stringGratuiteStored) {
      this.gratuiteBack = JSON.parse(stringGratuiteStored) as boolean;
    } else {
      this.gratuiteBack = false;
      console.log("back from detail commande gratuite : false");
    }

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

  goBackToStock(): void {
    // Determine the alert text based on the conditions
    let alertText: string;
    if (this.charge) {
      alertText = 'Confirmer le chargement !';
    } else if (this.decharge) {
      alertText = 'Confirmer le déchargement !';
    } else {
      alertText = 'Confirmer le transfert au vendeur 1 !';
    }

    // Display the SweetAlert
    Swal.fire({
      text: alertText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Alert confirmed');
        this.router.navigate(['vendeur-pages/stock-vehicule']);
      } else {
        console.log('Alert canceled');
      }
    });
  }


  isAnyTrue(): boolean {
    return this.charge || this.decharge || this.transfert;
  }


}
