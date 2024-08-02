import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  item: any;

  constructor(private router :Router) { }

  ngOnInit() {
    console.log("running from view-product");
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.item = navigation.extras.state['item'];
    }

  }

}
