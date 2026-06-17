import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.orderService.getUserOrders(user.id).subscribe({
      next: (response) => {
        this.orders = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'pending':
        return '🟡 Pendente';

      case 'preparing':
        return '🟠 Preparando';

      case 'ready':
        return '🟢 Pronto';

      case 'delivered':
        return '🔵 Entregue';

      default:
        return status;
    }
  }
}
