import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestalleProductoComponent } from './destalle-producto.component';

describe('DestalleProductoComponent', () => {
  let component: DestalleProductoComponent;
  let fixture: ComponentFixture<DestalleProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestalleProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestalleProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
