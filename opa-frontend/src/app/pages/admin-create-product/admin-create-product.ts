import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  Router,
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { ProductService } from '../../services/product.service';

import { CategoryService } from '../../services/category.service';

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

export class AdminCreateProductComponent
implements OnInit {

  name = '';

  description = '';

  price: number | null = null;

  category = '';

  categoryId: number | null = null;

  image = '';

  categories: any[] = [];

  editMode = false;

  productId: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.categoryService
      .getCategories()
      .subscribe({

        next: (categories: any) => {

          this.categories = categories;

          this.route.paramMap.subscribe(params => {

            const id = params.get('id');

            if (id) {

              this.editMode = true;

              this.productId = Number(id);

              this.loadProduct();

            }

          });

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  loadProduct(): void {

    if (!this.productId) {
      return;
    }

    this.productService
      .getProductById(this.productId)
      .subscribe({

        next: (response: any) => {

          if (
            !response ||
            response.length === 0
          ) {
            return;
          }

          const product = response[0];

          this.name =
            product.name || '';

          this.description =
            product.description || '';

          this.price =
            Number(product.price) || 0;

          this.category =
            product.category || '';

          this.image =
            product.image || '';

          this.onCategoryChange();

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  onCategoryChange(): void {

    const selectedCategory =
      this.categories.find(
        category =>
          category.name
            .trim()
            .toLowerCase()
          ===
          this.category
            .trim()
            .toLowerCase()
      );

    if (selectedCategory) {

      this.categoryId =
        selectedCategory.id;

    }

  }

  saveProduct(): void {

    if (
      !this.name ||
      !this.description ||
      !this.price ||
      !this.category
    ) {
      return;
    }

    this.onCategoryChange();

    const product = {

      name: this.name,

      description: this.description,

      price: Number(this.price),

      category: this.category,

      category_id: this.categoryId,

      image: this.image

    };

    // UPDATE
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

            this.router.navigate([
              '/admin/dashboard'
            ]);

          },

          error: (error) => {

            console.error(error);

          }

        });

    }

    // CREATE
    else {

      this.productService
        .createProduct(product)
        .subscribe({

          next: () => {

            this.router.navigate([
              '/admin/dashboard'
            ]);

          },

          error: (error) => {

            console.error(error);

          }

        });

    }

  }

}