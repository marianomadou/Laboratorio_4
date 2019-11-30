import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';

import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';


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
    public jugadores:MiservicioPrincipalService) { }

  ngOnInit() {

  }


  editar() {
    this.editarB.emit(true);
  }


  ayuda()
  {
    this.email= "momo@momo.com";
    this.pass="123456";
  }

}
