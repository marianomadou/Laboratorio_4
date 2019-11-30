import { Component, OnInit } from '@angular/core';
import { PeliculasServicioService } from 'src/app/servicios/peliculas-servicio.service';
import { Pelicula } from 'src/app/clases/pelicula';
import { TipoPelicula } from 'src/app/enums/tipo-pelicula.enum';
import { Actor } from 'src/app/clases/actor';
import { stringify } from '@angular/compiler/src/util';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-cargar-pelicula',
  templateUrl: './cargar-pelicula.component.html',
  styleUrls: ['./cargar-pelicula.component.css']
})
export class CargarPeliculaComponent implements OnInit {

  peliculaNueva: Pelicula;
  generos: TipoPelicula;
  archivo: any;
  ver:boolean;
  actores:string [];
  valorActor;

  constructor(private serviciogeneral: MiservicioPrincipalService, public auth: AuthService) {
    this.peliculaNueva = new Pelicula();
    this.ver= false;

    
  

  }

  ngOnInit() {

    this.serviciogeneral.servActores.traerTodoActor().subscribe(actions => {
      this.actores = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Actor;
        const id = a.payload.doc.id;
        console.info(data, " data");

        this.actores.push(data.nombre+" "+ data.apellido);
        console.log(data.nombre+" "+ data.apellido)

      });
    });
    

  }

  cargar() {


    let genero =(<HTMLInputElement> document.getElementById("tipo")).value;
    let actor=(<HTMLInputElement> document.getElementById("actor")).value;

    this.peliculaNueva.actor=actor;

    console.log("genero"+genero);
    
    switch(genero)
    {
      case "1":
        this.peliculaNueva.tipo= TipoPelicula.terror;
        break;
      case "2":
        this.peliculaNueva.tipo= TipoPelicula.comedia;
        break;
      case "3":
        this.peliculaNueva.tipo= TipoPelicula.amor;
        break;
      case "4":
        this.peliculaNueva.tipo= TipoPelicula.otros;
        break;  
       default:
            this.peliculaNueva.tipo= TipoPelicula.otros;
        break;  
    }         
   this.serviciogeneral.servPeliculas.enviar(this.peliculaNueva, this.archivo);
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
