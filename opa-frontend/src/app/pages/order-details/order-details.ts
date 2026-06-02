import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { RouterLink } from '@angular/router';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-details',  
  standalone: true,
  imports: [CommonModule, HeaderComponent , FooterComponent, RouterLink],
  templateUrl: './order-details.html',
  styleUrls: ['./order-details.css'],
})
export class OrderDetailsComponent implements OnInit {
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
