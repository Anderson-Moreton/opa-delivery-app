import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CartComponent } from './pages/cart/cart';
import { LoginComponent } from './pages/login/login'; 

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  { 
    path: 'cart', 
    component: CartComponent 
  },
  {
    path: 'login',
    component: LoginComponent
  }

];