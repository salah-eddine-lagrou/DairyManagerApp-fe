import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipementsPage } from './equipements.page';

describe('EquipementsPage', () => {
  let component: EquipementsPage;
  let fixture: ComponentFixture<EquipementsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
