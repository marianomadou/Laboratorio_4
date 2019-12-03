import { Component, OnInit } from '@angular/core';
import { PeliculasServicioService } from 'src/app/servicios/peliculas-servicio.service';
import { Pelicula } from 'src/app/clases/pelicula';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Router } from '@angular/router';
import { Actor } from 'src/app/clases/actor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todasPeliculas = [];
  todasPeliculasCopia = [];
  todosActores = [];
  todosActoresCopia = [];
  peliculaElegida = Pelicula;
  actorElegido = Actor;
  busqueda: string;

  constructor(public servicioGenerla: MiservicioPrincipalService,
    public router: Router) {
  }

  async ngOnInit() {
    await this.servicioGenerla.servPeliculas.traerTodo().subscribe(actions => {
      this.todasPeliculas = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Pelicula;
        const id = a.payload.doc.id;
        data.id = id;
        console.info(data, " data");
        this.todasPeliculas.push(data);
        this.todasPeliculasCopia.push(data)

      });
    });

    await this.servicioGenerla.servActores.traerTodoActor().subscribe(actions => {
      this.todosActores = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Pelicula;
        const id = a.payload.doc.id;
        data.id = id;
        console.info(data, " data");
        this.todosActores.push(data);
        this.todosActoresCopia.push(data)

      });
    });

    //console.log("usuario en localstorage en Home",localStorage.getItem('usuario'))
  }

  async onLogout() {
    this.servicioGenerla.auth.signOut();
    console.log('estas afuera!')
    localStorage.clear();//comentar esta linea para testing
    this.router.navigate(['/login']);
  }

  mapear($event) {

    if ($event === "") {
      this.todasPeliculas = this.todasPeliculasCopia;
    }
    else {
      this.todasPeliculas = this.todasPeliculas.filter((value) => {
        console.log("value.nombre" + value.nombre);
        return (value.nombre.includes($event));
      });
    }






  }
}
