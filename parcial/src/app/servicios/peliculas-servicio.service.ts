import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { Pelicula } from '../clases/pelicula';
import { FormControl, FormGroup } from "@angular/forms";
import { Actor } from '../clases/actor';


@Injectable({
  providedIn: 'root'
})
export class PeliculasServicioService { //peticion:any;

  constructor(
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage,
  ) {

  }

  filtrado: any;

  traerTodo() {
    return this.fireStore.collection('peliculas').snapshotChanges();
  }

  traerUno(id) {
    return this.fireStore.collection('peliculas').doc(id).valueChanges();
  }

  borrarUno(uid) {
    return this.fireStore.collection('peliculas').doc(uid).delete();
  }

  actualizarUno(uid, peliculaActualizar) {
    return this.fireStore.collection('peliculas').doc(uid).set({
      nombre: peliculaActualizar.nombre,
      url: peliculaActualizar.fotoPelicula,
      fechaEstreno: peliculaActualizar.fechaEstreno,
      tipo: peliculaActualizar.tipo,
      cantidadPublico: peliculaActualizar.cantidadPublico
    }, { merge: true });
  }


  enviar(peliculaNueva: Pelicula, archivo) {
    var porcentaje = 0;
    var url: any;
    var lala = this.storage.ref('peliculas/' + peliculaNueva.fechaEstreno + '_' + peliculaNueva.nombre).put(archivo);
    lala.percentageChanges().subscribe((porcentaje) => {
      porcentaje = Math.round(porcentaje);
      console.log("porcentaje" + porcentaje)
      if (porcentaje == 100) {
        setTimeout(() => this.storage.ref('peliculas/' + peliculaNueva.fechaEstreno + '_' + peliculaNueva.nombre).getDownloadURL().subscribe((URL) => {
          console.log(URL);
          url = URL;
          console.log(url + "url")
          this.fireStore.collection('peliculas').add({
            nombre: peliculaNueva.nombre,
            url: url,
            fechaEstreno: peliculaNueva.fechaEstreno,
            tipo: peliculaNueva.tipo,
            cantidadPublico: peliculaNueva.cantidadPublico,
            actor: peliculaNueva.actor
          })
        }), 3000);
      }
    });

  }






}