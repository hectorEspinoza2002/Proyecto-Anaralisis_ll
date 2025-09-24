import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddestadocivilComponent } from './addestadocivil.component';

describe('AddestadocivilComponent', () => {
  let component: AddestadocivilComponent;
  let fixture: ComponentFixture<AddestadocivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddestadocivilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddestadocivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
