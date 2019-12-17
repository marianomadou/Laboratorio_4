import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Producto } from 'src/app/clases/producto';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/clases/pedido';
import { ToastrService } from 'ngx-toastr';
import { ReturnStatement } from '@angular/compiler';



@Component({
  selector: 'app-confirmar-pedido',
  templateUrl: './confirmar-pedido.component.html',
  styleUrls: ['./confirmar-pedido.component.scss']
})
export class ConfirmarPedidoComponent implements OnInit {

  @Input() peliculas: Array<any> = Array<any>();
  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Stock', 'Foto'];
  dataSource;
  productoElegido;
  @Input() pedido: Array<Producto>;
  @Output() pedidoEmit: EventEmitter<any>;

  tipoOrden = "tipo";
  orden = "asc";
  total;

  pedirDeNuevo:boolean=false;

  constructor(private servicioGeneral: MiservicioPrincipalService) {
    this.pedido = new Array();
    this.pedidoEmit = new EventEmitter();    
  }
  
  
  ngOnInit() {
    
    this.total=0;
    this.pedido.forEach((e: Producto) => {
    this.total += e.stock;});
    if(this.total==0){
      this.pedirDeNuevo=true;
    }

  }

  async  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  terminarPedido() {
    this.pedidoEmit.emit(this.pedido);
  }


  eliminar(prod) {
    this.pedido.splice(this.pedido.indexOf(prod), 1);
    this.total=0;
    this.pedido.forEach((e: Producto) => this.total += e.stock);
  }


  ocultar($event) {
    this.productoElegido = false;
  }



  ordenar() {
    this.tipoOrden = (<HTMLInputElement>document.getElementById('tipoOrden')).value;
    this.orden = (<HTMLInputElement>document.getElementById('orden')).value;
    this.ngOnInit();

  }


}



