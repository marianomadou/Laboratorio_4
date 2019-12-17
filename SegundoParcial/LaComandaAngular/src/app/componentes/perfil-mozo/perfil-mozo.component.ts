import { Component, OnInit } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-mozo',
  templateUrl: './perfil-mozo.component.html',
  styleUrls: ['./perfil-mozo.component.scss']
})
export class PerfilMozoComponent implements OnInit {

  opcion=5;

  constructor( public servicio: MiservicioPrincipalService, private _router: Router) {
    if (this.servicio.usuarios().traerUsuarioActual() == null) {
      this._router.navigate(['/bienvenida']);
    } }

  ngOnInit() {
  
    setTimeout(()=>  this.servicio.spinnerOff(), 1500);
  }


  vista(opcion) {
    this.opcion = opcion;

  
  }


}
