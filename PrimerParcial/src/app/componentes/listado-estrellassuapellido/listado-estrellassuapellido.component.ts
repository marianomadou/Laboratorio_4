import { Component, OnInit, Input } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Actor } from 'src/app/clases/actor';
import { Pelicula } from 'src/app/clases/pelicula';

@Component({
  selector: 'app-listado-estrellassuapellido',
  templateUrl: './listado-estrellassuapellido.component.html',
  styleUrls: ['./listado-estrellassuapellido.component.css']
})
export class ListadoEstrellassuapellidoComponent implements OnInit {

  @Input() nacionalidad: string;
  @Input() actores: Array<any> = Array<any>();

  
  actoresCopia;
  todasPeliculas;
  todasPeliculasCopia;
  todasPeliculasMap = [];
  todosActoresMap = [];
  actorElegido;
  actoresSelect;

  constructor(private servicioGeneral: MiservicioPrincipalService) { }

  ngOnInit() {
    this.actores = [];
    this.actoresCopia = [];
    this.servicioGeneral.servActores.traerTodoActor().subscribe(actions => {

      actions.map(a => {
        const data = a.payload.doc.data() as Actor;
        const id = a.payload.doc.id;
        //console.info(data, " data");
        this.actores.push(data);
        this.actoresCopia.push(data);
      });
    });

    this.actoresSelect = [];
    this.servicioGeneral.servActores.traerTodoActor().subscribe(actions => {

      actions.map(a => {
        const data = a.payload.doc.data() as Actor;
        const id = a.payload.doc.id;
        //console.info(data, " data");
        //this.actorElegido= data.nombre + " " + data.apellido;
        this.actoresSelect.push({
          actor: data.nombre + " " + data.apellido
        });
        console.log(this.actoresSelect);



      });
    })
  }

  mapear(event) {
    this.actores = this.actoresCopia;

    console.log(this.actores);
    let nacionalidad = (<HTMLInputElement>document.getElementById("nacionalidad")).value;
    this.actores = this.actores.filter(actor => {
      if (nacionalidad == actor.nacionalidad) {
        this.todosActoresMap.push(actor)
      }

    });

    this.actores = this.todosActoresMap;

  }





}
