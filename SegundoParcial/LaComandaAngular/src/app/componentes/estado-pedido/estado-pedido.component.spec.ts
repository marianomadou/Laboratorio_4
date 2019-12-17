import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoPedidoComponent } from './estado-pedido.component';

describe('EstadoPedidoComponent', () => {
  let component: EstadoPedidoComponent;
  let fixture: ComponentFixture<EstadoPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
