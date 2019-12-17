import { Injectable } from '@angular/core';
import { Mesa } from 'src/app/clases/mesa';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UsuariosService } from './usuarios.service';
import { Usuario } from 'src/app/clases/usuario';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MesasServiceService {

  private listaMesasFirebase: AngularFirestoreCollection<Mesa>;
  public listaMesasObservable: Observable<Mesa[]>;
  private listaMesasMozoFirebase: AngularFirestoreCollection<Mesa>;
  private listaMesasMozoObservable: Observable<Mesa[]>;


  public mesas: Array<Mesa>;
  public mesasId: Array<any>;
  //public mesasDisponibles: Array<Mesa>;
  public usuarioEnMesa: Usuario;
  mesaActual: Mesa = null;

  constructor(
    private objFirebase: AngularFirestore,
    public usuarioServ: UsuariosService, private toastr: ToastrService
  ) {

    this.mesas = new Array();
    this.TraerMesas().subscribe(
      actions => actions.forEach(a => {
        const data = a.payload.doc.data() as Mesa;
        this.mesas.push(data);
      })
    );

  }

  TraerMesas() {
    this.listaMesasFirebase = this.objFirebase.collection<Mesa>('mesa', ref => ref.orderBy('numero', 'asc'));
    return this.listaMesasFirebase.snapshotChanges();
  }




  TraerMesasMozo() {
    this.listaMesasMozoFirebase = this.objFirebase.collection<any>('mesa', ref => ref.orderBy('numero', 'asc'));
    this.listaMesasMozoObservable = this.listaMesasMozoFirebase.valueChanges();
    return this.listaMesasMozoObservable;
  }

  enviarMesa(nuevoUsuario: Mesa) {
    let id = this.objFirebase.createId();
    nuevoUsuario.uid = id;
    this.mesaActual = nuevoUsuario;
    return this.objFirebase.collection('mesa').doc(id).set(JSON.parse(JSON.stringify(nuevoUsuario)), { merge: true });
  }

  limpiarMesa(mesaABlanquear: Mesa) {
    mesaABlanquear.cliente = 'sin asignar';
    mesaABlanquear.pedidos = new Array();
    mesaABlanquear.estado = 'disponible';
    return this.objFirebase.collection('mesa').doc(mesaABlanquear.uid).set(JSON.parse(JSON.stringify(mesaABlanquear)), { merge: true });
  }

  /**
   * 
   * @param comensales 
   */
  solicitarMesa(mesa: Mesa) {

    this.mesaActual = mesa;
    return this.actualizarMesaNueva(this.mesaActual, 'solicitada');
    /* this.toastr.success('aguarde confirmacion', 'Solicitud Enviada', {
      timeOut: 2000
    });
 */

  }


  /**
   * 
   * @param comensales 
   */
  async traerTodasDisponible(comensales) {

    const mesasDisponible = this.MesasDisponibles();
    let mesasReturn = new Array<Mesa>()

    mesasDisponible.forEach(async (mesa: Mesa) => { //sacar este return cuando se saca el comentando para el qr

      if (mesa.estado === 'disponible' && mesa.cantidadComensales >= comensales && (comensales + 5) >= mesa.cantidadComensales) {

        mesasReturn.push(mesa);
        this.toastr.info(mesa.numero + " disponible");
      }
    });

    if (mesasReturn.length == 0) {
      this.toastr.error('No hay mesas disponibles', 'Lo sentimos', {
        timeOut: 2000
      });
    }
    return mesasReturn;


  }


  async confirmarMesa(mesa) {
    this.actualizarMesaMozo(mesa, 'reservada');
    this.toastr.success('buscar a ' + mesa.cliente + 'para llevarlo a su mesa', 'Servicio 0', {
      timeOut: 2000
    });
  }

  async confirmarServicio(mesa) {
    this.actualizarMesaMozo(mesa, 'inicioServicio');
    this.toastr.success('buscar a ' + mesa.cliente + 'para llevarlo a su mesa', 'Servicio Iniciado', {
      timeOut: 2000
    });
  }

  async entregarPedido(mesa) {
    this.actualizarMesaMozo(mesa, 'comiendo');
    //aca podria confirmar en el pedido que fue entregado
    this.toastr.success(mesa.numero, 'Comiendo', {
      timeOut: 2000
    });
  }


  traerUnaMesaUID(id) {
    return this.objFirebase.collection('mesa').doc(id).snapshotChanges();
  }


  actualizarMesaNueva(mesa: Mesa, estado) {
    mesa.estado = estado;
    mesa.cliente = this.usuarioServ.traerUsuarioActual().email;
    return this.objFirebase.collection('mesa').doc(mesa.uid).set(JSON.parse(JSON.stringify(mesa)), { merge: true });
  }

  actualizarMesaMozo(mesa: Mesa, estado) {
    mesa.estado = estado;
    return this.objFirebase.collection('mesa').doc(mesa.uid).set(JSON.parse(JSON.stringify(mesa)), { merge: true });
  }


  actualizarMesaEmpleado(mesa: Mesa, estado) {
    mesa.estado = estado;
    return this.objFirebase.collection('mesa').doc(mesa.uid).set(JSON.parse(JSON.stringify(mesa)), { merge: true });
  }



  traerMesaPorUsuarioMail(mail) {
    return this.objFirebase.collection('mesa').snapshotChanges().subscribe(e => {
      e.map(a => {
        const data = a.payload.doc.data() as Mesa;
        if (data.cliente == mail) {
          this.mesaActual = data;
        }

      });

    })
  }



  EstadoPedido(codigo) {

    let flag = false;
    this.mesas.forEach(async (mesa: Mesa) => {

      if (mesa.numero == codigo) {
        this.mesaActual = mesa;
        flag = true;
        alert('La mesa nro: ' + mesa.numero + ' se encuentra ' + mesa.estado + '.');

      };

      if (!flag) {

        alert('Codigo de Mesa incorrecto');
      }
    });

  }

  MesasDisponibles() {
    let mesasFiltradas = [];
    mesasFiltradas = this.mesas.filter(mesas => mesas.estado == 'disponible');
    return mesasFiltradas;
  }


  RelacionMesaUsuario(numeroMesa) {
    this.usuarioEnMesa = null;
    this.mesas.forEach(mesa => {
      if (mesa.numero == numeroMesa) {
        if (mesa.usuario) {
          this.usuarioEnMesa = mesa.usuario;
        }
      }
    });
    return this.usuarioEnMesa;
  }




  async cambiarEstadoMesaOcupada() {
    var usuario = this.usuarioServ.traerUsuarioActual();
    /* return this.qrService.readQR().then(async QRdata => {
  
  if (this.mesaActual.codigoQr == QRdata.text) { */

    if (this.mesaActual.estado == 'reservada' && this.mesaActual.cliente == usuario.email) {

      this.actualizarMesaEmpleado(this.mesaActual, 'ocupada');
      this.mesaActual.estado = 'ocupada';

      alert('La mesa nro: ' + this.mesaActual.numero + ' es ocupada por ' + usuario.nombre + ' ' + usuario.apellido);

    } else if (this.mesaActual.estado == 'reservada') {
      alert('La mesa Nro ' + this.mesaActual.numero + ' no es su reserva');


    }
  }



  LiberarMesa(mesa: Mesa) {
    mesa.estado = 'disponible';
    mesa.usuario = null;
    this.objFirebase.collection('SP_mesas').doc(mesa.uid).set(mesa).then(() => {

    }, (error) => {

    });

  }

}