import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { FavoriteService } from '../../services/favorite.service';
import { CartService } from '../../services/cart.service';

import { AuthService } from '../../services/auth.service';

import { ToastService } from '../../services/toast.service';

import { ToastComponent } from '../../components/toast/toast';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent, ToastComponent],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private cdr: ChangeDetectorRef,
    private cartService: CartService,
    private authService: AuthService,
    public toast: ToastService,
  ) {}

  ngOnInit(): void {
    console.log('FavoritesComponent carregado');
    this.loadFavorites();
  }

  loadFavorites(): void {
    const user = this.authService.getCurrentUser();

    console.log('Usuário:', user);

    if (!user) return;

    this.favoriteService.getFavorites(user.id).subscribe({
      next: (favorites) => {
        console.log('Favoritos recebidos:', favorites);

        this.favorites = favorites;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  addToCart(product: any): void {
    this.cartService.addItem(product);

    this.cdr.detectChanges();

    this.toast.show(`${product.name} adicionado ao carrinho!`, 'success');
  }

  removeFavorite(product: any): void {
    const user = this.authService.getCurrentUser();

    if (!user) return;

    this.favoriteService.removeFavorite(user.id, product.id).subscribe({
      next: () => {
        this.favorites = this.favorites.filter((p) => p.id !== product.id);

        this.favoriteService.removeFavoriteLocal(product.id);

        this.cdr.detectChanges();

        this.toast.show('Produto removido dos favoritos.', 'success');
      },
    });
  }
}
