import { Component, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../../components/header/header';

import { FooterComponent } from '../../components/footer/footer';

import { ContactService } from '../../services/contact.service';

import { ToastService } from '../../services/toast.service';

import { ToastComponent } from '../../components/toast/toast';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent, ToastComponent],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
})
export class ContactComponent {
  name = '';
  email = '';
  phone = '';
  city = '';
  state = '';
  message = '';

  constructor(
    private contactService: ContactService,
    public toast: ToastService,
    private cdr: ChangeDetectorRef,
  ) {}

  sendMessage() {
    if (!this.name || !this.email || !this.phone || !this.city || !this.state || !this.message) {
      this.toast.show('Preencha todos os campos', 'error');
      return;
    }

    this.contactService
      .sendMessage({
        name: this.name,
        email: this.email,
        phone: this.phone,
        city: this.city,
        state: this.state,
        message: this.message,
      })
      .subscribe({
        next: () => {
          this.clearForm();

          this.cdr.detectChanges();
          
          this.toast.show('Mensagem enviada com sucesso!', 'success');
          
        },

        error: () => {
          this.toast.show('Erro ao enviar mensagem.', 'error');
        },
      });
  }

  clearForm(): void {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.city = '';
    this.state = '';
    this.message = '';
  }
}
