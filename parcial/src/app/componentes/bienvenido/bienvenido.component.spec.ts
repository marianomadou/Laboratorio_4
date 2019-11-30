import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidoComponent } from './bienvenido.component';

describe('BienvenidoComponent', () => {
  let component: BienvenidoComponent;
  let fixture: ComponentFixture<BienvenidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienvenidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
