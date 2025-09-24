import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittipomovimientocxcComponent } from './edittipomovimientocxc.component';

describe('EdittipomovimientocxcComponent', () => {
  let component: EdittipomovimientocxcComponent;
  let fixture: ComponentFixture<EdittipomovimientocxcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdittipomovimientocxcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittipomovimientocxcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
