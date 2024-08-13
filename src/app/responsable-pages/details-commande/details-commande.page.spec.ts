import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsCommandePage } from './details-commande.page';

describe('DetailsCommandePage', () => {
  let component: DetailsCommandePage;
  let fixture: ComponentFixture<DetailsCommandePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCommandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
