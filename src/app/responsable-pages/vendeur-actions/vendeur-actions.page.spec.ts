import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VendeurActionsPage } from './vendeur-actions.page';

describe('VendeurActionsPage', () => {
  let component: VendeurActionsPage;
  let fixture: ComponentFixture<VendeurActionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VendeurActionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
