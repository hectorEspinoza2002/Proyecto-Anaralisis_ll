import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtiposaldocuentaComponent } from './addtiposaldocuenta.component';

describe('AddtiposaldocuentaComponent', () => {
  let component: AddtiposaldocuentaComponent;
  let fixture: ComponentFixture<AddtiposaldocuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddtiposaldocuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtiposaldocuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
