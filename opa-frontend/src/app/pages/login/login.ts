import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { AuthService } from '../../services/auth.service';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email = '';

  password = '';

  constructor(
    private authService: AuthService,
    private toast: ToastService,
    private router: Router,
  ) {}

  login(): void {
    const credentials = {
      email: this.email,

      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));

        this.toast.show('Login successful', 'success');

        this.router.navigate(['/']);
      },

      error: (error) => {
        this.toast.show(error.error.message || 'Login error', 'error');
      },
    });
  }
}
