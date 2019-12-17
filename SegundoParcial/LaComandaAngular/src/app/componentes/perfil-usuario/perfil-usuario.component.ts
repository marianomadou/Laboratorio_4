import { Component, OnInit } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Pedido } from 'src/app/clases/pedido';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Producto } from 'src/app/clases/producto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  pedidoAConfirmar: Pedido;
  pedidoConfirmado: Pedido;
  opcion;
  pedirMesa: boolean = true;
  usuarioActual;

  constructor(public servicio: MiservicioPrincipalService, private _router: Router) {

    try {
      this.usuarioActual = this.servicio.usuarios().traerUsuarioActual().email;
      this.servicio.mesas().traerMesaPorUsuarioMail(this.usuarioActual);
      this.pedirMesa = false;
    }
    catch (e) {

      this._router.navigate(['/bienvenida']);

    }

  }

  ngOnInit() {
    this.servicio.spinnerOn();

    setTimeout(() => {
      this.pedidoAConfirmar = new Pedido();
      this.pedidoConfirmado = new Pedido();

      if (this.servicio.mesas().mesaActual == null) {
        //this.servicio.toasterWarning("Todavia no tiene mesa asignada", "Bienvenido", 1000);
        this.pedirMesa = true;
        this.opcion = 1;
      }
      else {
        switch (this.servicio.mesas().mesaActual.estado) {
          case 'solicitada':
            //this.servicio.toasterError(this.servicio.mesas().mesaActual.numero, "Esperando confirmacion de mesa, aguarde que un mozo lo atendera por su mail", 3000);
            this.pedirMesa = false;
            this.opcion = 4;
            break;

          case 'reservada':
            //this.servicio.toasterError("Ya tiene una mesa asignada", "CONFIRMACION", 3000);
            this.pedirMesa = false;
            this.opcion = 4;
            break;

          case 'comiendo':
            //this.servicio.toasterVerde(this.servicio.mesas().mesaActual.numero, "Su mesa es", 3000);
            this.pedirMesa = false;
            this.opcion = 2
            break;

          case 'inicioServicio':
            //this.servicio.toasterAzul(this.servicio.mesas().mesaActual.numero, "Su mesa es", 3000);
            this.pedirMesa = false;
            this.opcion = 6;
            break;

          case 'cuentaPedida':
            //this.servicio.toasterAzul(this.servicio.mesas().mesaActual.numero, "Su mesa es", 3000);
            this.pedirMesa = false;
            this.opcion = 5;
            break;
            
          case 'pagando':
            //this.servicio.toasterAzul(this.servicio.mesas().mesaActual.numero, "Su mesa es", 3000);
            this.pedirMesa = false;
            this.opcion = 5;
            break;
          case 'cerrada':
            //this.servicio.toasterAzul(this.servicio.mesas().mesaActual.numero, "Su mesa es", 3000);
            this.pedirMesa = false;
            this.opcion = 5;
            break;

          default:
            //this.servicio.toasterVerde(this.servicio.mesas().mesaActual.numero, "Su mesa es" + this.servicio.mesas().mesaActual.estado, 3000);
            this.pedirMesa = false;
            this.opcion = 2;
            break;
        }

      }

      this.servicio.spinnerOff();
    }, 2000);

  }

  public scrollToElement(element): void {
    element.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  }

  vista(opcion) {
    this.opcion = opcion;
  }

  pedido($event) {
    this.pedidoAConfirmar = $event;

    this.opcion = 61;
  }

  volverPedirMesa($event) {

    this.opcion = 4;
  }

  cerrarMesa($event) {

    this.servicio.mesas().actualizarMesaEmpleado(this.servicio.mesas().mesaActual, 'cuentaPedida');
    this.opcion = 5;
  }


  pedidoConfirmadoE($event) {
    let total = 0;
    this.pedidoConfirmado.productos = $event;

    this.pedidoConfirmado.estado = "Esperando Confirmacion de Areas";
    this.servicio.mesas().mesaActual.pedidos = this.servicio.pedido().crearPedidoXArea(this.pedidoConfirmado, this.servicio.mesas().mesaActual);
    this.servicio.mesas().actualizarMesaEmpleado(this.servicio.mesas().mesaActual, "esperandoComida");
    this.opcion = 0;
    this.servicio.spinnerOn();
    setTimeout(()=>{  this.opcion =  2; this.servicio.spinnerOff(); }, 5000);

  }


}
