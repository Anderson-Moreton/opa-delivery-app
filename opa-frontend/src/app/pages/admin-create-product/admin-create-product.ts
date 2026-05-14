import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-admin-create-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './admin-create-product.html',
  styleUrls: ['./admin-create-product.css']
})
export class AdminCreateProductComponent implements OnInit {

  name = '';
  description = '';
  price = '';
  category = 'Burguer';
  image = '';
  editMode = false;
  productId: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {}

  ngOnInit(): void {

   const id = this.route.snapshot.paramMap.get('id');

   if (id) {

     this.editMode = true;

     this.productId = Number(id);

     const products =
       JSON.parse(localStorage.getItem('products') || '[]');

     const product =
       products.find(
         (p: any) => p.id === this.productId
       );

     if (product) {

       this.name = product.name;
       this.description = product.description;
       this.price = product.price;
       this.category = product.category;
       this.image = product.image;

     } 

   }

 }

  saveProduct() {

   if (
     !this.name ||
     !this.description ||
     !this.price ||
     !this.category
   ) {

     this.toast.show('Preencha todos os campos', 'error');
     return;
   }

   const products =
     JSON.parse(localStorage.getItem('products') || '[]');

   if (this.editMode) {

     const index =
       products.findIndex(
         (p: any) => p.id === this.productId
       );

     products[index] = {
       ...products[index],
       name: this.name,
       description: this.description,
       price: this.price,
       category: this.category,
       image: this.image
     };

     this.toast.show('Produto atualizado com sucesso', 'success');

   } else {

     const newProduct = {
       id: Date.now(),
       name: this.name,
       description: this.description,
       price: this.price,
       category: this.category,
       image: this.image
     };

     products.push(newProduct);

     this.toast.show('Produto cadastrado com sucesso', 'success');

   }

   localStorage.setItem(
     'products',
     JSON.stringify(products)
   );

   this.router.navigate(['/admin/dashboard']);

 }

}