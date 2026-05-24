import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CartComponent } from './pages/cart/cart';
import { PaymentComponent } from './pages/payment/payment';
import { OrderSuccessComponent } from './pages/order-success/order-success';
import { LoginComponent } from './pages/login/login'; 
import { RegisterComponent } from './pages/register/register';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';

import { AdminLoginComponent } from './pages/admin-login/admin-login';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { AdminCreateProductComponent } from './pages/admin-create-product/admin-create-product';
import { AdminCategoriesComponent } from './pages/admin-categories/admin-categories';

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
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'admin/create-product',
    component: AdminCreateProductComponent
  }, 
  {
    path: 'admin/edit-product/:id',
    component: AdminCreateProductComponent
  },
  {
    path: 'admin/categories',
    component: AdminCategoriesComponent
  }

];