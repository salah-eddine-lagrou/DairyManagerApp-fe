import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GratuitesPage } from './gratuites.page';

describe('GratuitesPage', () => {
  let component: GratuitesPage;
  let fixture: ComponentFixture<GratuitesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GratuitesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
