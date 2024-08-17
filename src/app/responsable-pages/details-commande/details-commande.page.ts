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
  paiement = {
    "id": 0,
    "montant": 0,
    "modePaiement": "especes",
    "note": ""
  };
  totalPrice: number = 0;
  demandes: boolean = false;
  gratuites: boolean = false;

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
    private navCtrl: NavController
  ) { }

  async ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.demandes = navigation.extras.state['demandes'];
      this.gratuites = navigation.extras.state['gratuites'];
    }

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

  confirmerAction() {
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
    if (this.demandes)
      this.router.navigateByUrl("responsable-pages/demandes");
    else if (this.gratuites)
      this.router.navigateByUrl("responsable-pages/gratuites");
  }

  refuserAction()  {
    Swal.fire({
      title: "Êtes-vous sûr de vouloir refuser ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, refuser !",
      cancelButtonText: "Annuler",
      heightAuto: false
    }).then((result) => {
      if (result.isConfirmed) {
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
          title: "La demande a été refuser avec succèe"
        });
        this.navCtrl.setDirection("back");
        if (this.demandes)
          this.router.navigateByUrl("responsable-pages/demandes");
        else if (this.gratuites)
          this.router.navigateByUrl("responsable-pages/gratuites");
      }
    });
  }

}
