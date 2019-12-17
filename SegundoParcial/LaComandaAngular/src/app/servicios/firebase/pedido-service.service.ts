import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from '../../clases/pedido';
import { Producto } from '../../clases/producto';
import { Mesa } from 'src/app/clases/mesa';

@Injectable({
  providedIn: 'root'
})
export class PedidoServiceService {


  private pedidosCollection: AngularFirestoreCollection<any>;
  pedidos: Observable<any[]>;


  constructor(
    private db: AngularFirestore) {

    this.pedidosCollection = db.collection<Pedido>('pedidos');
    this.pedidos = this.pedidosCollection.snapshotChanges().pipe(map(
      actions => actions.map(a => {
        const data = a.payload.doc.data() as Pedido;
        const id = a.payload.doc.id;
        return { id, data };
      })
    ));
  }


  crearPedido(nuevoPedido: Pedido) {
    let id = this.db.createId();
    nuevoPedido.uid = id;
    return this.db.collection('pedidos').doc(id).set(JSON.parse(JSON.stringify(nuevoPedido)), { merge: true });

  }

  crearPedidoXArea(nuevoPedido:Pedido, mesa:Mesa) {

    let productosDelArea: Pedido;
    let nroPedidos: Array<string>;

    nroPedidos = new Array();

    let areas = ["postre", "comida", "cerveza", "barra"];
    areas.forEach((area) => {
      productosDelArea = new Pedido();
      nuevoPedido.productos.forEach((producto: Producto) => {
        if (producto.tipo == area) {
          productosDelArea.productos.push(producto);
        }
      });

      if(productosDelArea.productos.length>0)
      {
        productosDelArea.area= area;
        productosDelArea.mesa = mesa.uid;        
        productosDelArea.tiempo_espera = -1;        
        productosDelArea.estado = 'pendiente';
        let id = this.db.createId();
        productosDelArea.uid = id;      
        this.db.collection('pedidos').doc(id).set(JSON.parse(JSON.stringify(productosDelArea)));      
        nroPedidos.push(id);        
      }
      });
    return nroPedidos;
  }


  traerTodosPedidos() {
    return this.db.collection('pedidos',ref => ref.orderBy('estado','asc')).snapshotChanges();
  }

  traerUnPedido(id) {
    return this.db.collection('pedidos').doc(id).valueChanges();
  }

  traerTodosLosPedidosPorTipo(tipo) {
    return this.db.collection(tipo).snapshotChanges();
  }

  cambiarEstadoPedido(pedido: Pedido) {
    return this.pedidosCollection.doc(pedido.uid).update(pedido);
  }

  /**
   * 
   * @param idPedido 
   */
  actualizarUnPedido(idPedido: Pedido, estado) {
    idPedido.estado = estado;
    let pedidoActualizar = this.db.collection<Pedido>("pedidos").doc(idPedido.uid).update(idPedido);
    return pedidoActualizar;
  }

  TraerPedidos() {
    this.pedidosCollection = this.db.collection<Pedido>("pedidos");
    this.pedidos = this.pedidosCollection.valueChanges();
    return this.pedidos;

  }



  eliminarPedido(uid)
  {
    this.db.collection("pedidos").doc(uid).delete();
  }



  async AceptarPedido(pedido: Pedido) 
  {
    pedido.estado = "pendiente";
    this.db.collection("pedidos").doc(pedido.uid).set(pedido).then(() => {

    }, (error) => {

    });

  }

  async CancelarPedido(pedido: Pedido) {
    pedido.estado = "cancelado";
    this.db.collection("pedidos").doc(pedido.uid).set(pedido).then(() => {

    }, (error) => {

    });

  }


  async Cobrar(pedido: Pedido) {
    pedido.estado = "pagado";
    this.db.collection("pedidos").doc(pedido.uid).set(pedido).then(() => {

    }, (error) => {

    });
  }

  async ServirPedido(pedido: Pedido) {
    pedido.estado = "entregado";
    this.db.collection("pedidos").doc(pedido.uid).set(pedido).then(() => {
 
    }, (error) => {
  
    });
  }
}
