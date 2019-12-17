import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonAgregarComponent } from './boton-agregar.component';

describe('BotonAgregarComponent', () => {
  let component: BotonAgregarComponent;
  let fixture: ComponentFixture<BotonAgregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonAgregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
