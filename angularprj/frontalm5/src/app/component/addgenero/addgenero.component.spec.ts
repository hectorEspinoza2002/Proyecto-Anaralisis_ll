import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgeneroComponent } from './addgenero.component';

describe('AddgeneroComponent', () => {
  let component: AddgeneroComponent;
  let fixture: ComponentFixture<AddgeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddgeneroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddgeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
