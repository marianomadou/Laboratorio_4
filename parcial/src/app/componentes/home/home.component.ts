import { Component, OnInit } from '@angular/core';
import { PeliculasServicioService } from 'src/app/servicios/peliculas-servicio.service';
import { Pelicula } from 'src/app/clases/pelicula';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todasPeliculas = [];
  todasPeliculasCopia = [];
  peliculaElegida = Pelicula;
  busqueda: string;

  constructor(private servicioGenerla: MiservicioPrincipalService) {
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

  }


  mapear($event) {
     
    if ($event=== "") {      
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
