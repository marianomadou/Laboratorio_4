import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Producto } from 'src/app/clases/producto';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/clases/pedido';


@Component({
  selector: 'app-listado-precios',
  templateUrl: './listado-precios.component.html',
  styleUrls: ['./listado-precios.component.scss']
})
export class ListadoPreciosComponent implements OnInit {
  peliculas: Array<any> = Array<any>();
  peliculasCopia: Array<any> = Array<any>(); // arreglar incosistencias
  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Stock', 'Foto'];
  dataSource;
  productoElegido;
  pedido: Pedido;
  @Output() pedidoEmit: EventEmitter<any>;

  tipoOrden = "tipo";
  orden = "asc";
  total=0;



  constructor(private servicioGeneral: MiservicioPrincipalService) {

    this.pedido = new Pedido();
    this.pedidoEmit = new EventEmitter();

  }


  ngOnInit() {

    this.servicioGeneral.productos().traerTodoOrdenados(this.tipoOrden, this.orden).subscribe((actions => {
      this.peliculas = [];
      actions.forEach(e => this.peliculas.push(e))
      this.dataSource = new MatTableDataSource(this.peliculas);
    }));

    this.peliculasCopia = this.peliculas;


  }

  async  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  detalle(nombre) {
    this.productoElegido = nombre;
  }


  recibir(event:Producto) {
    this.pedido.productos.push(event);
    this.total += event.stock;

  }

  terminarPedido() {
    this.pedidoEmit.emit(this.pedido);
  }





  eliminar(peli) {
    var r = confirm("Press a button!");
    if (r == true) {
      this.servicioGeneral.productos().borrarUno(peli.id)
    } else {
    }

  }
  ocultar($event) {


    this.productoElegido = false;
  }

  comprar(producto) {

  }


  ordenar() {

    this.tipoOrden = (<HTMLInputElement>document.getElementById('tipoOrden')).value;
    this.orden = (<HTMLInputElement>document.getElementById('orden')).value;
    this.ngOnInit();

  }


}



