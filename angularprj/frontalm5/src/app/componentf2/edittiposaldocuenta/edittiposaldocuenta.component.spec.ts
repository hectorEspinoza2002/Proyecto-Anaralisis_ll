import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittiposaldocuentaComponent } from './edittiposaldocuenta.component';

describe('EdittiposaldocuentaComponent', () => {
  let component: EdittiposaldocuentaComponent;
  let fixture: ComponentFixture<EdittiposaldocuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdittiposaldocuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittiposaldocuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
