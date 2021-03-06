import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/clases/pelicula';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { TipoPelicula } from 'src/app/enums/tipo-pelicula.enum';
import { Actor } from 'src/app/clases/actor';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit {
  @Input() pelicula: Pelicula;
  @Output() modal: EventEmitter<any>;
  @Input() control:FormControl;
  modificar;
  generos: TipoPelicula;
  actores:string [];
  archivo: any;
  opcion;

  constructor(private servicioGeneral: MiservicioPrincipalService) { 
    this.modal = new EventEmitter();
    this.modificar = true;
    this.pelicula = new Pelicula();
  }

  ngOnInit() {
    this.servicioGeneral.servActores.traerTodoActor().subscribe(actions => {
      this.actores = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Actor;
        const id = a.payload.doc.id;
        this.actores.push(data.nombre+" "+ data.apellido);
        });
    });

    this.modificar = true;
    this.archivo = false;
    this.opcion = 1;
  }

  destruir() {
    this.modal.emit(false);
  }

  detectFiles(event) {
    this.archivo= event.target.files[0];
    this.opcion = 2;
  }

  cambiarInfo() {
    let genero =(<HTMLInputElement> document.getElementById("tipo")).value;
    let actor=(<HTMLInputElement> document.getElementById("actor")).value;

    console.log('pelicula?', this.pelicula)
    switch (this.opcion) {
      case 1:
        this.servicioGeneral.servPeliculas.actualizaUno(this.pelicula);

        this.modal.emit(false);
        break;
      case 2:
        this.servicioGeneral.servPeliculas.actualizaConFoto(this.pelicula, this.archivo);

        this.modal.emit(false);
        break;

    }
  }

}
