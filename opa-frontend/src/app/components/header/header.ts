import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  imports: [RouterLink, CommonModule, FormsModule],
})
export class HeaderComponent {
  user: any = null;

  dropdownOpen = false;

  searchText = '';

  selectedCategory = 'todos';

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.user = this.authService.getCurrentUser();

    this.route.queryParams.subscribe((params) => {
      this.searchText = params['search'] || '';
      this.selectedCategory = params['category'] || 'todos';
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  isAdmin(): boolean {
    return this.user?.role === 'admin';
  }

  logout(): void {
    this.authService.logout();

    this.user = null;

    this.router.navigate(['/']);
  }

  searchProducts(): void {
    const queryParams: any = {};

    if (this.searchText.trim()) {
      queryParams.search = this.searchText.trim();
    }

    if (this.selectedCategory && this.selectedCategory !== 'todos') {
      queryParams.category = this.selectedCategory;
    }

    this.router.navigate(['/'], {
      queryParams,
    });
  }
}
