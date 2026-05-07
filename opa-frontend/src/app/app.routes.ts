import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CartComponent } from './pages/cart/cart';
import { LoginComponent } from './pages/login/login'; 
import { RegisterComponent } from './pages/register/register';

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
  },
  {
    path: 'register',
    component: RegisterComponent
  }

];