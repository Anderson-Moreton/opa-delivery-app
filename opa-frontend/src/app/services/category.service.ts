import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private apiUrl =
    'http://localhost:3333/categories';

  constructor(
    private http: HttpClient
  ) {}

  getCategories(): Observable<any> {

    return this.http.get(this.apiUrl);

  }

  createCategory(category: any): Observable<any> {

    return this.http.post(
      this.apiUrl,
      category
    );

  }

  updateCategory(
    id: number,
    category: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      category
    );

  }

  deleteCategory(id: number): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

  getMenuCategories(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/menu`
    );

  }

}