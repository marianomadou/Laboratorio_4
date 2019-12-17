import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Producto } from 'src/app/clases/producto';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/clases/pedido';
import { Usuario } from 'src/app/clases/usuario';


@Component({
  selector: 'app-listado-producto',
  templateUrl: './listado-producto.component.html',
  styleUrls: ['./listado-producto.component.scss']
})
export class ListadoProductoComponent implements OnInit {

  peliculas: Array<any> = Array<any>();
  peliculasCopia: Array<any> = Array<any>(); // arreglar incosistencias
  displayedColumns: string[] = ['Nombre', 'Descripcion', 'Stock', 'Foto'];
  dataSource;
  productoElegido;
  pedido: Pedido;
  @Output() pedidoEmit: EventEmitter<any>;

  tipoOrden = "tipo";
  orden = "asc";
  usuarioActual:Usuario;



  constructor(private servicioGeneral: MiservicioPrincipalService) {

    this.usuarioActual= this.servicioGeneral.usuarios().traerUsuarioActual();
    this.servicioGeneral.usuarios().traerUnUsuarioPorMail(localStorage.getItem("email"));
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


  recibir(event) {
    this.pedido.productos.push(event);
 

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



