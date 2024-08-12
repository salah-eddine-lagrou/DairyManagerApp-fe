import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charge-action',
  templateUrl: './charge-action.page.html',
  styleUrls: ['./charge-action.page.scss'],
})
export class ChargeActionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("running from charge page");

  }

  goToDetailAction() :void {
    const charge = true;
    this.router.navigate(['magasinier-pages/details-action'], { state : { charge }});
  }

}
