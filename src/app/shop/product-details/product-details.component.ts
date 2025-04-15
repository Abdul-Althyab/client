import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/Models/Product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  MainImage: string;
  constructor(private shopService: ShopService, private route: ActivatedRoute) {}
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
}
