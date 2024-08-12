import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjustementPage } from './ajustement.page';

describe('AjustementPage', () => {
  let component: AjustementPage;
  let fixture: ComponentFixture<AjustementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
