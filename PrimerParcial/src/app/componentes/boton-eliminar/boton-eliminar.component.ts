import { Component, OnInit , Input} from '@angular/core';
import { PeliculasServicioService } from 'src/app/servicios/peliculas-servicio.service';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Pelicula } from 'src/app/clases/pelicula';
import { Actor } from 'src/app/clases/actor';

@Component({
  selector: 'app-boton-eliminar',
  templateUrl: './boton-eliminar.component.html',
  styleUrls: ['./boton-eliminar.component.css']
})
export class BotonEliminarComponent implements OnInit {

  @Input() peliculas: Pelicula;
  @Input() actores: Actor;

  constructor(private servicioGeneral: MiservicioPrincipalService) { }

  ngOnInit() {
  }


  eliminar(peli) {
    var r = confirm("Press a button!");
    if (r == true) {
      console.log(
        "You pressed OK!");
        if(this.actores){
          this.servicioGeneral.servActores.borrarUno(this.actores.id)
        }else if(this.peliculas){
          this.servicioGeneral.servPeliculas.borrarUno(this.peliculas.id)
        }
        
    } else {
      console.log(
        "You pressed Cancel!");
    }
  }



}
