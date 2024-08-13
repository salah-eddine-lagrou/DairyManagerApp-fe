import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BonLivraisonPage } from './bon-livraison.page';

describe('BonLivraisonPage', () => {
  let component: BonLivraisonPage;
  let fixture: ComponentFixture<BonLivraisonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BonLivraisonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
