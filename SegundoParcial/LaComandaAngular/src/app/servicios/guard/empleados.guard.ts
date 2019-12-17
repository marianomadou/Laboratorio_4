import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsuariosService } from '../firebase/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosGuard implements CanActivate {

  perfil;
  constructor(private _authService: AuthService, private _router: Router, private usuario: UsuariosService) {



  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    this.perfil = localStorage.getItem('perfil');

    switch (this.perfil) {
      case "mozo":
      case "comida":
      case "cerveza":
      case "barra":
      case "postre":
        return true;
      case "anonimo":
        this._router.navigate(['/bienvenida']);
      return false;
    }

  }
  
}
