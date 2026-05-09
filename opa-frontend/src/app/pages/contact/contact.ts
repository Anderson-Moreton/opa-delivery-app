import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';

import { ToastService } from '../../services/toast.service';
import { ToastComponent } from '../../components/toast/toast';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    ToastComponent
  ],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {

  name = '';
  email = '';
  phone = '';
  city = '';
  state = '';
  message = '';

  constructor(
    public toast: ToastService
  ) {}

  sendMessage() {

    if (
      !this.name ||
      !this.email ||
      !this.phone ||
      !this.city ||
      !this.state ||
      !this.message
    ) {

      this.toast.show(
        'Preencha todos os campos',
        'error'
      );

      return;
    }

    this.toast.show(
      'Mensagem enviada com sucesso',
      'success'
    );

    this.clearForm();
  }

  clearForm() {

    this.name = '';
    this.email = '';
    this.phone = '';
    this.city = '';
    this.state = '';
    this.message = '';
  }

}