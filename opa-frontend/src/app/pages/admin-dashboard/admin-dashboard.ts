import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router, RouterLink, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

import { ProductService } from '../../services/product.service';

import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent implements OnInit {
  products: any[] = [];

  categories: any[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.loadProducts();
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products: any) => {
        this.products = [...products];

        this.loadCategories();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories: any) => {
        this.categories = categories
          .map((category: any) => {
            return {
              ...category,

              products: this.products.filter((product) => product.category_id === category.id),
            };
          })
          .filter((category: any) => category.products.length > 0);

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  deleteProduct(id: number): void {
    const confirmDelete = confirm('Do you want to delete this product?');

    if (!confirmDelete) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter((product) => product.id !== id);

        this.loadCategories();

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
