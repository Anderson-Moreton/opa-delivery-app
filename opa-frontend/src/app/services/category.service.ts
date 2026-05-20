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

}