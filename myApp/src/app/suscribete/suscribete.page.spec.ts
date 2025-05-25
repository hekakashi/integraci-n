import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuscribetePage } from './suscribete.page';

describe('SuscribetePage', () => {
  let component: SuscribetePage;
  let fixture: ComponentFixture<SuscribetePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscribetePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
