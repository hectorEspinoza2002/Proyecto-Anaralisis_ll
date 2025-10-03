import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsaldocuentaComponent } from './addsaldocuenta.component';

describe('AddsaldocuentaComponent', () => {
  let component: AddsaldocuentaComponent;
  let fixture: ComponentFixture<AddsaldocuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddsaldocuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsaldocuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
