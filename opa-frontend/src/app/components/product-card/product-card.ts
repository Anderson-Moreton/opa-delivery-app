import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(private cartService: CartService, private toastService: ToastService) {}

  addToCart() {
    this.cartService.addItem(this.product);
    this.toastService.show(`${this.product.name} adicionado ao carrinho!`, 'success');
  }

}
