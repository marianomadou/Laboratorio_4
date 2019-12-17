import { Component, OnInit } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-invitado',
  templateUrl: './perfil-invitado.component.html',
  styleUrls: ['./perfil-invitado.component.scss']
})
export class PerfilInvitadoComponent implements OnInit {


  opcion = 7;

  constructor(public servicio: MiservicioPrincipalService, private _router: Router) {
    if (this.servicio.usuarios().traerUsuarioActual() == null) {
      this._router.navigate(['/bienvenida']);
    }
  }

  ngOnInit() {



  }


  vista(opcion) {
    this.opcion = opcion;
  }


}
