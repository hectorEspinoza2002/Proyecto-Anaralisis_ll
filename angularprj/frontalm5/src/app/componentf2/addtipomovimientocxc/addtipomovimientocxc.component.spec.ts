import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtipomovimientocxcComponent } from './addtipomovimientocxc.component';

describe('AddtipomovimientocxcComponent', () => {
  let component: AddtipomovimientocxcComponent;
  let fixture: ComponentFixture<AddtipomovimientocxcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddtipomovimientocxcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtipomovimientocxcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
