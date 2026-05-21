import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { ProductCardComponent } from '../../components/product-card/product-card';

import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

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

    this.currentIndex =
      (this.currentIndex + 1) % this.images.length;

  }

  prev() {

    this.currentIndex =
      (this.currentIndex - 1 + this.images.length)
      % this.images.length;

  }

  goTo(index: number) {

    this.currentIndex = index;

  }

  // PRODUCTS
  products: any[] = [];

  // DYNAMIC CATEGORIES
  categories: any[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
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

          this.loadCategories();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  loadCategories(): void {

    this.categoryService
      .getMenuCategories()
      .subscribe({

        next: (categories: any) => {

          this.categories =
            categories.map(
              (category: any) => {

                return {

                  ...category,

                  products:
                    this.products.filter(
                      product =>
                        product.category_id === category.id
                    )

                };

              }
            );

          console.log(this.categories);

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

}