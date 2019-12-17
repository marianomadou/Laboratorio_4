import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UsuariosService } from '../firebase/usuarios.service';
import { Usuario } from '../../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class PerfilGuardGuard implements CanActivate {

  perfil;


  constructor(private _authService: AuthService, private _router: Router, private usuario: UsuariosService) {



  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    this.perfil = localStorage.getItem('perfil');

    switch (this.perfil) {

      case "admin":
        this._router.navigate(['/admin']);
        break;
      case "cliente":
        this._router.navigate(['/cliente']);
        break;

      case "mozo":
        this._router.navigate(['/mozo']);
        break;
      case "comida":
      case "cerveza":
      case "barra":
      case "postre":
        this._router.navigate(['/empleado']);
        break;
      case "anonimo":
        return true;
    }

  }
}

