import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddroleopcionComponent } from './addroleopcion.component';

describe('AddroleopcionComponent', () => {
  let component: AddroleopcionComponent;
  let fixture: ComponentFixture<AddroleopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddroleopcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddroleopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
