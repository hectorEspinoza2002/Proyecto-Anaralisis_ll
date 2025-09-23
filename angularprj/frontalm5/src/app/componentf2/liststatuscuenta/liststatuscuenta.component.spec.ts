import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListstatuscuentaComponent } from './liststatuscuenta.component';

describe('ListstatuscuentaComponent', () => {
  let component: ListstatuscuentaComponent;
  let fixture: ComponentFixture<ListstatuscuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListstatuscuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListstatuscuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
