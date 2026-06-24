import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:3333/payments';

  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-payment-intent`, {
      amount,
    });
  }

  createPixPaymentIntent(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-pix-payment-intent`, {
      amount,
    });
  }

  getPaymentStatus(paymentIntentId: string) {
    return this.http.get<{ status: string }>(`${this.apiUrl}/payment-status/${paymentIntentId}`);
  }
}
