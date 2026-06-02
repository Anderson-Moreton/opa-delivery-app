import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CartComponent } from './pages/cart/cart';
import { PaymentComponent } from './pages/payment/payment';
import { OrderSuccessComponent } from './pages/order-success/order-success';
import { OrdersComponent } from './pages/orders/orders';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';
import { AccountComponent } from './pages/account/account';

import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { AdminCreateProductComponent } from './pages/admin-create-product/admin-create-product';
import { AdminCategoriesComponent } from './pages/admin-categories/admin-categories';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'orders/:id',
    loadComponent: () => 
      import('./pages/order-details/order-details')
    .then(m => m.OrderDetailsComponent),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/create-product',
    component: AdminCreateProductComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/edit-product/:id',
    component: AdminCreateProductComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/categories',
    component: AdminCategoriesComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [adminGuard],
  }
];
