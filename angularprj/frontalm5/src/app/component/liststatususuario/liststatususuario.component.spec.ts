import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListstatususuarioComponent } from './liststatususuario.component';

describe('ListstatususuarioComponent', () => {
  let component: ListstatususuarioComponent;
  let fixture: ComponentFixture<ListstatususuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListstatususuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListstatususuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
