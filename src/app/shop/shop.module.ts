import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ShopComponent } from './shop.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterLink, RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';




@NgModule({
  declarations: [
    ShopComponent,
    ShopItemComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    RouterModule,
    RouterLink,
    NgxImageZoomModule
  ],
  exports: [
  ]
})
export class ShopModule { }
