import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Actor } from 'src/app/clases/actor';

@Component({
  selector: 'app-filtor-su-apellidocomponente',
  templateUrl: './filtor-su-apellidocomponente.component.html',
  styleUrls: ['./filtor-su-apellidocomponente.component.css']
})
export class FiltorSuApellidocomponenteComponent implements OnInit {

  actoresP=[];
  
  actoresCopia;
  actoresFilter
  @Output() mandarRespuesta: EventEmitter<any> = new EventEmitter<any>();

  @Input() actores: Array<any> = Array<any>();


  constructor(private servicioGeneral: MiservicioPrincipalService) { 
    this.actores = [];
    this.actoresFilter=[];
    this.servicioGeneral.servActores.traerTodoActor().subscribe(actions => {
      actions.map(a => {
        const data = a.payload.doc.data() as Actor;
        const id = a.payload.doc.id;
        console.info(data, " data");
        this.actores.push(data);
      });
    });
  }

  ngOnInit() {
    setTimeout(() => {
    console.log('actores en filtro: ', this.actores)
    
  }, 1000);
  setTimeout(() => {
    this.filtrarNacionalidades();
  }, 3000);

  let nacionalidadActor = (<HTMLInputElement>document.getElementById("nacionalidad")).value;
    console.log('El valor es: ', nacionalidadActor);
  
  }

  async filtrarNacionalidades() {

     this.actores = [...new Set(this.actores.map(item => item.nacionalidad))];
     console.log('El valor es: ', this.actores);
  }
  

  filterChanged(selectedValue: string) {
    let nacionalidadActor = (<HTMLInputElement>document.getElementById("nacionalidad")).value;
    this.mandarRespuesta.emit(nacionalidadActor);
    console.log('El valor es: ', nacionalidadActor);

  }

}
