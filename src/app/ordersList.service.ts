import { Order } from './order.model';
import { Injectable } from '@angular/core';

// tslint:disable-next-line:prefer-const
let orders: Order[] = [];

export class OrdersListService {

    constructor() {}

    AddProduct(newProduct: Order) {
      orders.push(newProduct);
    }

    printProducts() {
      console.log('******************')
      for (let i = 0 ; i < orders.length; i++) {
        console.log( (i + 1) + '- Product id: ' + orders[i].productId + ', Product name: ' + orders[i].productName +
                                    ' , Customer Name: ' + orders[i].firstName + ' ' + orders[i].lastName +
                                     ' , Address: ' + orders[i].address + ' ,Credit Card Number: ' + orders[i].creditCard);
      }
    }


}
