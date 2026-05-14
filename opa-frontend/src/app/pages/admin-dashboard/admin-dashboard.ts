import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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

  burguers: any[] = [];
  hotdogs: any[] = [];
  bebidas: any[] = [];

  ngOnInit(): void {

    this.products =
      JSON.parse(localStorage.getItem('products') || '[]');

    this.burguers =
      this.products.filter(
        product => product.category === 'Burguer'
      );

    this.hotdogs =
      this.products.filter(
        product => product.category === 'HotDog'
      );

    this.bebidas =
      this.products.filter(
        product => product.category === 'Bebidas'
      );

  }

  deleteProduct(id: number) {

    const confirmDelete =
      confirm('Deseja excluir este produto?');

    if (!confirmDelete) {
      return;
    }

    this.products =
      this.products.filter(
        product => product.id !== id
      );

    localStorage.setItem(
      'products',
      JSON.stringify(this.products)
    );

    this.burguers =
      this.products.filter(
        product => product.category === 'Burguer'
      );

    this.hotdogs =
      this.products.filter(
        product => product.category === 'HotDog'
      );

    this.bebidas =
      this.products.filter(
        product => product.category === 'Bebidas'
      );

  }

}