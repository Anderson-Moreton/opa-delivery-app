import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { ChangeDetectorRef } from '@angular/core';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { CartService } from '../../services/cart.service';

import { OrderService } from '../../services/order.service';

import { PaymentService } from '../../services/payment.service';

import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

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

  cardName = '';

  installments = 1;

  needChange = false;

  changeFor: number | null = null;

  stripe: Stripe | null = null;

  elements: StripeElements | null = null;

  cardElement: StripeCardElement | null = null;

  clientSecret = '';

  isProcessing = false;

  paymentError = '';

  constructor(
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit(): Promise<void> {
    const user = localStorage.getItem('user');

    if (user) {
      const userData = JSON.parse(user);

      this.userName = userData.name || '';

      this.address = userData.address || '';
    }

    this.cartItems = this.cartService.getItems();

    this.total = this.cartService.getTotal();
  }

  async onPaymentMethodChange(): Promise<void> {
    if (this.paymentMethod === 'card') {
      setTimeout(async () => {
        await this.initializeStripe();
      }, 100);
    }
  }

  async initializeStripe(): Promise<void> {
    if (this.cardElement) {
      return;
    }

    this.stripe = await loadStripe(
      'pk_test_51TkTRaCDGorENsw8V9NxPHVmho1GdtsrDdwozQuJMNoQxEaRI3GpF3XhmhsBuOYLcJBkuBAw1K3RqAujyAwVBFxQ00Rjv0dAsF',
    );

    if (!this.stripe) {
      return;
    }

    this.elements = this.stripe.elements();

    this.cardElement = this.elements.create('card', {
      hidePostalCode: false,
    });

    setTimeout(() => {
      const cardContainer = document.getElementById('card-element');

      if (cardContainer && this.cardElement && !cardContainer.hasChildNodes()) {
        this.cardElement.mount('#card-element');
      }
    }, 300);
  }

  async processStripePayment(): Promise<boolean> {
    try {

      if (!this.stripe || !this.cardElement) {

        alert('Stripe não inicializado');

        return false;
      }

      await this.createPaymentIntent();

      const result = await this.stripe.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.cardElement,
          billing_details: {
            name: this.cardName,
          },
        },
      });

      if (result.error) {

        this.paymentError = result.error.message || 'Pagamento recusado';

        this.isProcessing = false;

        this.cdr.detectChanges();

        return false;
      }

      if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {

        return true;
      }

      this.isProcessing = false;

      return false;
    } catch (error) {

      this.isProcessing = false;

      this.paymentError = 'Erro ao processar pagamento';

      return false;
    }
  }

  createPaymentIntent(): Promise<string> {
    return new Promise((resolve, reject) => {
      const amountInCents = Math.round(this.total * 100);

      this.paymentService.createPaymentIntent(amountInCents).subscribe({
        next: (response) => {
          this.clientSecret = response.clientSecret;

          resolve(response.clientSecret);
        },

        error: (error) => {
          this.paymentError = 'Erro ao iniciar pagamento';

          reject(error);
        },
      });
    });
  }

  async confirmOrder(): Promise<void> {
    this.paymentError = '';

    if (!this.address.trim()) {
      alert('Digite o endereço');

      return;
    }

    if (this.paymentMethod === 'card' && !this.cardName.trim()) {
      alert('Digite o nome impresso no cartão');

      return;
    }

    this.isProcessing = true;

    if (this.paymentMethod === 'card') {
      const paymentApproved = await this.processStripePayment();

      if (!paymentApproved) {
        this.isProcessing = false;

        this.cdr.detectChanges();

        return;
      }
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
        this.isProcessing = false;

        this.cartService.clearCart();

        this.router.navigate(['/order-success']);
      },

      error: (error) => {
        this.isProcessing = false;

        alert('Erro ao criar pedido');
      },
    });
  }
}
