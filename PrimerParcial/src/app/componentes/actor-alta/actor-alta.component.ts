import { Component, OnInit } from '@angular/core';
import { PeliculasServicioService } from 'src/app/servicios/peliculas-servicio.service';
import { Pelicula } from 'src/app/clases/pelicula';
import { TipoPelicula } from 'src/app/enums/tipo-pelicula.enum';
import { Actor } from 'src/app/clases/actor';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';

@Component({
  selector: 'app-actor-alta',
  templateUrl: './actor-alta.component.html',
  styleUrls: ['./actor-alta.component.css']
})
export class ActorAltaComponent implements OnInit {

  actorNuevo: Actor;
  generos: TipoPelicula;
  archivo: any;
  ver:boolean;
  fechaNacimiento;

  constructor(private servicioGeneral: MiservicioPrincipalService) 
  { 
  

  }

  ngOnInit() {
    this.actorNuevo= new Actor();
    this.ver = false;

  }

  cargar() {
      this.actorNuevo.fechaDeNacimiento= new Date(this.fechaNacimiento).getDay().toString()
      +"/"+new Date(this.fechaNacimiento).getMonth().toString()
      +"/"+new Date(this.fechaNacimiento).getFullYear().toString();
      
   this.servicioGeneral.servActores.enviarActor(this.actorNuevo, this.archivo);
  }


  detectFiles(event) {
    this.archivo= event.target.files[0];
  }


  mostrar()
  {
    if(!this.ver)
    {
      this.ver=true;
    }
    else{
      this.ver=false;
    }
  }

}
