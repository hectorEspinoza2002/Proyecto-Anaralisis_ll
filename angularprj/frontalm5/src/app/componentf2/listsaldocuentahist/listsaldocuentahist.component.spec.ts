import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsaldocuentahistComponent } from './listsaldocuentahist.component';

describe('ListsaldocuentahistComponent', () => {
  let component: ListsaldocuentahistComponent;
  let fixture: ComponentFixture<ListsaldocuentahistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsaldocuentahistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListsaldocuentahistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
