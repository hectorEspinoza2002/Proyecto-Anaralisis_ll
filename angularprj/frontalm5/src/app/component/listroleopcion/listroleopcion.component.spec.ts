import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListroleopcionComponent } from './listroleopcion.component';

describe('ListroleopcionComponent', () => {
  let component: ListroleopcionComponent;
  let fixture: ComponentFixture<ListroleopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListroleopcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListroleopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
