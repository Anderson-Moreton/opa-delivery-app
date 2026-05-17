import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    this.loadProducts();

  }

  loadProducts(): void {

    this.productService
      .getProducts()
      .subscribe({

        next: (products: any) => {

          console.log(products);

          this.products = products;

          this.burger =
            this.products.filter(
              product =>
                product.category?.trim() === 'Burger'
            );

          this.hotdog =
            this.products.filter(
              product =>
                product.category?.trim() === 'Hot Dog'
            );

          this.bebida =
            this.products.filter(
              product =>
                product.category?.trim() === 'Bebida'
            );

          console.log('BURGER:', this.burger);

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  deleteProduct(id: number) {

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
               product.category?.trim() === 'Burger'
           );

         this.hotdog =
           this.products.filter(
             product =>
               product.category?.trim() === 'Hot Dog'
           );

         this.bebida =
           this.products.filter(
             product =>
               product.category?.trim() === 'Bebida'
           );

       },

       error: (error) => {

         console.error(error);

       }

    });

  } 

}