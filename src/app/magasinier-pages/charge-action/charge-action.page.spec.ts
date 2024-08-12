import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChargeActionPage } from './charge-action.page';

describe('ChargeActionPage', () => {
  let component: ChargeActionPage;
  let fixture: ComponentFixture<ChargeActionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeActionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
