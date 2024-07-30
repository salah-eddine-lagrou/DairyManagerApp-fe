import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VendeursPage } from './vendeurs.page';

describe('VendeursPage', () => {
  let component: VendeursPage;
  let fixture: ComponentFixture<VendeursPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VendeursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
