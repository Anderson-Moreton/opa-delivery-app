import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './admin-orders.html',
  styleUrls: ['./admin-orders.css'],
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateStatus(orderId: number, event: Event): void {
    const status = (event.target as HTMLSelectElement).value;

    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        const order = this.orders.find((o) => o.id === orderId);

        if (order) {
          order.status = status;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
