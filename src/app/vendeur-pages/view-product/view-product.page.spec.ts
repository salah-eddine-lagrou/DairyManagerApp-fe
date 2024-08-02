import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewProductPage } from './view-product.page';

describe('ViewProductPage', () => {
  let component: ViewProductPage;
  let fixture: ComponentFixture<ViewProductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
