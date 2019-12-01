import { Component, OnInit, Input, Output } from '@angular/core';
import { PeliculasServicioService } from 'src/app/servicios/peliculas-servicio.service';
import { Pelicula } from 'src/app/clases/pelicula';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {


  @Input() peliculas: Array<any> = Array<any>();
  peliculaElegida;

  constructor(private servicioGeneral: MiservicioPrincipalService) {

  }



  ngOnInit() {

  }

  elegir(peli) {
    console.log('elegi esta pelicula', peli)
    this.peliculaElegida = peli;
  }

  ocultar($event) {
    this.peliculaElegida = false;
  }

  eliminar(peli) {
    var r = confirm("Press a button!");
    if (r == true) {
      console.log(
        "You pressed OK!");
        this.servicioGeneral.servPeliculas.borrarUno(peli.id) 
    } else {
      console.log(
        "You pressed Cancel!");
    }



  }


}
