import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtipomovimientocxcComponent } from './listtipomovimientocxc.component';

describe('ListtipomovimientocxcComponent', () => {
  let component: ListtipomovimientocxcComponent;
  let fixture: ComponentFixture<ListtipomovimientocxcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListtipomovimientocxcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListtipomovimientocxcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
