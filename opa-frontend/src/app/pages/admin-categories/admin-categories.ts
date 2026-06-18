import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';

import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-categories.html',
  styleUrls: ['./admin-categories.css'],
})
export class AdminCategoriesComponent implements OnInit {
  categories: any[] = [];

  categoryName = '';

  editMode = false;

  editId: number | null = null;

  constructor(
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories: any) => {
        this.categories = [...categories];

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  saveCategory(): void {
    if (!this.categoryName.trim()) {
      return;
    }

    const category = {
      name: this.categoryName,
    };

    // UPDATE
    if (this.editMode && this.editId) {
      this.categoryService.updateCategory(this.editId, category).subscribe({
        next: () => {
          this.loadCategories();

          this.cancelEdit();

          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(error);
        },
      });
    }

    // CREATE
    else {
      this.categoryService.createCategory(category).subscribe({
        next: () => {
          this.loadCategories();

          this.cancelEdit();

          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  editCategory(category: any): void {
    this.editMode = true;

    this.editId = category.id;

    this.categoryName = category.name;

    this.cdr.detectChanges();
  }

  deleteCategory(id: number): void {
    const confirmDelete = confirm('Do you want to delete this category?');

    if (!confirmDelete) {
      return;
    }

    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.loadCategories();

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  cancelEdit(): void {
    this.editMode = false;

    this.editId = null;

    this.categoryName = '';

    this.cdr.detectChanges();
  }

  moveUp(category: any): void {
    const index = this.categories.findIndex((c) => c.id === category.id);

    if (index <= 0) {
      return;
    }

    [this.categories[index - 1], this.categories[index]] = [
      this.categories[index],
      this.categories[index - 1],
    ];

    this.saveOrder();
  }

  moveDown(category: any): void {
    const index = this.categories.findIndex((c) => c.id === category.id);

    if (index >= this.categories.length - 1) {
      return;
    }

    [this.categories[index], this.categories[index + 1]] = [
      this.categories[index + 1],
      this.categories[index],
    ];

    this.saveOrder();
  }
  saveOrder(): void {
    const categories = this.categories.map((category, index) => ({
      id: category.id,
      position: index + 1,
    }));

    this.categoryService.reorderCategories(categories).subscribe({
      next: () => {
        console.log('Order saved');
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
