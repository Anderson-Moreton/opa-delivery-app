import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})

export class PaymentComponent
implements OnInit {

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
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    const user =
      localStorage.getItem('user');

    if (user) {

      const userData =
        JSON.parse(user);

      this.userName =
        userData.name || '';

      this.address =
        userData.address || '';

    }

    this.cartItems =
      this.cartService.getItems();

    this.total =
      this.cartService.getTotal();

  }

}