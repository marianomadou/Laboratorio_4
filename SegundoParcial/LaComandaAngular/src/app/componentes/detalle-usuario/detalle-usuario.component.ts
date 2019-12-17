import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Producto } from 'src/app/clases/producto';
import { Usuario } from 'src/app/clases/usuario';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent implements OnInit {

 
  @Input() producto:Usuario;
  @Output() modal: EventEmitter<any>;
  usuarioCopia: Usuario;

  constructor(private servicioGeneral: MiservicioPrincipalService) { 
    this.modal = new EventEmitter();
  }

  ngOnInit() {
    this.usuarioCopia = new Usuario();
  }

  destruir()
  {
    this.modal.emit(false);
  
  }

  modificarLocal() {
    this.producto.perfil = this.usuarioCopia.perfil;
    this.servicioGeneral.usuarios().actualizarUsuario(this.producto);
    this.servicioGeneral.toasterWarning("perfil modificado", "Confirmacion", 1000);
  }



  onChangePerfil(perfil) {
    
    this.usuarioCopia.perfil = perfil;
  }
  


}
