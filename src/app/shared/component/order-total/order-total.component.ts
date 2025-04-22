import { Component, OnInit } from '@angular/core';
import { IBasketTotal } from '../../Models/Basket';
import { BasketService } from '../../../basket/basket.service';

@Component({
  selector: 'app-order-total',
  standalone: false,
  templateUrl: './order-total.component.html',
  styleUrl: './order-total.component.css',
})
export class OrderTotalComponent implements OnInit {
  basketTotals: IBasketTotal;
  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketService.basketTotal$.subscribe({
      next: (basketTotal: IBasketTotal) => {
        this.basketTotals = basketTotal;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
