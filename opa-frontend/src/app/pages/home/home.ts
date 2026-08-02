import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { ProductCardComponent } from '../../components/product-card/product-card';

import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { FavoriteService } from '../../services/favorite.service';
import { AuthService } from '../../services/auth.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ProductCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {

  // CAROUSEL
  currentIndex = 0;

  images = ['assets/img/carousel01.png', 'assets/img/carousel02.png', 'assets/img/carousel03.png', 'assets/img/carousel04.png'];

  private carouselInterval: any;

  // PRODUCTS
  products: any[] = [];

  categories: any[] = [];

  selectedCategoryId: number | null = null;

  search = '';

  category = '';

  isSearching = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  // INIT
  ngOnInit(): void {
    this.startCarousel();

    this.route.queryParams.subscribe((params) => {
      this.search = params['search'] || '';
      this.category = params['category'] || '';

      this.isSearching =
        this.search.trim() !== '' || (this.category !== '' && this.category !== 'todos');

      this.loadFavorites();
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.carouselInterval);
  }

  // CAROUSEL
  startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;

      this.cdr.detectChanges();
    }, 5000);
  }

  restartCarousel(): void {
    clearInterval(this.carouselInterval);
    this.startCarousel();
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;

    this.restartCarousel();
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;

    this.restartCarousel();
  }

  goTo(index: number): void {
    this.currentIndex = index;

    this.restartCarousel();
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

  // FAVORITES
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

  // PRODUCTS
  loadProducts(): void {
    this.productService.getProducts(this.search, this.category).subscribe({
      next: (products: any) => {
        this.products = products;

        this.loadCategories();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  // CATEGORIES
  loadCategories(): void {
    this.categoryService.getMenuCategories().subscribe({
      next: (categories: any) => {
        this.categories = categories.map((category: any) => {
          return {
            ...category,

            products: this.products.filter((product) => product.category_id === category.id),
          };
        });

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

  // SEARCH
  clearSearch(): void {
    this.router.navigate(['/']);
  }
}
