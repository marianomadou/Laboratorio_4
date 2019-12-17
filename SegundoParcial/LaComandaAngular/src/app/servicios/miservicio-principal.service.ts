import { Injectable } from '@angular/core';
import { UsuariosService } from './firebase/usuarios.service';
import { ProductosService } from './firebase/productos.service';
import { AuthService } from './auth.service';
import { MesasServiceService } from './firebase/mesas-service.service';
import { PedidoServiceService } from './firebase/pedido-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { EncuestaService } from './firebase/encuesta.service';

@Injectable({
  providedIn: 'root'
})
export class MiservicioPrincipalService {

  constructor(
    private servUsuarios: UsuariosService, 
    private pedidoServ : PedidoServiceService, 
    private servProductos: ProductosService, 
    private servEncuesta: EncuestaService, 
    private mesasServ: MesasServiceService,
    private toastr: ToastrService, private spinner: NgxSpinnerService,
    private auth: AuthService) { }

  autenticar() {
    return this.auth;
  }

  usuarios() {
    return this.servUsuarios;
  }
  productos() {
    return this.servProductos;
  }
  mesas() {
    return this.mesasServ;
  }
  pedido() {
    return this.pedidoServ;
  }

  encuesta() {
    return this.servEncuesta;
  }


  toasterVerde(subititulo, titulo, tiempo)
  {
    this.toastr.success(subititulo, titulo, {
      timeOut: tiempo
    });
   
  }
  toasterError(subititulo, titulo, tiempo)
  {
    this.toastr.error(subititulo, titulo, {
      timeOut: tiempo
    });
   
  }
  toasterAzul(subititulo, titulo, tiempo)
  {
    this.toastr.info(subititulo, titulo, {
      timeOut: tiempo
    });
   
  }
  toasterWarning(subititulo, titulo, tiempo)
  {
    this.toastr.warning(subititulo, titulo, {
      timeOut: tiempo,
      positionClass: 'toast-top-center',
    });
   
  }


  spinnerOn()
  {
    this.spinner.show();   
  }

  spinnerOff()
  {
    this.spinner.hide();   
  }


















}



