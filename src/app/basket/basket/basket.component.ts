import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { IBasket, IBasketItem } from '../../shared/Models/Basket';

@Component({
  selector: 'app-basket',
  standalone: false,
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css',
})
export class BasketComponent implements OnInit {
  constructor(private basketService: BasketService) {}
  basket: IBasket;
  ngOnInit(): void {
    this.basketService.basket$.subscribe({
      next: (value) => {
        this.basket = value; // Assign the basket value to the component variable
      },
      error: (error) => {
        console.log(error); // Log any errors
      },
    });
  }
  removeBasket(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item); // Call the service to remove the item from the basket
  }
  incrementItemQuantity(item: IBasketItem) {
    this.basketService.incrementBasketItemQuantity(item); // Call the service to increment the item quantity
  }
  decrementItemQuantity(item: IBasketItem) {
    this.basketService.decrementBasketItemQuantity(item); // Call the service to decrement the item quantity
  }
}
