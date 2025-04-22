import { v4 as uuidv4 } from 'uuid';
export interface IBasket {
    id: string
    basketItems: IBasketItem[]
  }
  
  export interface IBasketItem {
    id: number
    name: string
    description: string
    picture: string
    quantity: number
    price: number
    category: string
  }
  export class Basket implements IBasket {
      id = uuidv4(); // Generate a unique ID for the basket
      basketItems: IBasketItem[] = [];
  }
  export interface IBasketTotal {
    shipping: number;
    subtotal: number;
    total: number;
  }