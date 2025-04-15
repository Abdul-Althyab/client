import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  constructor(private basketService: BasketService) {}
  ngOnInit(): void {
    const id = localStorage.getItem('basketId'); // Get the basket ID from local storage
    this.basketService.getBasket(id).subscribe({
      next(value) {
        console.log(value); // Log the basket value
      },
      error(error) {
        console.log(error); // Log any errors
      },
    }); // Fetch the basket when the component initializes
  
  }
  visible: boolean = false;
  ToggleDropdown() {
    this.visible = !this.visible;
  }
}
