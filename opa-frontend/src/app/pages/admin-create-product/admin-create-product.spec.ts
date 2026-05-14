import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateProduct } from './admin-create-product';

describe('AdminCreateProduct', () => {
  let component: AdminCreateProduct;
  let fixture: ComponentFixture<AdminCreateProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreateProduct],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCreateProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
