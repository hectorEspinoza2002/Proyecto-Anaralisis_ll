import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditestadocivilComponent } from './editestadocivil.component';

describe('EditestadocivilComponent', () => {
  let component: EditestadocivilComponent;
  let fixture: ComponentFixture<EditestadocivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditestadocivilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditestadocivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
