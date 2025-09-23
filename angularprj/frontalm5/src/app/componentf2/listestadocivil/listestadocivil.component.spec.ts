import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListestadocivilComponent } from './listestadocivil.component';

describe('ListestadocivilComponent', () => {
  let component: ListestadocivilComponent;
  let fixture: ComponentFixture<ListestadocivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListestadocivilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListestadocivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
