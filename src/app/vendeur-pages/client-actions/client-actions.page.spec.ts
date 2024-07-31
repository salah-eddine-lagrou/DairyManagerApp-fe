import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientActionsPage } from './client-actions.page';

describe('ClientActionsPage', () => {
  let component: ClientActionsPage;
  let fixture: ComponentFixture<ClientActionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientActionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
