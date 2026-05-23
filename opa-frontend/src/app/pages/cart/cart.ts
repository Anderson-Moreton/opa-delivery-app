import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})

export class CartComponent {

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  checkout(): void {

    const user =
      localStorage.getItem('user');

    if (!user) {

      this.router.navigate([
        '/login'
      ]);

      return;

    }

    this.router.navigate([
      '/payment'
    ]);

  }

}