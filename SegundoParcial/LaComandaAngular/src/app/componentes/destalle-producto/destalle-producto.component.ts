import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/clases/producto';



@Component({
  selector: 'app-destalle-producto',
  templateUrl: './destalle-producto.component.html',
  styleUrls: ['./destalle-producto.component.scss']
})
export class DestalleProductoComponent implements OnInit {

  @Input() producto: Producto;
  @Output() modal: EventEmitter<any>;

  constructor() { 
    this.modal = new EventEmitter();
  }

  ngOnInit() {
  }

  destruir()
  {
    this.modal.emit(false);
  
  }


}
