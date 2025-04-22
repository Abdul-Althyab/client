import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotal } from '../shared/Models/Basket';
import { IProduct } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://localhost:7227/api/';

  private basketSource = new BehaviorSubject<IBasket>(null); // BehaviorSubject is used to hold the current value of the basket
  basket$ = this.basketSource.asObservable(); // Observable to emit the current value of the basket
  private basketSourceTotal = new BehaviorSubject<IBasketTotal>(null); // BehaviorSubject to hold the current value of the basket total
  basketTotal$ = this.basketSourceTotal.asObservable(); // Observable to emit the current value of the basket total

  calculateTotal() {
    const basket = this.getCurrentBasketValue(); // get the current basket value
    const shipping = 0; // set the shipping cost to 0
    const subtotal = basket.basketItems.reduce((sum, item) => {
      return sum + item.price * item.quantity; // calculate the subtotal by multiplying the price and quantity of each item
    }, 0);
    const total = subtotal + shipping; // calculate the total by adding the subtotal and shipping cost
    this.basketSourceTotal.next({ shipping, subtotal, total }); // emit the new basket total
  }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'Baskets/get-basket-item/' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotal(); // calculate the total after getting the basket
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
          this.calculateTotal(); // calculate the total after setting the basket
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
      description: product.description,
      picture: product.pictures[0].imageName,
      quantity: quantity,
      price: product.newPrice,
      category: product.categoryName,
    };
  }

  incrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue(); // get the current basket
    const foundItemIndex = basket.basketItems.findIndex(
      (x) => x.id === item.id
    ); // find the index of the item in the basket
    basket.basketItems[foundItemIndex].quantity++; // increment the quantity of the item
    this.setBasket(basket); // set the updated basket
  }

  decrementBasketItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.basketItems.findIndex(
      (x) => x.id === item.id
    ); // find the index of the item in the basket
    if (basket.basketItems[foundItemIndex].quantity > 1) {
      basket.basketItems[foundItemIndex].quantity--; // decrement the quantity of the item
      this.setBasket(basket); // set the updated basket
    } else {
      this.removeItemFromBasket(item); // remove the item from the basket if its quantity is 1
    }
  }
  // remove the item from the basket
  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.basketItems.some((x) => x.id === item.id)) {
      // check if the item is in the basket
      basket.basketItems = basket.basketItems.filter((x) => x.id !== item.id); // remove the item from the basket
      if (basket.basketItems.length > 0) {
        this.setBasket(basket); // set the updated basket
      } else {
        this.deleteBasket(basket); // delete the basket if it's empty
      }
    }
  }
  // delete the basket
  deleteBasket(basket: IBasket) {
    return this.http
      .delete(this.baseUrl + 'Baskets/delete-basket-item/' + basket.id)
      .subscribe({
        next: (value) => {
          this.basketSource.next(null); // set the basket to null
          localStorage.removeItem('basketId'); // remove the basket id from local storage
        },
        error: (error) => {
          console.log(error); // log the error
        },
      });
  }
}
