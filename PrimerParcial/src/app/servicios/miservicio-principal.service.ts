import { Injectable } from '@angular/core';
import { ActoresServiciosService } from './actores-servicios.service';
import { PeliculasServicioService } from './peliculas-servicio.service';
import { AuthService } from './auth.service';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class MiservicioPrincipalService {

  constructor(public servActores: ActoresServiciosService,
  public servPeliculas: PeliculasServicioService,
  public auth: AuthService,
  private servUsuarios: UsuariosService) { }

  autenticar() {
    return this.auth;
  }
  usuarios() {
    return this.servUsuarios;
  }
}
