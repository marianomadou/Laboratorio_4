import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Actor } from 'src/app/clases/actor';
import { FormControl } from '@angular/forms';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';

@Component({
  selector: 'app-detalle-actor',
  templateUrl: './detalle-actor.component.html',
  styleUrls: ['./detalle-actor.component.css']
})
export class DetalleActorComponent implements OnInit {

  @Input() actor: Actor;
  @Output() modal: EventEmitter<any>;
  @Input() control:FormControl;
  modificar;
  //generos: TipoPelicula;
  actores:string [];
  archivo: any;
  opcion;

  constructor(private servicioGeneral: MiservicioPrincipalService) { 
    this.modal = new EventEmitter();
    this.modificar = true;
    this.actor = new Actor();
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
    console.log('actor?', this.actor)
    switch (this.opcion) {
      case 1:
        this.servicioGeneral.servActores.actualizaUno(this.actor);
        this.modal.emit(false);
        break;
      case 2:
        this.servicioGeneral.servActores.actualizaConFoto(this.actor, this.archivo);
        this.modal.emit(false);
        break;

    }
  }


}
