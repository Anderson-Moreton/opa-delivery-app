import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ToastService } from '../../services/toast.service';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-create-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './admin-create-product.html',
  styleUrls: ['./admin-create-product.css']
})
export class AdminCreateProductComponent implements OnInit {

  name = '';

  description = '';

  price: number | null = null;

  category = 'Burger';

  image = '';

  editMode = false;

  productId: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    const id =
      this.route.snapshot.paramMap.get('id');

    if (id) {

      this.editMode = true;

      this.productId = Number(id);

      this.productService
        .getProductById(this.productId)
        .subscribe({

          next: (product: any) => {

            this.name = product[0].name;

            this.description =
              product[0].description;

            this.price =
              product[0].price;

            this.category =
              product[0].category;

            this.image =
              product[0].image;

          },

          error: (error) => {

            console.error(error);

            this.toast.show(
              'Erro ao carregar produto',
              'error'
            );

          }

        });

    }

  }

  saveProduct() {

    if (
      !this.name ||
      !this.description ||
      !this.price ||
      !this.category
    ) {

      this.toast.show(
        'Preencha todos os campos',
        'error'
      );

      return;

    }

    const product = {

      name: this.name,

      description: this.description,

      price: Number(this.price),

      category: this.category,

      image: this.image

    };

    // UPDATE PRODUCT
    if (
      this.editMode &&
      this.productId
    ) {

      this.productService
        .updateProduct(
          this.productId,
          product
        )
        .subscribe({

          next: () => {

            this.toast.show(
              'Produto atualizado com sucesso',
              'success'
            );

            this.router.navigate([
              '/admin/dashboard'
            ]);

          },

          error: (error) => {

            console.error(error);

            this.toast.show(
              'Erro ao atualizar produto',
              'error'
            );

          }

        });

    }

    // CREATE PRODUCT
    else {

      this.productService
        .createProduct(product)
        .subscribe({

          next: () => {

            this.toast.show(
              'Produto cadastrado com sucesso',
              'success'
            );

            this.router.navigate([
              '/admin/dashboard'
            ]);

          },

          error: (error) => {

            console.error(error);

            this.toast.show(
              'Erro ao cadastrar produto',
              'error'
            );

          }

        });

    }

  }

}