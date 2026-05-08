import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {}
