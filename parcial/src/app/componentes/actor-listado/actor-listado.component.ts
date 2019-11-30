import { Component, OnInit } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Pelicula } from 'src/app/clases/pelicula';
import { Actor } from 'src/app/clases/actor';

@Component({
  selector: 'app-actor-listado',
  templateUrl: './actor-listado.component.html',
  styleUrls: ['./actor-listado.component.css']
})
export class ActorListadoComponent implements OnInit {

  actores;
  actoresCopia;
  todasPeliculas;
  todasPeliculasCopia;
  actorElegido;
  actoresSelect;

  constructor(private servicioGeneral: MiservicioPrincipalService) { }

  ngOnInit() {
    this.servicioGeneral.servActores.traerTodoActor().subscribe(actions => {
      this.actores = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Actor;
        const id = a.payload.doc.id;
        console.info(data, " data");
        this.actores.push(data);
      });
    });

    this.servicioGeneral.servPeliculas.traerTodo().subscribe(actions => {
      this.todasPeliculas = [];
      this.todasPeliculasCopia = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Pelicula;
        const id = a.payload.doc.id;
        data.id = id;
        console.info(data, "data");
        this.todasPeliculas.push(data);
        this.todasPeliculasCopia.push(data);

      });
    });

    this.servicioGeneral.servActores.traerTodoActor().subscribe(actions => {

      this.actoresSelect = [];

      actions.map(a => {
        const data = a.payload.doc.data() as Actor;
        const id = a.payload.doc.id;
        console.info(data, " data");
        this.actoresSelect.push({
          nombre: data.nombre,
          apellido: data.apellido
        });
      console.log(this.actoresSelect);
      
      
      
      });
    })
  }

mapear(event)
{
  this.todasPeliculas= this.todasPeliculasCopia;
  console.log("hola");
  console.log(this.todasPeliculas);
  let actor=(<HTMLInputElement> document.getElementById("actor")).value;
  this.todasPeliculas= this.todasPeliculas.filter(a => {
    try
    {
      return (a.actor.includes(actor));

    }catch(w){}
  });
    

  
}






}












