import { Component, OnInit } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Pedido } from 'src/app/clases/pedido';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Producto } from 'src/app/clases/producto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.scss']
})
export class PerfilEmpleadoComponent implements OnInit {

  pedidoAConfirmar: Pedido;
  pedidoConfirmado: Pedido;
  opcion;
  pedirMesa: boolean;
  usuarioActual;
  perfil: string;

  constructor(public servicio: MiservicioPrincipalService, private _router: Router) {
    if (this.servicio.usuarios().traerUsuarioActual() == null) {
      this._router.navigate(['/bienvenida']);
    }

    this.perfil = localStorage.getItem('perfil');
  }

  ngOnInit() {
    setTimeout(() => this.servicio.spinnerOff(), 1500);
    this.opcion = 2;
  }


  vista(opcion) {

  }

  pedido($event) {

    this.opcion = 61;
  }

  volverPedirMesa($event) {
    this.opcion = 6;
  }


  pedidoConfirmadoE($event) {


  }


}
