import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/Models/Product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  MainImage: string;
  quantity: number = 1;
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private basketService: BasketService
  ) {}
  ngOnInit(): void {
    this.loadProductDetails();
  }

  loadProductDetails() {
    this.shopService
      .getProductDetails(parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe((value: IProduct) => {
        this.product = value;
        this.MainImage = value.pictures[0].imageName;
      });
  }
  changeMainImage(image: string) {
    this.MainImage = image;
  }

  incrementQuantity() {
    if (this.quantity < 10) {
      this.quantity++;
      this.toast.success('Incremented quantity to ' + this.quantity, 'Success');
    } else {
      this.toast.warning('You can only add 10 items to the cart', 'Enough');
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.toast.success('Decremented quantity to ' + this.quantity, 'Success');
    } else {
      this.toast.warning('You can not decrement below 1 item.', 'Error');
    }
  }

  addToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
    this.toast.success(
      'Added ' + this.quantity + ' items to the basket',
      'Success'
    );
  }

  calculateDiscount(oldPrice: number, newPrice: number): number {
    return parseFloat(
      Math.round(((oldPrice - newPrice) / oldPrice) * 100).toFixed(1)
    );
  }
}
