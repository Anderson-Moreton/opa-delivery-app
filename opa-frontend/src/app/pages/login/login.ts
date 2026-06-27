import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Router, RouterModule } from '@angular/router';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { AuthService } from '../../services/auth.service';

import { ToastService } from '../../services/toast.service';

import { AfterViewInit } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent implements AfterViewInit {
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      google.accounts.id.initialize({
        client_id: '845085272763-65258rddb0udahf44e5vkq584aq60ja6.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
      });

      google.accounts.id.renderButton(document.getElementById('google-button')!, {
        theme: 'outline',
        size: 'large',
        width: 300,
      });
    });
  }

  handleCredentialResponse(response: any): void {
    this.authService.googleLogin(response.credential).subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));

        this.toast.show('Login successful', 'success');

        this.router.navigate(['/']);
      },

      error: () => {
        this.toast.show('Google login failed', 'error');
      },
    });
  }
}
