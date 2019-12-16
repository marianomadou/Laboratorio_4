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


  enviarActor(actorNuevo: Actor, archivo) {
    var porcentaje = 0;
    var url: any;

    this.fireStore.collection('actor').add({
      nombre: actorNuevo.nombre,
      apellido: actorNuevo.apellido,
      nacionalidad: actorNuevo.nacionalidad,
      fechaNacimiento: actorNuevo.fechaDeNacimiento
    });

  }

  enviarActorConFoto(actorNuevo: Actor, archivo) {
    var porcentaje = 0;
    var url: any;
    var file = this.storage.ref('actor/' + actorNuevo.nombre + '_' + actorNuevo.apellido).put(archivo);
    file.percentageChanges().subscribe((porcentaje) => {
      porcentaje = Math.round(porcentaje);
      console.log("porcentaje" + porcentaje)
      if (porcentaje == 100) {
        setTimeout(() => this.storage.ref('actor/' + actorNuevo.nombre + '_' + actorNuevo.apellido).getDownloadURL().subscribe((URL) => {
          console.log(URL);
          url = URL;
          this.fireStore.collection('actor').add({
            fotoActor: url,
            nombre: actorNuevo.nombre,
            apellido: actorNuevo.apellido,
            nacionalidad: actorNuevo.nacionalidad,
            fechaNacimiento: actorNuevo.fechaDeNacimiento
          })
        }), 3000);
      }
    });

  }

  actualizaUno(actorActualizar) {
    console.log(actorActualizar)
    return this.fireStore.collection('actor').doc(actorActualizar.id).update(actorActualizar);
  }

  actualizaConFoto(actorActualizar: Actor, archivo) {
    var lala = this.storage.ref('actor/' + actorActualizar.nombre + '_' + actorActualizar.apellido).put(archivo);
    lala.percentageChanges().subscribe((porcentaje) => {
      porcentaje = Math.round(porcentaje);

      if (porcentaje == 100) {
        setTimeout(() => this.storage.ref('actor/' + actorActualizar.nombre  + '_' + actorActualizar.apellido).getDownloadURL().subscribe((URL) => {
          actorActualizar.fotoActor = URL;
          this.actualizaUno(actorActualizar);
        }), 3000);
      }
    });

  }

  traerTodoActor() {
    return this.fireStore.collection('actor').snapshotChanges();
  }

  borrarUno(uid) {
    return this.fireStore.collection('actor').doc(uid).delete();
  }

}
