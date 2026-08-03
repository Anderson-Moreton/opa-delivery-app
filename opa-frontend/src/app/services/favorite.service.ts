import { Injectable, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private apiUrl = `${environment.apiUrl}/favorites`;

  favorites = signal<number[]>([]);

  constructor(private http: HttpClient) {}

  isFavorite(productId: number): boolean {
    return this.favorites().includes(productId);
  }

  setFavorites(products: any[]): void {
    this.favorites.set(products.map((product) => product.id));
  }

  addFavoriteLocal(productId: number): void {
    this.favorites.update((ids) => [...ids, productId]);
  }

  removeFavoriteLocal(productId: number): void {
    this.favorites.update((ids) => ids.filter((id) => id !== productId));
  }

  addFavorite(userId: number, productId: number): Observable<any> {
    return this.http.post(this.apiUrl, {
      userId,
      productId,
    });
  }

  getFavorites(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  removeFavorite(userId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/${productId}`);
  }
}
