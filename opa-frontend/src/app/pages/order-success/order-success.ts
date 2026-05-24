import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

@Component({
  selector:'app-order-success',
  standalone:true,
  imports:[
    CommonModule,
    RouterLink
  ],
  templateUrl:'./order-success.html',
  styleUrls:[
    './order-success.css'
  ]
})

export class OrderSuccessComponent {

  randomOrder =
    Math.floor(
      1000 + Math.random() * 9000
    );

}