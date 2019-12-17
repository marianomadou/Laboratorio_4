import { Component, OnInit } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.scss']
})
export class PerfilAdminComponent implements OnInit {

  opcion = 0;

  constructor(public servicio: MiservicioPrincipalService, private _router: Router) {
    if (this.servicio.usuarios().traerUsuarioActual() == null) {
      this._router.navigate(['/bienvenida']);
    }
  }

  ngOnInit() {

    setTimeout(() => this.servicio.spinnerOff(), 1500);

  }


  vista(opcion) {
    this.opcion = opcion;
  }


}
