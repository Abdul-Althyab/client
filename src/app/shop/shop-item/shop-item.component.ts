import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Models/Product';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-shop-item',
  standalone: false,
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.css'
})
export class ShopItemComponent {
  constructor(private serviceBasket: BasketService) {}

  // Define the input property for the product
@Input() product: IProduct;

setBasketValue() {
  this.serviceBasket.addItemToBasket(this.product); // Add the product to the basket with a quantity of 1
}
}
