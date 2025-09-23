import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdocumentopersonaComponent } from './listdocumentopersona.component';

describe('ListdocumentopersonaComponent', () => {
  let component: ListdocumentopersonaComponent;
  let fixture: ComponentFixture<ListdocumentopersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListdocumentopersonaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListdocumentopersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
