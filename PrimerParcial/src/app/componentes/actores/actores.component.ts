import { Component, OnInit, Input } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';

@Component({
  selector: 'app-actores',
  templateUrl: './actores.component.html',
  styleUrls: ['./actores.component.css']
})
export class ActoresComponent implements OnInit {


  @Input() actores: Array<any> = Array<any>();
  actorElegido;
  

  constructor(private servicioGeneral: MiservicioPrincipalService) { }



  ngOnInit() {

  }

  elegir(peli) {
    console.log('elegi esta pelicula', peli)
    this.actorElegido = peli;
  }

  ocultar($event) {
    this.actorElegido = false;
  }

  eliminar(peli) {
    var r = confirm("Seguro que quiere eliminar?!");
    if (r == true) {
      console.log(
        "Eliminado!");
        this.servicioGeneral.servActores.borrarUno(peli.id) 
    } else {
      console.log(
        "Accion cancelada");
    }



  }

}
