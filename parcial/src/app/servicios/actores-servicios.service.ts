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

  enviarActorConFoto(peliculaNueva: Actor, archivo) {
    var porcentaje = 0;
    var url: any;
    var file = this.storage.ref('actor/' + peliculaNueva.nombre + '_' + peliculaNueva.apellido).put(archivo);
    file.percentageChanges().subscribe((porcentaje) => {
      porcentaje = Math.round(porcentaje);
      console.log("porcentaje" + porcentaje)
      if (porcentaje == 100) {
        setTimeout(() => this.storage.ref('actor/' + peliculaNueva.nombre + '_' + peliculaNueva.apellido).getDownloadURL().subscribe((URL) => {
          console.log(URL);
          url = URL;
          this.fireStore.collection('actor').add({
            fotoActor: url,
            nombre: peliculaNueva.nombre,
            apellido: peliculaNueva.apellido,
            nacionalidad: peliculaNueva.nacionalidad,
            fechaNacimiento: peliculaNueva.fechaDeNacimiento
          })
        }), 3000);
      }
    });

  }

  traerTodoActor() {
    return this.fireStore.collection('actor').snapshotChanges();
  }


}
