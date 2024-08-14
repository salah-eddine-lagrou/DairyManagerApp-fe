import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reglements-list',
  templateUrl: './reglements-list.page.html',
  styleUrls: ['./reglements-list.page.scss'],
})
export class ReglementsListPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("running from reglement list responsable pages");

  }

}
