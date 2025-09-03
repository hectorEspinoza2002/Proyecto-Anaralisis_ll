import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgeneroComponent } from './listgenero.component';

describe('ListgeneroComponent', () => {
  let component: ListgeneroComponent;
  let fixture: ComponentFixture<ListgeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListgeneroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListgeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
