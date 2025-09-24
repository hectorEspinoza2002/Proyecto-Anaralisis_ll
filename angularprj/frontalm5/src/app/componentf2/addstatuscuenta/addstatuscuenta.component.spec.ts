import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstatuscuentaComponent } from './addstatuscuenta.component';

describe('AddstatuscuentaComponent', () => {
  let component: AddstatuscuentaComponent;
  let fixture: ComponentFixture<AddstatuscuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddstatuscuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddstatuscuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
