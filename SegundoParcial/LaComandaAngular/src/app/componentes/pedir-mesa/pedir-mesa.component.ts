import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';

@Component({
  selector: 'app-pedir-mesa',
  templateUrl: './pedir-mesa.component.html',
  styleUrls: ['./pedir-mesa.component.scss']
})
export class PedirMesaComponent implements OnInit {

  @Output() terminar: EventEmitter<any>;
  comensales: number =2;
  pedida: boolean;
  mesas: Array<any>;
  constructor(private servicio: MiservicioPrincipalService) {
    this.pedida = false;
    this.terminar = new EventEmitter();
  }
  
  ngOnInit() {
  }
  
  async pedirMesa() {
    this.mesas = new Array();
    
    this.servicio.spinnerOn();
    this.mesas = await this.servicio.mesas().traerTodasDisponible(this.comensales);
    
    if (this.mesas.length>0) {
      this.pedida = true;
      setTimeout(()=> this.servicio.spinnerOff());
    }




    /*    
       */
  }

  
 async elegirMesa(mesa)
  {
    await this.servicio.mesas().solicitarMesa(mesa).then((log) => {
      if( this.servicio.mesas().mesaActual!= null)
      {
        this.terminar.emit(true);
      }
      }
      );
    
  }

}
