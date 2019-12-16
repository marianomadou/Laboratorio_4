import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/clases/actor';
import { TipoPelicula } from 'src/app/enums/tipo-pelicula.enum';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';

@Component({
  selector: 'app-actor-alta-foto',
  templateUrl: './actor-alta-foto.component.html',
  styleUrls: ['./actor-alta-foto.component.css']
})
export class ActorAltaFotoComponent implements OnInit {

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
      
   this.servicioGeneral.servActores.enviarActorConFoto(this.actorNuevo, this.archivo);
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
