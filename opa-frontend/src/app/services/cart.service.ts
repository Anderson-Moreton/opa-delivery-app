import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: any[] = [];

  constructor() {
    this.loadCart();
  }

  getItems() {
    return this.items;
  }

  addItem(product: any) {

    const existing = this.items.find(
      item => item.name === product.name
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        ...product,
        quantity: 1
      });
    }

    this.saveCart();
  }

  increaseQuantity(item: any) {
    item.quantity += 1;
    this.saveCart();
  }

  decreaseQuantity(item: any) {

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.removeItem(this.items.indexOf(item));
    }

    this.saveCart();
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getTotal() {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getTotalItems() {
    return this.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  /* salva no navegador */
  private saveCart() {
    localStorage.setItem(
      'cart',
      JSON.stringify(this.items)
    );
  }

  /* recupera do navegador */
  private loadCart() {

    const cart = localStorage.getItem('cart');

    if (cart) {
      this.items = JSON.parse(cart);
    }
  }
}