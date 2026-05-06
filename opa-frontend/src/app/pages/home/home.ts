import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { ProductCardComponent } from '../../components/product-card/product-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  // CAROUSEL
  currentIndex = 0;

  images = [
    'assets/img/dogPrincipal.jpg',
    'assets/img/burguer01.jpg',
    'assets/img/burguer02.jpg'
  ];

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }

  // PRODUTOS
  produtos = {

    burguer: [
      {
        name: 'X-Burger',
        price: 15,
        description: 'Pão, carne, queijo e molho especial',
        image: 'assets/img/burguer01.jpg'
      },
      {
        name: 'X-Bacon',
        price: 25,
        description: 'Hambúrguer com bacon crocante e queijo',
        image: 'assets/img/burguer05.jpg'
      },
      {
        name: 'X-Salada',
        price: 20,
        description: 'Pão, carne, queijo e molho especial',
        image: 'assets/img/burguer03.jpg'
      },
      {
        name: 'X-Tudo',
        price: 40,
        description: 'Hambúrguer com bacon crocante e queijo',
        image: 'assets/img/burguer08.jpg'
      }
    ],

    dog: [
      {
        name: 'Hot Dog',
        price: 12,
        description: 'Salsicha, batata palha, milho e molho especial',
        image: 'assets/img/dogSimples.jpeg'
      }
    ],

    drink: [
      {
        name: 'Coca-Cola',
        price: 5,
        description: 'Refrigerante lata 350ml',
        image: 'assets/img/cocaLata.jpeg'
      },
      {
        name: 'Guaraná Antarctica',
        price: 5,
        description: 'Refrigerante lata 350ml',
        image: 'assets/img/guaranaLata.jpeg'
      }
    ]
  };

}