import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsActionPage } from './details-action.page';

describe('DetailsActionPage', () => {
  let component: DetailsActionPage;
  let fixture: ComponentFixture<DetailsActionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsActionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
