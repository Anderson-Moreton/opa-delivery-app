import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './admin-categories.html',
  styleUrls: ['./admin-categories.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories: any[] = [];

  categoryName = '';

  editMode = false;

  editId: number | null = null;

  ngOnInit(): void {

    const savedCategories =
      localStorage.getItem('categories');

    if (savedCategories) {

      this.categories =
        JSON.parse(savedCategories);

    } else {

      this.categories = [
        {
          id: 1,
          name: 'Burger'
        },
        {
          id: 2,
          name: 'HotDog'
        },
        {
          id: 3,
          name: 'Bebida'
        }
      ];

      localStorage.setItem(
        'categories',
        JSON.stringify(this.categories)
      );

    }

  }

  saveCategory() {

    if (!this.categoryName.trim()) {
      return;
    }

    if (this.editMode) {

      const category =
        this.categories.find(
          c => c.id === this.editId
        );

      if (category) {
        category.name = this.categoryName;
      }

    } else {

      this.categories.push({
        id: Date.now(),
        name: this.categoryName
      });

    }

    localStorage.setItem(
      'categories',
      JSON.stringify(this.categories)
    );

    this.cancelEdit();

  }

  editCategory(category: any) {

    this.editMode = true;

    this.editId = category.id;

    this.categoryName = category.name;

  }

  deleteCategory(id: number) {

    const confirmDelete =
      confirm('Deseja excluir esta categoria?');

    if (!confirmDelete) {
      return;
    }

    this.categories =
      this.categories.filter(
        category => category.id !== id
      );

    localStorage.setItem(
      'categories',
      JSON.stringify(this.categories)
    );

  }

  cancelEdit() {

    this.editMode = false;

    this.editId = null;

    this.categoryName = '';

  }

}
