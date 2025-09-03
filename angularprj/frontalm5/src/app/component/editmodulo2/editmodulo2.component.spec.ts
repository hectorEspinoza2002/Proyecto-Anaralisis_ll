import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editmodulo2Component } from './editmodulo2.component';

describe('Editmodulo2Component', () => {
  let component: Editmodulo2Component;
  let fixture: ComponentFixture<Editmodulo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Editmodulo2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Editmodulo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
