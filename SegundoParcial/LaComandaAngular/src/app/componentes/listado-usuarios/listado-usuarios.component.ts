import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  peliculas: Array<any> = Array<any>();
  displayedColumns: string[] = ['foto', 'Email', 'perfil'];
  dataSource;
  productoElegido;

  @Input() filtro: String;

  constructor(private servicio: MiservicioPrincipalService) { }


  ngOnInit() {

    this.servicio.usuarios().traerTodosUsuarios().subscribe((actions => {
      this.peliculas = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        console.info(data, " data");
        if (data.perfil == this.filtro) {
          this.peliculas.push(data);
        }
        else if (this.filtro == 'todos' && data.perfil != 'cliente') {
          this.peliculas.push(data);
        }
      });
      this.dataSource = new MatTableDataSource(this.peliculas);
    }));



  }

  async  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  elegir(nombre) {

    this.productoElegido = nombre;
  }


  eliminarAnonimos() {
    this.peliculas.forEach((e: Usuario) => {
      
      if (e.perfil == "anonimo") {
        this.servicio.usuarios().borrarUno(e.uid);
      }
    });
  }



  eliminar(peli) {
    var r = confirm("Press a button!");
    if (r == true) {

      this.servicio.productos().borrarUno(peli.id)
    } else {
    }

  }
  ocultar($event) {
    this.productoElegido = false;
  }


}
