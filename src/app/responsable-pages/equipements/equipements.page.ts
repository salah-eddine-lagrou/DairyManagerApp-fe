import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipements',
  templateUrl: './equipements.page.html',
  styleUrls: ['./equipements.page.scss'],
})
export class EquipementsPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("running from equipements list for responsable");

  }

  classNameState: string = "";
  defineState() {
    this.classNameState = "state-equipement-move";
  }

  cancelStateDisplay() {
    this.classNameState = "";
  }

}
