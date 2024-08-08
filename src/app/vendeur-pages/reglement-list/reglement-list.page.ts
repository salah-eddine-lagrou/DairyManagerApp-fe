import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reglement-list',
  templateUrl: './reglement-list.page.html',
  styleUrls: ['./reglement-list.page.scss'],
})
export class ReglementListPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("running from reglement list page");

  }

}
