import { OrdersListService } from '../ordersList.service';
import { PRODUCTS } from './../productsList';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import {enableProdMode} from '@angular/core';

enableProdMode();

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = PRODUCTS;
  selectedProduct: Product;
  successAlertFlag = 'nothing';

  constructor(private ordersListService: OrdersListService) { }

  ngOnInit() {
    if (this.products != null) {
      this.selectedProduct = this.products[0];
    }
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
    document.getElementById('ScrollingTarget').scrollIntoView({ behavior: 'smooth' });
  }

  submitClick() {
    if (document.forms['purchaseForm']['firstName'].value === '' ||
        document.forms['purchaseForm']['lastName'].value === '' ||
        document.forms['purchaseForm']['address'].value === '' ||
        document.forms['purchaseForm']['cardNum'].value === '' ) {
        this.successAlertFlag = 'failed';
      } else {
        this.ordersListService.AddProduct( { productId: this.selectedProduct.id,
                                              productName: this.selectedProduct.name,
                                              firstName: document.forms['purchaseForm']['firstName'].value ,
                                              lastName: document.forms['purchaseForm']['lastName'].value ,
                                              address: document.forms['purchaseForm']['address'].value ,
                                              creditCard: document.forms['purchaseForm']['cardNum'].value ,
                                            });

        // clear all inputs after adding to array
        document.forms['purchaseForm'].reset();

        this.successAlertFlag = 'success';
    }

  }

  searchEngine() {
      let input, filter, ul, li, a, i, txtValue;
      input = document.getElementById('searchInput');
      filter = input.value.toUpperCase();
      ul = document.getElementById('products');
      li = ul.getElementsByTagName('li');

      // Loop through all list items, and hide those who don't match the search query
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName('a')[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = '';
        } else {
          li[i].style.display = 'none';
        }
    }
  }

  updateSuccessFlag() {
    this.successAlertFlag = 'nothing';
  }

  showOrders() {
    this.ordersListService.printProducts();
  }

}
