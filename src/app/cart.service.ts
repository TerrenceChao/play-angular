import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  constructor(private http: HttpClient) { }

  addToCart(product) {
    console.log(`where is the product? ${JSON.stringify(product, null, 2)}`);
    this.items.push(product);
  }

  getItems() {
    console.log(`where is the items? ${JSON.stringify(this.items, null, 2)}`);
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get('/assets/shipping.json');
  }
}
