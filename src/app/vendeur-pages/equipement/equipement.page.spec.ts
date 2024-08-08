import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipementPage } from './equipement.page';

describe('EquipementPage', () => {
  let component: EquipementPage;
  let fixture: ComponentFixture<EquipementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
