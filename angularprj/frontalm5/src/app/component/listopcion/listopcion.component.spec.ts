import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListopcionComponent } from './listopcion.component';

describe('ListopcionComponent', () => {
  let component: ListopcionComponent;
  let fixture: ComponentFixture<ListopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListopcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
