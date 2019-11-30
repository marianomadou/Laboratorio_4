import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actor } from '../clases/actor';

@Injectable({
  providedIn: 'root'
})
export class ActoresServiciosService {

  constructor(private fireStore: AngularFirestore,
    private storage: AngularFireStorage) { }


  enviarActor(peliculaNueva: Actor, archivo) {
    var porcentaje = 0;
    var url: any;

    this.fireStore.collection('actor').add({
      nombre: peliculaNueva.nombre,
      apellido: peliculaNueva.apellido,
      nacionalidad: peliculaNueva.nacionalidad,
      fechaNacimiento: peliculaNueva.fechaDeNacimiento
    });

  }

  traerTodoActor() {
    return this.fireStore.collection('actor').snapshotChanges();
  }


}
