import { Injectable } from '@angular/core';
import { Mesa } from 'src/app/clases/mesa';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UsuariosService } from './usuarios.service';
import { Usuario } from 'src/app/clases/usuario';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';
import { EncuestaCliente } from 'src/app/clases/encuesta-cliente';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage,
  ) {

  }

  filtrado: any;


  enviarEncuesta(nuevaEncuesta: EncuestaCliente) {
    let id = this.fireStore.createId();
    nuevaEncuesta.uid = id;
    return this.fireStore.collection('encuestas').doc(id).set(JSON.parse(JSON.stringify(nuevaEncuesta)), { merge: true });
  }




  traerTodo() {
    return this.fireStore.collection('encuestas').snapshotChanges();
  }

  traerTodoOrdenados(tipoOrden, orden) {
    return this.fireStore.collection('encuestas', ref => ref.orderBy(tipoOrden, orden)).valueChanges();
  }


  traerUno(id) {
    return this.fireStore.collection('encuestas').doc(id).valueChanges();
  }

  borrarUno(uid) {
    return this.fireStore.collection('encuestas').doc(uid).delete();
  }

  actualizarUno(uid, peliculaActualizar) {
    return this.fireStore.collection('encuestas').doc(uid).set(peliculaActualizar); 
  }


}