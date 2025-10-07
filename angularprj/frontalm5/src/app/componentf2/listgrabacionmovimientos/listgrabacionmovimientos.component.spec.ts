import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgrabacionmovimientosComponent } from './listgrabacionmovimientos.component';

describe('ListgrabacionmovimientosComponent', () => {
  let component: ListgrabacionmovimientosComponent;
  let fixture: ComponentFixture<ListgrabacionmovimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListgrabacionmovimientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListgrabacionmovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
