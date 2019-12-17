import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  @Output() mandarTecla: EventEmitter<any> = new EventEmitter<any>();
  busqueda;

  constructor() {
    this.busqueda = null;
  }

  ngOnInit() {
  }

  mapear(event) {
    console.info("buscar", event.data)
    if (event === null) {
      this.busqueda = null;
    }
    this.mandarTecla.emit(this.busqueda);
  }

}
