import { Component, OnInit , Input} from '@angular/core';
import { PeliculasServicioService } from 'src/app/servicios/peliculas-servicio.service';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Pelicula } from 'src/app/clases/pelicula';

@Component({
  selector: 'app-boton-eliminar',
  templateUrl: './boton-eliminar.component.html',
  styleUrls: ['./boton-eliminar.component.css']
})
export class BotonEliminarComponent implements OnInit {

  @Input() peliculas: Pelicula;

  constructor(private servicioGeneral: MiservicioPrincipalService) { }

  ngOnInit() {
  }


  eliminar(peli) {
    var r = confirm("Press a button!");
    if (r == true) {
      console.log(
        "You pressed OK!");
        this.servicioGeneral.servPeliculas.borrarUno(this.peliculas.id) 
    } else {
      console.log(
        "You pressed Cancel!");
    }
  }



}
