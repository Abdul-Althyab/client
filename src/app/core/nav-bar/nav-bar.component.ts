import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  visible: boolean = false;
  ToggleDropdown() {
    this.visible = !this.visible;
  }
}
