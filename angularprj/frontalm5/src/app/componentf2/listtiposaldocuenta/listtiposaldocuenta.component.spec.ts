import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtiposaldocuentaComponent } from './listtiposaldocuenta.component';

describe('ListtiposaldocuentaComponent', () => {
  let component: ListtiposaldocuentaComponent;
  let fixture: ComponentFixture<ListtiposaldocuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListtiposaldocuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListtiposaldocuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
