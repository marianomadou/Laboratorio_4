import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Router } from '@angular/router';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  email: string;
  pass: string;
  perfil: any;
  ver: boolean;
  crearNuevo;
  showSpinner: boolean;
  selectedFilter: string;

  public perfiles = [
    { value: 'administrador', display: 'administrador' },
    { value: 'cliente', display: 'cliente' },
    { value: 'visitante', display: 'visitante' },
  ];

  constructor(public servicio: MiservicioPrincipalService,
    private router: Router) {
    this.selectedFilter = 'administrador';
  }

  ngOnInit() {
    console.log('perfiles? ', this.perfiles)
  }
  filterChanged(selectedValue: string) {
    console.log('El valor es: ', selectedValue);

  }

  crear() {
    let perfilUser = (<HTMLInputElement>document.getElementById("perfil")).value;
    switch (perfilUser) {
      case "administrador":
        this.perfil = TipoUsuario.admin;
        break;
      case "cliente":
        this.perfil = TipoUsuario.cliente;
        break;
      case "visitante":
        this.perfil = TipoUsuario.visitante;
        break;
    }
    if (this.crearNuevo) {

      if (this.pass != "") {
        this.showSpinner = true;
        this.servicio.autenticar().afAuth.user;
        this.servicio.autenticar().altaUsuario(this.email, this.pass, this.perfil).then(() => {
          this.servicio.usuarios().traerUnUsuarioPorMail(this.email);
          this.email = "";
          this.pass = "";
          timer(3000).subscribe(() => {
            this.showSpinner = false;
          });
        }
        ).catch()
        {
          this.showSpinner = true;
          timer(3000).subscribe(() => {
            this.showSpinner = false;
          });
        }

      } else {
        this.showSpinner = true;
        timer(3000).subscribe(() => {
          this.showSpinner = false;
        });
        this.pass = "";

        //toaster que no son claves iguales

      }
    }
    else {
      this.showSpinner = true;
      this.crearNuevo = true;
      timer(3000).subscribe(() => {
        this.showSpinner = false;
      });
    }

  }

  irALogearse() {
    this.router.navigate(['/login']);
  }

}
