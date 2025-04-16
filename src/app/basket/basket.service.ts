import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem } from '../shared/Models/Basket';
import { IProduct } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://localhost:7227/api/';

  private basketSource = new BehaviorSubject<IBasket>(null); // BehaviorSubject is used to hold the current value of the basket
  basket$ = this.basketSource.asObservable();

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'Baskets/get-basket-item/' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        console.log(basket);
        return basket; // return the basket after updating the BehaviorSubject
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http
      .post(this.baseUrl + 'Baskets/update-basket', basket)
      .subscribe({
        next: (response: IBasket) => {
          this.basketSource.next(response);
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(product: IProduct, quantity: number = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(
      product,
      quantity
    ); // map the product to a basket item
    let basket = this.getCurrentBasketValue(); // get the current basket or create a new one
    if (basket.id == null) {
      basket = this.createBasket(); // create a new basket if it doesn't exist
    }
    basket.basketItems = this.addOrUpdateItem(
      basket.basketItems,
      itemToAdd,
      quantity
    ); // add or update the item in the basket
    return this.setBasket(basket); // set the updated basket
  }
  private addOrUpdateItem(
    basketItems: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    const index = basketItems.findIndex((i) => i.id === itemToAdd.id); // find the index of the item in the basket
    if (index === -1) {
      itemToAdd.quantity = quantity; // if the item is not in the basket, set its quantity
      basketItems.push(itemToAdd); // add the item to the basket
    } else {
      basketItems[index].quantity += quantity; // if the item is already in the basket, update its quantity
    }
    return basketItems; // return the updated basket items
  }
  private createBasket(): IBasket {
    const basket = new Basket(); // create a new basket
    localStorage.setItem('basketId', basket.id); // set the basket id in local storage
    return basket; // return the new basket
  }
  private mapProductItemToBasketItem(
    product: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      id: product.id,
      name: product.name,
      picture: product.pictures[0].imageName,
      quantity: quantity,
      price: product.newPrice,
      category: product.categoryName,
    };
  }
}
