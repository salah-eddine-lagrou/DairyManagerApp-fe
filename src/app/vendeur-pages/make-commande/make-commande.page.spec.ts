import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakeCommandePage } from './make-commande.page';

describe('MakeCommandePage', () => {
  let component: MakeCommandePage;
  let fixture: ComponentFixture<MakeCommandePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeCommandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
