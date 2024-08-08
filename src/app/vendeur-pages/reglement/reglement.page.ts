import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reglement',
  templateUrl: './reglement.page.html',
  styleUrls: ['./reglement.page.scss'],
})
export class ReglementPage implements OnInit {
  paiement = {
    "id": 0,
    "montant": 0,
    "modePaiement": "especes",
    "note": ""
  };

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("running from reglement page");

  }

  confirmPaiement() {
    this.paiement.id = 1;
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Paiement enregistré avec succès"
    });

    this.router.navigate(["vendeur-pages/client-actions"]);
  }

}
