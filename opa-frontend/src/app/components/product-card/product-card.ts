import { Component, Input } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(
    private cartService: CartService,
    public favoriteService: FavoriteService,
    private authService: AuthService,
    private toastService: ToastService,
  ) {}

  addToCart(): void {
    this.cartService.addItem(this.product);

    this.toastService.show(`${this.product.name} adicionado ao carrinho!`, 'success');
  }

  toggleFavorite(): void {
    const user = this.authService.getCurrentUser();

    if (!user) {
      this.toastService.show('Faça login para adicionar produtos aos favoritos.', 'error');
      return;
    }

    if (this.favoriteService.isFavorite(this.product.id)) {
      this.favoriteService.removeFavorite(user.id, this.product.id).subscribe({
        next: () => {
          this.favoriteService.removeFavoriteLocal(this.product.id);

          this.toastService.show(`${this.product.name} removido dos favoritos.`, 'success');
        },
      });
    } else {
      this.favoriteService.addFavorite(user.id, this.product.id).subscribe({
        next: () => {
          this.favoriteService.addFavoriteLocal(this.product.id);

          this.toastService.show(`${this.product.name} adicionado aos favoritos.`, 'success');
        },
      });
    }
  }
}
