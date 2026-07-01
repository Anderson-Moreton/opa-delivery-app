import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { ProductCardComponent } from '../../components/product-card/product-card';

import { ProductService } from '../../services/product.service';

import { CategoryService } from '../../services/category.service';

import { FavoriteService } from '../../services/favorite.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ProductCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  // CAROUSEL
  currentIndex = 0;

  images = ['assets/img/carousel01.png', 'assets/img/carousel02.png', 'assets/img/carousel03.png'];

  // PRODUCTS
  products: any[] = [];

  // DYNAMIC CATEGORIES
  categories: any[] = [];

  // ACTIVE CATEGORY
  selectedCategoryId: number | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  // CAROUSEL
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

  // CATEGORY NAVIGATION
  scrollToCategory(categoryId: number): void {
    const element = document.getElementById(`category-${categoryId}`);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const sections = document.querySelectorAll('[id^="category-"]');

    let currentId: number | null = null;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();

      if (rect.top <= 200) {
        currentId = Number(section.id.replace('category-', ''));
      }
    });

    if (currentId !== null && currentId !== this.selectedCategoryId) {
      this.selectedCategoryId = currentId;

      this.cdr.detectChanges();
    }
  }

  // LOAD FAVORITES
  loadFavorites(): void {
    const user = this.authService.getCurrentUser();

    if (!user) {
      this.loadProducts();
      return;
    }

    this.favoriteService.getFavorites(user.id).subscribe({
      next: (favorites) => {
        this.favoriteService.setFavorites(favorites);

        this.loadProducts();
      },

      error: () => {
        this.loadProducts();
      },
    });
  }

  // LOAD PRODUCTS
  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: any) => {
        this.products = products;

        this.loadCategories();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  // LOAD CATEGORIES
  loadCategories(): void {
    this.categoryService.getMenuCategories().subscribe({
      next: (categories: any) => {
        this.categories = categories.map((category: any) => {
          return {
            ...category,

            products: this.products.filter((product) => product.category_id === category.id),
          };
        });

        // Primeira categoria selecionada ao carregar
        if (this.categories.length > 0) {
          this.selectedCategoryId = this.categories[0].id;
        }

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
