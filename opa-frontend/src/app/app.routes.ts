import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CartComponent } from './pages/cart/cart';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  { 
    path: 'cart', 
    component: CartComponent }
];