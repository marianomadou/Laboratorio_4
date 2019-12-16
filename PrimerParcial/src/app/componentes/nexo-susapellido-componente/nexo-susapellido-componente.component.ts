import { Component, OnInit, Input } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Actor } from 'src/app/clases/actor';

@Component({
  selector: 'app-nexo-susapellido-componente',
  templateUrl: './nexo-susapellido-componente.component.html',
  styleUrls: ['./nexo-susapellido-componente.component.css']
})
export class NexoSusapellidoComponenteComponent implements OnInit {
  @Input() actores: Array<any> = Array<any>();

  actoresP=[];
  
  actoresCopia;
  actoresFilter
  
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
    this.filtrarNacionalidades();
  }

  async filtrarNacionalidades() {

    this.actores = [...new Set(this.actores.map(item => item.nacionalidad))];
    console.log('El valor es: ', this.actores);
 }
 

/*  filterChanged(selectedValue: string) {
   let nacionalidad = (<HTMLInputElement>document.getElementById("nacionalidad")).value;
   console.log('El valor es: ', nacionalidad);

 } */

}
