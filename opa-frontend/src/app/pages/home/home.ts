import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { ProductCardComponent } from '../../components/product-card/product-card';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  // CAROUSEL
  currentIndex = 0;

  images = [
    'assets/img/cardapioBurguersMenu.jpg',
    'assets/img/cardapioDogsMenu.jpg',
    'assets/img/cardapioBebidaMenu.jpg'
  ];

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

  // PRODUCTS
  products: any[] = [];

  burger: any[] = [];
  dog: any[] = [];
  bebida: any[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {

  this.productService
    .getProducts()
    .subscribe({

      next: (products: any) => {

        this.products = products;

        this.burger =
          this.products.filter(
            product =>
              product.category
                ?.trim()
                .toLowerCase() === 'burger'
          );

        this.dog =
          this.products.filter(
            product =>
              product.category
                ?.trim()
                .toLowerCase() === 'hot dog'
          );

        this.bebida =
          this.products.filter(
            product =>
              product.category
                ?.trim()
                .toLowerCase() === 'bebida'
          );
        
        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(error);

      }

    });

}

}