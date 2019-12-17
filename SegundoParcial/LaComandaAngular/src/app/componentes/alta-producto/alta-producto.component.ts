import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Producto } from 'src/app/clases/producto';
import { Usuario } from 'src/app/clases/usuario';
import { LogStock } from 'src/app/clases/log-stock';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.scss']
})
export class AltaProductoComponent
  implements OnInit {

  peliculaNueva: Producto;
  /*   generos: TipoPelicula; */
  archivo: any;
  ver: boolean;
  valorActor;

  constructor(private serviciogeneral: MiservicioPrincipalService, private auth: AuthService) {
    this.peliculaNueva = new Producto();
    this.ver = true;
  }

  ngOnInit() {

  }

  cargar() {
    this.peliculaNueva.tipo = (<HTMLInputElement>document.getElementById("tipo")).value;
    this.serviciogeneral.productos().enviarConFoto(this.peliculaNueva, this.archivo);
  }


  detectFiles(event) {
    this.archivo = event.target.files[0];
  }


  mostrar() {
    if (!this.ver) {
      this.ver = true;
    }
    else {
      this.ver = false;
    }
  }






}
