import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtipodocumentoComponent } from './addtipodocumento.component';

describe('AddtipodocumentoComponent', () => {
  let component: AddtipodocumentoComponent;
  let fixture: ComponentFixture<AddtipodocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddtipodocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtipodocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
