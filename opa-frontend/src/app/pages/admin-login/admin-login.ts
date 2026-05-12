import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import is from '@angular/common/locales/extra/is';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css']
})
export class AdminLoginComponent {

  email = '';
  password = '';

  constructor(
    private router: Router
  ) {}

  login() {

    if (!this.email || !this.password) {

      alert('Preencha todos os campos');
      return;
    }

    if (
      this.email === 'admin@opa.com' &&
      this.password === '123456'
    ) {

      localStorage.setItem('admin', 'true');

      this.router.navigate(['/admin/dashboard']);

      return;
    }

    alert('Email ou senha inválidos');
  }

}