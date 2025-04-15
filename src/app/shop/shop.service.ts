import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagnation } from '../shared/Models/Pagnation';
import { ICategory } from '../shared/Models/Category';
import { ProductParam } from '../shared/Models/ProductParam';
import { IProduct } from '../shared/Models/Product';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  constructor(private http: HttpClient) {}
  baseUrl = 'https://localhost:7227/api/';
  
  getProduct(productParam: ProductParam) {
    let param = new HttpParams();
    if (productParam.categoryid !== 0) {
      param = param.append('categoryid', productParam.categoryid.toString());
    }
    if (productParam.sort) {
      param = param.append('sort', productParam.sort);
    }
    if (productParam.search) {
      param = param.append('search', productParam.search);
    }
    param = param.append('pageNumber', productParam.pageNumber);
    param = param.append('pageSize', productParam.pageSize);
    return this.http.get<IPagnation>(this.baseUrl + 'Products/get-all',{params:param});
  }

  getCategory() {
    return this.http.get<ICategory[]>(this.baseUrl + 'categories/get-all');
  }

  getProductDetails(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'Products/get-by-id/' + id);
  }
}
