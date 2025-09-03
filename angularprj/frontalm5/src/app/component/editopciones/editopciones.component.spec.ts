import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditopcionesComponent } from './editopciones.component';

describe('EditopcionesComponent', () => {
  let component: EditopcionesComponent;
  let fixture: ComponentFixture<EditopcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditopcionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
