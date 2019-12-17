import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsuariosService } from '../firebase/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {
  perfil;


  constructor(
    private _authService: AuthService
    , private _router: Router,
    private usuario: UsuariosService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    //verificar token servcicio que verifquie token

    //obtener perfil de token

    this.perfil = localStorage.getItem('perfil');
    if (this.perfil == "cliente"|| this.perfil == "anonimo" ) {
      return true;
    }
    else {
      this._router.navigate(['/bienvenida']);
      return false;
    }


  }
}