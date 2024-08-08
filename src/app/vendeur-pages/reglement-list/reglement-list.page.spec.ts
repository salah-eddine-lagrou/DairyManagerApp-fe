import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReglementListPage } from './reglement-list.page';

describe('ReglementListPage', () => {
  let component: ReglementListPage;
  let fixture: ComponentFixture<ReglementListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglementListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
