import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReglementsListPage } from './reglements-list.page';

describe('ReglementsListPage', () => {
  let component: ReglementsListPage;
  let fixture: ComponentFixture<ReglementsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
