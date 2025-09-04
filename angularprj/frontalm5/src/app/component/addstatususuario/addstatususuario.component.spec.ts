import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstatususuarioComponent } from './addstatususuario.component';

describe('AddstatususuarioComponent', () => {
  let component: AddstatususuarioComponent;
  let fixture: ComponentFixture<AddstatususuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddstatususuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddstatususuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
