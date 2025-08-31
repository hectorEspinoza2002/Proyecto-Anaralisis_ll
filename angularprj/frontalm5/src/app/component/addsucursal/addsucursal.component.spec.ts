import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsucursalComponent } from './addsucursal.component';

describe('AddsucursalComponent', () => {
  let component: AddsucursalComponent;
  let fixture: ComponentFixture<AddsucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddsucursalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
