import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditroleopcionComponent } from './editroleopcion.component';

describe('EditroleopcionComponent', () => {
  let component: EditroleopcionComponent;
  let fixture: ComponentFixture<EditroleopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditroleopcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditroleopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
