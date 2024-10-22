import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) { }

  showTabs(): boolean {
    return (
      this.router.url.includes("vendeur-pages/home")
      || this.router.url.includes("responsable-pages/home")
      || this.router.url.includes("magasinier-pages/home")
      || this.router.url.includes("vendeur-pages/demandes")
      || this.router.url.includes("notifications")
    );
  }
}
