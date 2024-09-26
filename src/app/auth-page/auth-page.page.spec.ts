import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthPagePage } from './auth-page.page';

describe('AuthPagePage', () => {
  let component: AuthPagePage;
  let fixture: ComponentFixture<AuthPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
