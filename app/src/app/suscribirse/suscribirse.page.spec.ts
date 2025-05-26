import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuscribirsePage } from './suscribirse.page';

describe('SuscribirsePage', () => {
  let component: SuscribirsePage;
  let fixture: ComponentFixture<SuscribirsePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscribirsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
