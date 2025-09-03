import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listmodulo2Component } from './listmodulo2.component';

describe('Listmodulo2Component', () => {
  let component: Listmodulo2Component;
  let fixture: ComponentFixture<Listmodulo2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listmodulo2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listmodulo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
