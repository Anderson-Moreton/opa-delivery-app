import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { AuthService } from '../../services/auth.service';

import { ToastService } from '../../services/toast.service';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class AccountComponent {
  user: any = null;

  editing = false;

  formData: any = {};

  constructor(private authService: AuthService, private toastService: ToastService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);

      this.formData = {
        name: this.user.name,
        phone: this.user.phone,
        cep: this.user.cep,
        address: this.user.address,
      };
    }
  }

  saveUser(): void {
    this.authService.updateUser(this.user.id, this.formData).subscribe({
      next: () => {
        this.user = {
          ...this.user,
          ...this.formData,
        };

        localStorage.setItem('user', JSON.stringify(this.user));

        this.editing = false;

        this.cdr.detectChanges();

        this.toastService.show(
          'Dados atualizados com sucesso!',
          'success'
        );
      },
      error: (error) => {
        console.error(error);

        this.toastService.show(
          'Erro ao atualizar os dados.',
          'error'
        );
      },
    });
  }

  cancelEdit(): void {
    this.formData = {
      name: this.user.name,
      phone: this.user.phone,
      cep: this.user.cep,
      address: this.user.address,
    };

    this.editing = false;
  }
}
