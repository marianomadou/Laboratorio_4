import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadosMesaCliente'
})
export class EstadosMesaClientePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 'solicitada':
        return 'Su solicitud ha sido enviada, aguarde unos instantes que uno de nuestros representantes le responderá a la brevedad.';
      case 'cerrada':
        return 'Gracias por su visita, en Dinner lo esperamos para que regrese cuando lo desee.';
      case 'reservada':
        return 'Su solicitud ha sido aceptada. En breve lo habilitaremos a que pueda acceder a elegir los platos que tenemos disponibles para usted.';
      case 'inicioServicio':
        return 'Bienvenido a su mesa';
      case 'cuentaPedida':
        return 'Cerrando';
      case 'pagando':
        return 'Su factura ya ha sido emitida.';

    }
  }

}
