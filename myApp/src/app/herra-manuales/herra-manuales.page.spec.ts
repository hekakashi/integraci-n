import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HerraManualesPage } from './herra-manuales.page';

describe('HerraManualesPage', () => {
  let component: HerraManualesPage;
  let fixture: ComponentFixture<HerraManualesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HerraManualesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
