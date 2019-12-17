import { Usuario } from "./usuario";


export class Reserva {
  
    //MODELO USUARIO DE COMANDA
    uid: string;              // id - key de FireBase
    mesas: number    // lista de las mesas reservadas	
    cliente: Usuario;      // cliente 
    fecha: string;   // fecha y hora de la reserva ingresada por el usuario
    hora: string;
    estado: string;      // Valores = ["reservada","pendiente"]
    
    constructor(){
      
    }
  
    dameJSON() {
      return JSON.parse( JSON.stringify(this));
    }
  }