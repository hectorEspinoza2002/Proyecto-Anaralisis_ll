import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListconsultasaldosComponent } from './listconsultasaldos.component';

describe('ListconsultasaldosComponent', () => {
  let component: ListconsultasaldosComponent;
  let fixture: ComponentFixture<ListconsultasaldosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListconsultasaldosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListconsultasaldosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
