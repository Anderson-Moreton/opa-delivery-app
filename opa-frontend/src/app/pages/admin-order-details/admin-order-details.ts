import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-admin-order-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './admin-order-details.html',
  styleUrls: ['./admin-order-details.css'],
})
export class AdminOrderDetailsComponent implements OnInit {
  order: any = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));

    this.orderService.getOrderById(orderId).subscribe({
      next: (response) => {
        this.order = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
