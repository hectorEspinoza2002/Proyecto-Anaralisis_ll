import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddopcionComponent } from './addopcion.component';

describe('AddopcionComponent', () => {
  let component: AddopcionComponent;
  let fixture: ComponentFixture<AddopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddopcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
