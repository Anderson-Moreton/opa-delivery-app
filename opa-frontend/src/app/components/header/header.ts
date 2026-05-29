import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [RouterLink, CommonModule],
})
export class HeaderComponent {
  user: any = null;
  dropdownOpen = false;

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = this.authService.getCurrentUser();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  isAdmin(): boolean {
    return this.user?.role === 'admin';
  }

  logout() {
    this.authService.logout();

    this.user = null;

    this.router.navigate(['/']);
  }
}
