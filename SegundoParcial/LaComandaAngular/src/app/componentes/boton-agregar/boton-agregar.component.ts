import { Component, OnInit, Input,  EventEmitter, Output } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Pedido } from 'src/app/clases/pedido';

@Component({
  selector: 'app-boton-agregar',
  templateUrl: './boton-agregar.component.html',
  styleUrls: ['./boton-agregar.component.scss']
})
export class BotonAgregarComponent implements OnInit {

  @Input() producto: Producto;
  productosPedidos: Pedido;
  acumuladorProductos=0;
  @Output() enviar:  EventEmitter<any> = new EventEmitter();

  constructor(private servicioGeneral: MiservicioPrincipalService) {
    
   }

  ngOnInit() {
  }

  elegir()
  {
   this.acumuladorProductos++;
   this.enviar.emit(this.producto);
  }




}
