import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstatususuarioComponent } from './editstatususuario.component';

describe('EditstatususuarioComponent', () => {
  let component: EditstatususuarioComponent;
  let fixture: ComponentFixture<EditstatususuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditstatususuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditstatususuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
