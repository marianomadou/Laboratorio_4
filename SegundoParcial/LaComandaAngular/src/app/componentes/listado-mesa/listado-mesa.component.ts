import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Mesa } from 'src/app/clases/mesa';
import { MiservicioPrincipalService } from 'src/app/servicios/miservicio-principal.service';
import { Pedido } from 'src/app/clases/pedido';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-listado-mesa',
  templateUrl: './listado-mesa.component.html',
  styleUrls: ['./listado-mesa.component.scss']
})
export class ListadoMesaComponent implements OnInit {

  productosPedidos: Array<any>;
  acumuladorProductos = 0;
  @Output() enviar: EventEmitter<any> = new EventEmitter()

  mesas: Array<Mesa>;

  constructor(public servicioGeneral: MiservicioPrincipalService,
  ) {
    this.mesas = new Array();
    this.productosPedidos = new Array();
    this.servicioGeneral.mesas().TraerMesas().subscribe(actions => {
      this.mesas = [];
      actions.map(a => {
        const data = a.payload.doc.data() as Mesa;
        console.info(data, " data");
        this.mesas.push(data);
      });

    });


  }

  ngOnInit() { }

  elegir(producto) {
    //toaster y sumarlo a un array
    alert("eligio mesa" + producto.numero);


  }

  emitirFactura(mesa:Mesa)
  {
    this.servicioGeneral.mesas().actualizarMesaEmpleado(mesa, "pagando");
  }
  cerrarMesa(mesa, estado)
  {
    this.servicioGeneral.mesas().actualizarMesaEmpleado(mesa, estado);
    setTimeout(()=> this.limpiarUnaMesa(mesa), 5000);
  }

  confirmarReserva(mesa)
  {
    this.servicioGeneral.mesas().confirmarMesa(mesa);
  }

  confirmarServicio(mesa)
  {
    this.servicioGeneral.mesas().confirmarServicio(mesa);
  }

  entregarPedido(mesa)
  {
    this.servicioGeneral.mesas().entregarPedido(mesa);
  }



  limpiarTodasLasMesas() {

    let pedi = this.eliminarPedidos();
    this.eliminarClientes();

    let mesass = this.servicioGeneral.mesas().TraerMesas().subscribe(actions => {
      actions.map(a => {
        const data = a.payload.doc.data() as Mesa;
        this.servicioGeneral.mesas().limpiarMesa(data);
      });
    });

    setTimeout(()=>{
      pedi.unsubscribe();
      mesass.unsubscribe();  
    }, 3000);
 
  }





  limpiarUnaMesa(mesa) {
    this.servicioGeneral.mesas().limpiarMesa(mesa);
  }


  eliminarPedidos() {
    return this.servicioGeneral.pedido().traerTodosPedidos().subscribe(actions => {
      actions.map(a => {
        const data = a.payload.doc.data() as Pedido;
        this.servicioGeneral.pedido().eliminarPedido(data.uid);
      });
    });
  }

  eliminarClientes() {
    return this.servicioGeneral.usuarios().traerTodosUsuarios ().subscribe(actions => {
      actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        if(data.registrado)
        {
          data.registrado=false;
          this.servicioGeneral.usuarios().actualizarUsuario(data);
        }
      });
    });
  }


}
