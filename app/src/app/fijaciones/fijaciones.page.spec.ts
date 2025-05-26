import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FijacionesPage } from './fijaciones.page';

describe('FijacionesPage', () => {
  let component: FijacionesPage;
  let fixture: ComponentFixture<FijacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FijacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
