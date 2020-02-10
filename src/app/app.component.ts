import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationStart } from '@angular/router';

import { slideInAnimation, toggleSideDrawerAnimation } from './jcj-common/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation, toggleSideDrawerAnimation]
})
export class AppComponent {
  /** Array of all the routes for the page */
  routes = [
    { path: '/', title: 'Home' },
    { path: '/portfolio', title: 'Portfolio' },
    { path: '/contact', title: 'Contact' },
  ];
  /** The state of the side drawer */
  drawerState: 'open'|'close' = 'close';

  constructor(private _router: Router) {
    // Subscribe to navigation events to close the navigation drawer
    this._router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) this.drawerState = 'close';
    });
  }
  /** Prepares and sends route data for animations */
  prepareRoute = (outlet: RouterOutlet): string => outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
}
