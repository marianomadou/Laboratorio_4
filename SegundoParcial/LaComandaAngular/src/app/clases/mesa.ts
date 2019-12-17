import { Pedido } from './pedido';
import { Usuario } from './usuario';

export class Mesa {


  uid: string;
  numero: number;         
  cantidadComensales: number;     
  tipoMesa: string;       
  codigoQr: string;  
  estado: string;   //Estados: {"disponible", "ocupada", "reservada" } 
  usuario: Usuario;
  url;
  cliente;
  pedidos: Array<String>
  descuento: number;

    constructor() {
      this.cliente="sin asignar";
      this.pedidos= new Array();
    }

    dameJSON() {
      return JSON.parse( JSON.stringify(this));
    }

}