import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.scss']
})
export class SideDrawerComponent {
  @Input() routes: { title: string; path: string; }
  @Input() drawerState: 'open'|'close';
}
