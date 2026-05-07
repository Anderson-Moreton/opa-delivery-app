import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
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
    private toast: ToastService
  ) {}

  register() {

    if (this.password !== this.confirmPassword) {

      this.toast.show(
        'As senhas não coincidem',
        'error'
      );

      return;
    }

    this.toast.show(
      'Cadastro realizado com sucesso',
      'success'
    );

    console.log({
      name: this.name,
      email: this.email,
      phone: `(${this.ddd}) ${this.phone}`,
      cep: this.cep,
      street: this.street,
      number: this.number,
      neighborhood: this.neighborhood,
      city: this.city,
      complement: this.complement
    });

  }

  searchCep() {

    const cleanCep = this.cep.replace(/\D/g, '');

    if (cleanCep.length < 8) {
      return;
    }

    this.http
      .get<any>(`https://viacep.com.br/ws/${cleanCep}/json/`)
      .subscribe((data) => {

        this.street = data.logradouro;
        this.neighborhood = data.bairro;
        this.city = data.localidade;

      });

  }

}