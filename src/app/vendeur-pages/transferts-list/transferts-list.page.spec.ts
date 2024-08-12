import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransfertsListPage } from './transferts-list.page';

describe('TransfertsListPage', () => {
  let component: TransfertsListPage;
  let fixture: ComponentFixture<TransfertsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
