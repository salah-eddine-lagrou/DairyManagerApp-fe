import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decharge-action',
  templateUrl: './decharge-action.page.html',
  styleUrls: ['./decharge-action.page.scss'],
})
export class DechargeActionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("running from decharge page");

  }

  goToDetailAction() :void {
    const decharge = true;
    this.router.navigate(['magasinier-pages/details-action'], { state : { decharge }});
  }

}
