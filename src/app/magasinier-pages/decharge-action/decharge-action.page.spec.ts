import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DechargeActionPage } from './decharge-action.page';

describe('DechargeActionPage', () => {
  let component: DechargeActionPage;
  let fixture: ComponentFixture<DechargeActionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DechargeActionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
