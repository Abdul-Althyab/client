import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { IBasket } from '../../shared/Models/Basket';

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
}
