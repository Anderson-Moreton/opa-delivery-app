import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { ToastService } from '../../services/toast.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  name = '';
  email = '';

  ddd = '11';
  phone = '';

  password = '';
  confirmPassword = '';

  cep = '';
  street = '';
  number = '';
  neighborhood = '';
  city = '';
  complement = '';

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private authService: AuthService,
    private router: Router,
  ) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.toast.show('Passwords do not match', 'error');

      return;
    }

    const user = {
      name: this.name,

      email: this.email,

      password: this.password,

      phone: `(${this.ddd}) ${this.phone}`,

      address: `${this.street},
      ${this.number},
      ${this.neighborhood},
      ${this.city},
      ${this.complement}`,
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.toast.show('Registration successful', 'success');

        this.router.navigate(['/login']);
      },

      error: (error) => {
        this.toast.show(error.error.message || 'Registration error', 'error');
      },
    });
  }

  searchCep() {
    const cleanCep = this.cep.replace(/\D/g, '');

    if (cleanCep.length < 8) {
      return;
    }

    this.http.get<any>(`https://viacep.com.br/ws/${cleanCep}/json/`).subscribe((data) => {
      this.street = data.logradouro;

      this.neighborhood = data.bairro;

      this.city = data.localidade;
    });
  }
}
