import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockVehiculePage } from './stock-vehicule.page';

describe('StockVehiculePage', () => {
  let component: StockVehiculePage;
  let fixture: ComponentFixture<StockVehiculePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StockVehiculePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
