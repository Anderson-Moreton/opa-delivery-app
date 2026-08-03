import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  createOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  getUserOrders(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  getOrderById(orderId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${orderId}`);
  }

  getAllOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${orderId}/status`, { status });
  }
}
