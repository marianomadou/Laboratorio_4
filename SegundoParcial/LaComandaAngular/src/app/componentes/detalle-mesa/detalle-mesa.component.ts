import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Pedido } from 'src/app/clases/pedido';
import { Producto } from 'src/app/clases/producto';
import { Mesa } from 'src/app/clases/mesa';

@Component({
  selector: 'app-detalle-mesa',
  templateUrl: './detalle-mesa.component.html',
  styleUrls: ['./detalle-mesa.component.scss']
})
export class DetalleMesaComponent implements OnInit {

  constructor(private servicioGeneral: MiservicioPrincipalService) { }

  nroMesa;
  cliente;
  pedidos: Array<Pedido>;
  pedido: Pedido;
  nuevo = false;
  @Output() terminar: EventEmitter<any> = new EventEmitter()


  ngOnInit() {
    // this.nroMesa = this.servicioGeneral.mesas().mesaActual;
    this.servicioGeneral.mesas().traerUnaMesaUID(this.servicioGeneral.mesas().mesaActual.uid).subscribe(e => {
      this.pedidos = new Array();

      this.nroMesa = e.payload.data() as Mesa;
      this.nroMesa.pedidos.forEach(element => {
        this.servicioGeneral.pedido().traerUnPedido(element).subscribe((e: Pedido) => {
          this.pedidos.push(e);
        });
      });

      this.cliente = this.servicioGeneral.usuarios().traerUsuarioActual();





    });

  }

  cerrarMesa() {
    this.terminar.emit(true);
  }


}
