import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListestadocuentaComponent } from './listestadocuenta.component';

describe('ListestadocuentaComponent', () => {
  let component: ListestadocuentaComponent;
  let fixture: ComponentFixture<ListestadocuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListestadocuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListestadocuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
