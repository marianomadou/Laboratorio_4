import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estados'
})
export class EstadosPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case "pendiente":
        return "Pendiente";
        break;
      case "enPreparacion":
        return "Pronto estará listo";
        break;
      case "terminado":
        return "Entregado";
        break;
      case "entregado":
        return "Pedido Cerrado";
        break;


    }
  }

}
