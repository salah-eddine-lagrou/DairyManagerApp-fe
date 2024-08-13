import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReglementPage } from './reglement.page';

describe('ReglementPage', () => {
  let component: ReglementPage;
  let fixture: ComponentFixture<ReglementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
