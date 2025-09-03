import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditgeneroComponent } from './editgenero.component';

describe('EditgeneroComponent', () => {
  let component: EditgeneroComponent;
  let fixture: ComponentFixture<EditgeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditgeneroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditgeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
