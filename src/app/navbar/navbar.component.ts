import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() drawerState: 'open'|'close';
  @Output() toggleDrawer = new EventEmitter<'open'|'close'>();

  emitToggleDrawer(force?: 'open'|'close'): void {
    this.toggleDrawer.emit(force || this.drawerState == 'open' ? 'close':'open');
  }
}


// export class NavbarComponent {

//   /** The current state of the menu button */
//   menuClosed: boolean;
//   /** If the menu is hidden from scrolling */
//   scrollHidden: boolean;
//   /** if a background should be displayed */
//   showBackground: boolean;

//   constructor(
//     private router: Router,
//     @Inject(WINDOW) private window: Window
//   ) {
//     this.menuClosed = true;
//     this.scrollHidden = false;
//     this.showBackground = this.window.pageYOffset > this.window.innerHeight - 100;
//   }

//   @HostListener("document:wheel", ['$event'])
//   wheelScroll($event: WheelEvent): void {
//     if (!this.menuClosed) return;
//     this.showBackground = this.window.pageYOffset > this.window.innerHeight - 100;
//     if ($event.deltaY < -2 && this.scrollHidden) this.scrollHidden = false;
//     else if ($event.deltaY > 4 && !this.scrollHidden) this.scrollHidden = true;
//   }

//   navToHome() {
//     this.menuClosed = true;
//     this.scrollHidden = false;
//     this.showBackground = false;
//     this.router.navigateByUrl('/').then(_ => this.window.scrollTo({ top: 0, behavior: 'smooth' }))
//   }
// }
