import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmovimientocuentaComponent } from './listmovimientocuenta.component';

describe('ListmovimientocuentaComponent', () => {
  let component: ListmovimientocuentaComponent;
  let fixture: ComponentFixture<ListmovimientocuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListmovimientocuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListmovimientocuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
