import { Component, OnInit, Input } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Mesa } from 'src/app/clases/mesa';

@Component({
  selector: 'app-mini-detalle-mesa',
  templateUrl: './mini-detalle-mesa.component.html',
  styleUrls: ['./mini-detalle-mesa.component.scss']
})
export class MiniDetalleMesaComponent implements OnInit {

  nroMesa;
  @Input() mesaUID;

  constructor(private servicioGeneral: MiservicioPrincipalService) { 
    this.nroMesa= new Mesa();   
  
  }
  
  ngOnInit() {
    this.nroMesa = this.servicioGeneral.mesas()
    .traerUnaMesaUID(this.mesaUID)
    .subscribe((e)=>{this.nroMesa=e.payload.data() as Mesa});
  }

}
