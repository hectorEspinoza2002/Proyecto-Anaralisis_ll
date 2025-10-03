import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsaldocuentaComponent } from './editsaldocuenta.component';

describe('EditsaldocuentaComponent', () => {
  let component: EditsaldocuentaComponent;
  let fixture: ComponentFixture<EditsaldocuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditsaldocuentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditsaldocuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
