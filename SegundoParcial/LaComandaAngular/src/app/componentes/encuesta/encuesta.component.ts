import { Component, OnInit } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { EncuestaCliente } from 'src/app/clases/encuesta-cliente';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  cliente;
  valorMozo;
  valorCocinero;
  valorBartender;
  valorMesa;
  valorRestaurant;
  sugerencia;
  pedido;
  puedeSacarFoto: boolean;
  cantFotos: number;
  encuesta: EncuestaCliente;

  constructor(private miServicioGeneral: MiservicioPrincipalService
  ) {
    this.encuesta = new EncuestaCliente();
  }

  ngOnInit() {
  }

  guardar() {

    if (this.encuesta.valorMozo != null && this.encuesta.valorCocinero != null) {
      if (this.encuesta.valorResturant != null && this.encuesta.valorBartender != null) {

        this.encuesta.cliente = this.miServicioGeneral.usuarios().traerUsuarioActual().email;
        this.encuesta.sugerencia = this.sugerencia;
        this.encuesta.fecha = new Date(Date.now()).toISOString();
        this.encuesta.mesa = this.miServicioGeneral.mesas().mesaActual.numero;
        this.miServicioGeneral.encuesta().enviarEncuesta(this.encuesta).then((e) => {
          let cliente = this.miServicioGeneral.usuarios().traerUsuarioActual();
          cliente.registrado = true;
          this.miServicioGeneral.usuarios().actualizarUsuario(cliente).then(() => this.miServicioGeneral.toasterVerde("su encuesta ha sido enviada", " muchas gracias", 4000)
          );

        })
      }
      else {
        this.miServicioGeneral.toasterAzul("Por favor complete todos los campos del formulario", "=(", 3000)
      }
    } else {
      this.miServicioGeneral.toasterAzul("Por favor complete todos los campos", "=(", 3000)
    }

  }

  notaMozo($event) {
    this.encuesta.valorMozo = $event
  }
  notaCocina($event) {
    this.encuesta.valorCocinero = $event
  }
  notaGeneral($event) {
    this.encuesta.valorResturant = $event
  }
  notaBebida($event) {
    this.encuesta.valorBartender = $event
  }

}
