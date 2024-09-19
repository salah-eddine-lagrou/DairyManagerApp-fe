import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewClientPage } from './new-client.page';

describe('NewClientPage', () => {
  let component: NewClientPage;
  let fixture: ComponentFixture<NewClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
