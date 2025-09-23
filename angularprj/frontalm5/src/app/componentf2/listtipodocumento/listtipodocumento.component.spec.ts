import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtipodocumentoComponent } from './listtipodocumento.component';

describe('ListtipodocumentoComponent', () => {
  let component: ListtipodocumentoComponent;
  let fixture: ComponentFixture<ListtipodocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListtipodocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListtipodocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
