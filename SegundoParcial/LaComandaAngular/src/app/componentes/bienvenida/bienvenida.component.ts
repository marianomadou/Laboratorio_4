import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {
  ver: boolean;
  constructor() { }

  ngOnInit() {
    this.ver = false;
  }

  mostrar(){
    this.ver=true;
  }
  ocultar(){
    this.ver=false;
  }

}
