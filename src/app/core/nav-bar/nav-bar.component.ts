import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../shared/Models/Basket';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  constructor(private basketService: BasketService) {}
  count: Observable<IBasket>; // Initialize the count variable
  ngOnInit(): void {
    const basketId = localStorage.getItem('basketId'); // Get the basket ID from local storage
    this.basketService.getBasket(basketId).subscribe({
      next: (value) => {
        console.log(value); // Log the basket value
        this.count = this.basketService.basket$; // Update the count with the number of items in the basket
      },
      error: (error) => {
        console.log(error); // Log any errors
      },
    }); // Fetch the basket when the component initializes
  }
  visible: boolean = false;
  ToggleDropdown() {
    this.visible = !this.visible;
  }
}
