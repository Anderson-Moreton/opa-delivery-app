import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { CartService } from '../../services/cart.service';

import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css'],
})
export class PaymentComponent implements OnInit {
  paymentMethod = 'pix';

  userName = '';

  address = '';

  cartItems: any[] = [];

  total = 0;

  // CARD FIELDS

  cardNumber = '';

  cardName = '';

  expiration = '';

  cvv = '';

  installments = 1;

  // CASH

  needChange = false;

  changeFor: number | null = null;

  constructor(
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (user) {
      const userData = JSON.parse(user);

      this.userName = userData.name || '';

      this.address = userData.address || '';
    }

    this.cartItems = this.cartService.getItems();

    this.total = this.cartService.getTotal();
  }

  confirmOrder(): void {
    if (!this.address.trim()) {
      alert('Digite o endereço');

      return;
    }

    if (this.paymentMethod === 'credit' || this.paymentMethod === 'debit') {
      if (!this.cardNumber || !this.cardName || !this.expiration || !this.cvv) {
        alert('Preencha os dados do cartão');

        return;
      }
    }

    if (this.paymentMethod === 'cash' && this.needChange && !this.changeFor) {
      alert('Digite o valor do troco');

      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const order = {
      userId: user.id,

      total: this.total,

      paymentMethod: this.paymentMethod,

      items: this.cartItems,
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        this.cartService.clearCart();

        this.router.navigate(['/order-success']);
      },

      error: (error) => {
        console.error(error);

        alert('Erro ao criar pedido');
      },
    });
  }
}
