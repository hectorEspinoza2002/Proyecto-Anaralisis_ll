import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListperiodocierremesComponent } from './listperiodocierremes.component';

describe('ListperiodocierremesComponent', () => {
  let component: ListperiodocierremesComponent;
  let fixture: ComponentFixture<ListperiodocierremesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListperiodocierremesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListperiodocierremesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
