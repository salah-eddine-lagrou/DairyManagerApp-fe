import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournesPage } from './tournes.page';

describe('TournesPage', () => {
  let component: TournesPage;
  let fixture: ComponentFixture<TournesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TournesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
