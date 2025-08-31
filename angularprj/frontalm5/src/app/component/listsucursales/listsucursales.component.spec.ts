import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsucursalesComponent } from './listsucursales.component';

describe('ListsucursalesComponent', () => {
  let component: ListsucursalesComponent;
  let fixture: ComponentFixture<ListsucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsucursalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
