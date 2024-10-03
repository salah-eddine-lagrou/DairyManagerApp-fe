import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsDemandePage } from './details-demande.page';

describe('DetailsDemandePage', () => {
  let component: DetailsDemandePage;
  let fixture: ComponentFixture<DetailsDemandePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDemandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
