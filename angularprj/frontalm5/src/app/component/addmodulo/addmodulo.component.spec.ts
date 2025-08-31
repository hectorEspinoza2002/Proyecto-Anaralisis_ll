import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmoduloComponent } from './addmodulo.component';

describe('AddmoduloComponent', () => {
  let component: AddmoduloComponent;
  let fixture: ComponentFixture<AddmoduloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddmoduloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmoduloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
