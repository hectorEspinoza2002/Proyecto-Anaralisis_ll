import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListempresaComponent } from './listempresa.component';

describe('ListempresaComponent', () => {
  let component: ListempresaComponent;
  let fixture: ComponentFixture<ListempresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListempresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListempresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
