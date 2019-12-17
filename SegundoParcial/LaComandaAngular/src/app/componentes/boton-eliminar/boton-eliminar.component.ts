import { Component, OnInit , Input} from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Producto } from 'src/app/clases/producto';

@Component({
  selector: 'app-boton-eliminar',
  templateUrl: './boton-eliminar.component.html',
  styleUrls: ['./boton-eliminar.component.css']
})
export class BotonEliminarComponent implements OnInit {

  @Input() peliculas: Producto;

  constructor(private servicioGeneral: MiservicioPrincipalService) { }

  ngOnInit() {
  }


  eliminar() {

        this.peliculas.stock--; 
        this.servicioGeneral.productos().actualizarUno(this.peliculas.uid, this.peliculas) 
    
  }



}
