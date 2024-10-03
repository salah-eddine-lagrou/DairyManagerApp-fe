import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {
  selectedTab: string = 'home';  // Default tab can be set here

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen to the router events to detect when the route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedTab(this.router.url);
      }
    });

    // Initialize selectedTab based on the current route on page load
    this.updateSelectedTab(this.router.url);
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  updateSelectedTab(url: string) {
    // Check the current URL and set the selected tab accordingly
    if (url.includes('home')) {
      this.selectedTab = 'home';
    } else if (url.includes('demandes')) {
      this.selectedTab = 'demandes';
    } else if (url.includes('notifications')) {
      this.selectedTab = 'notifications';
    } else if (url.includes('support')) {
      this.selectedTab = 'support';
    }
  }

}
