import { Component } from '@angular/core';
import { MiservicioPrincipalService } from './servicios/miservicio-principal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'La Comanda - Dinner';
  constructor(public servicio: MiservicioPrincipalService) {
    
    try {
     //this.servicio.usuarios().traerUnUsuarioPorMail(localStorage.getItem("email"));      

    } catch (e) {

    }

  }
}
