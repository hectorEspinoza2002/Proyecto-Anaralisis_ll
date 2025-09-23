import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsaldocuentaComponent } from './listsaldocuenta.component';

describe('ListsaldocuentaComponent', () => {
  let component: ListsaldocuentaComponent;
  let fixture: ComponentFixture<ListsaldocuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsaldocuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsaldocuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
