import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-puntos-encuesta',
  templateUrl: './puntos-encuesta.component.html',
  styleUrls: ['./puntos-encuesta.component.scss']
})
export class PuntosEncuestaComponent implements OnInit {
  @Input() nombre: string;
  @Output() elegir: EventEmitter<any>;
  displayParameter;

  constructor() { 
    this.elegir= new EventEmitter();
  }

  ngOnInit() {
   
  }

  handleChange(evt) {
    this.displayParameter = evt;
    this.elegir.emit(evt.target.defaultValue);
 
  }



}
