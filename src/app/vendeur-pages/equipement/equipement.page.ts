import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.page.html',
  styleUrls: ['./equipement.page.scss'],
})
export class EquipementPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("running from equipement page");

  }

  classNameState: string = "";
  defineState() {
    this.classNameState = "state-equipement-move";
  }

  cancelStateDisplay() {
    this.classNameState = "";
  }

}
