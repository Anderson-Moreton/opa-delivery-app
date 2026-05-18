import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterLink,
  NavigationEnd
} from '@angular/router';

import { filter } from 'rxjs/operators';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {

  products: any[] = [];

  burger: any[] = [];
  hotdog: any[] = [];
  bebida: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadProducts();

    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationEnd
        )
      )
      .subscribe(() => {

        this.loadProducts();

      });

  }

  loadProducts(): void {

    this.productService
      .getProducts()
      .subscribe({

        next: (products: any) => {

          console.log(products);

          this.products = [...products];

          this.burger =
            this.products.filter(
              product =>
                product.category
                  ?.trim()
                  .toLowerCase() === 'burger'
            );

          this.hotdog =
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

          console.log('BURGER:', this.burger);

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  deleteProduct(id: number): void {

    const confirmDelete =
      confirm(
        'Deseja excluir este produto?'
      );

    if (!confirmDelete) {
      return;
    }

    this.productService
      .deleteProduct(id)
      .subscribe({

        next: () => {

          this.products =
            this.products.filter(
              product => product.id !== id
            );

          this.burger =
            this.products.filter(
              product =>
                product.category
                  ?.trim()
                  .toLowerCase() === 'burger'
            );

          this.hotdog =
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