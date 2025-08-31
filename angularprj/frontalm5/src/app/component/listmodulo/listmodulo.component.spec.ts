import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmoduloComponent } from './listmodulo.component';

describe('ListmoduloComponent', () => {
  let component: ListmoduloComponent;
  let fixture: ComponentFixture<ListmoduloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListmoduloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListmoduloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
