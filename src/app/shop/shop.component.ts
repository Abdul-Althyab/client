import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { IPagnation } from '../shared/Models/Pagnation';
import { IProduct } from '../shared/Models/Product';
import { ICategory } from '../shared/Models/Category';
import { ProductParam } from '../shared/Models/ProductParam';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {

  constructor(private shopService: ShopService, private toastr:ToastrService) {}
  ngOnInit(): void {
    this.productParam.sort = this.SortingOption[0].value;
    this.getAllProducts();
    this.getCategories();
  }

  product: IProduct[];
  category: ICategory[];
  totalCount: number;
  productParam = new ProductParam();

  // Get all products
  getAllProducts() {
    this.shopService
      .getProduct(this.productParam)
      .subscribe({
        next: (value: IPagnation) => {
          this.product = value.data;
          this.totalCount = value.totalCount;
          this.productParam.pageNumber = value.pageNumber;
          this.productParam.pageSize = value.pageSize;
          this.toastr.success('Products loaded successfully', 'Success');
        },
      });
  }

  // Get categories

  getCategories() {
    this.shopService.getCategory().subscribe({
      next: (value) => {
        this.category = value;
        console.log(this.category);
      },
    });
  }

  // Filter products

  selectedId(categoryid: number) {
    this.productParam.categoryid = categoryid;
    this.getAllProducts();
  }

  // Sorting by price

  SortingOption = [
    { name: 'Price', value: 'Name' },
    { name: 'Lowest to Highest', value: 'PriceAsc' },
    { name: 'Highest to Lowest', value: 'PriceDesc' },
  ];

  sortingByPrice(sort: Event) {
    this.productParam.sort = (sort.target as HTMLSelectElement).value;
    this.getAllProducts();
  }

  // filtering by word

  onSearch(search: string) {
    this.productParam.search = search;
    this.getAllProducts();
  }

  @ViewChild('searchWord') searchInput!: ElementRef;
  @ViewChild('sortSelected') selected!: ElementRef;

  //resrt filter
  resetValues() {
    this.productParam.search = '';
    this.productParam.categoryid = 0;
    this.productParam.sort = '';
    this.searchInput.nativeElement.value = '';
    this.selected.nativeElement.selectedIndex = 0;
    this.getAllProducts();
  }

  // Pagination

  onChangePage(event: any) {
    this.productParam.pageNumber = event;
    this.getAllProducts();
    }
}
