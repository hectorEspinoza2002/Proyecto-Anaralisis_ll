import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittipodocumentoComponent } from './edittipodocumento.component';

describe('EdittipodocumentoComponent', () => {
  let component: EdittipodocumentoComponent;
  let fixture: ComponentFixture<EdittipodocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdittipodocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittipodocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
