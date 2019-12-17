import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'areas'
})
export class AreasPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case "barra":
        return "Tragos y Vinos";
        break;
      case "postre":
        return "Candy Bar";
        break;
      case "cocina":
      case "comida":
        return "Cocina";
        break;
      case "cerveza":
        return "Patio Cervecero";
        break;


    }
  }
}

