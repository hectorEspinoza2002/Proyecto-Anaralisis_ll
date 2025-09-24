import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstatuscuentaComponent } from './editstatuscuenta.component';

describe('EditstatuscuentaComponent', () => {
  let component: EditstatuscuentaComponent;
  let fixture: ComponentFixture<EditstatuscuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditstatuscuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditstatuscuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
