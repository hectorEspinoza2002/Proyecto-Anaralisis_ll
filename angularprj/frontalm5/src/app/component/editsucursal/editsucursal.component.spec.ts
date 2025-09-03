import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsucursalComponent } from './editsucursal.component';

describe('EditsucursalComponent', () => {
  let component: EditsucursalComponent;
  let fixture: ComponentFixture<EditsucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditsucursalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditsucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
