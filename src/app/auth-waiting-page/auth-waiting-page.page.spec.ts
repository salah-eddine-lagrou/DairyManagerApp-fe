import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthWaitingPagePage } from './auth-waiting-page.page';

describe('AuthWaitingPagePage', () => {
  let component: AuthWaitingPagePage;
  let fixture: ComponentFixture<AuthWaitingPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthWaitingPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
