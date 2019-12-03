import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';

import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';


@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit {
  @Output() editarB: EventEmitter<any> = new EventEmitter<any>();

  email: string;
  pass: string;

  constructor(public auth: AuthService,
    public servicio:MiservicioPrincipalService,
    private router: Router) { }

  ngOnInit() {

  }

  async ingresar() {    
    this.servicio.autenticar().onLogin(this.email, this.pass).then(async () => {
      await this.servicio.usuarios().getUserByMail(this.email);
      timer(3000).subscribe(() => {
   
      });
      this.email = "";
      this.pass = "";
      //this.router.navigate(['/home']);
    }).catch()
    {
      
    }


  }

  editar() {
    this.editarB.emit(true);
  }

  irAlRegistro(){
    this.router.navigate(['/registro']);
  }

}
