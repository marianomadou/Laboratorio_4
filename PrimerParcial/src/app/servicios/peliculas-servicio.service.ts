import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, of, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { Pelicula } from '../clases/pelicula';
import { FormControl, FormGroup } from "@angular/forms";
import { Actor } from '../clases/actor';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PeliculasServicioService { //peticion:any;

  imagenPorDefault;

  constructor(
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage,
    private http: HttpClient
  ) {
    this.imagenPorDefault= this.http.get('/assets/fotopordefecto.jpg', { responseType: 'blob' })
    .subscribe(res => {
      const reader = new FileReader();
      reader.onloadend = () => {
        var base64data = reader.result;
        console.log(base64data);
      }

      reader.readAsDataURL(res);
      console.log(res);
      this.imagenPorDefault=res;
    });
  }

  filtrado: any;

/*   imagenPorDefecto(){
    var archivo:any;
    var archivoImagen:any;
    archivo= this.http.get('/assets/fotopordefecto.jpg', { responseType: 'blob' })
    .subscribe(res => {
      const reader = new FileReader();
      reader.onloadend = () => {
        var base64data = reader.result;
        console.log(base64data);
      }

      reader.readAsDataURL(res);
      console.log(res);
      archivoImagen=res;
    });
    return archivoImagen;
  } */


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
      url: peliculaActualizar.url,
      fechaEstreno: peliculaActualizar.fechaEstreno,
      tipo: peliculaActualizar.tipo,
      cantidadPublico: peliculaActualizar.cantidadPublico
    }, { merge: true });
  }

  actualizaUno(peliculaActualizar) {
    console.log(peliculaActualizar)
    return this.fireStore.collection('peliculas').doc(peliculaActualizar.id).update(peliculaActualizar);
  }

  actualizaConFoto(peliculaActualizar: Pelicula, archivo) {
    var lala = this.storage.ref('peliculas/' + peliculaActualizar.nombre).put(archivo);
    lala.percentageChanges().subscribe((porcentaje) => {
      porcentaje = Math.round(porcentaje);

      if (porcentaje == 100) {
        setTimeout(() => this.storage.ref('peliculas/' + peliculaActualizar.nombre).getDownloadURL().subscribe((URL) => {
          peliculaActualizar.url = URL;
          this.actualizaUno(peliculaActualizar);
        }), 3000);
      }
    });

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

  

  async enviarSinFoto(peliculaNueva: Pelicula) {
    console.log(this.imagenPorDefault)
    var porcentaje = 0;
    var url: any;
    var archivo:any;
    
  
    console.log('archivo en con blob? ', archivo)
    var lala = this.storage.ref('peliculas/' + peliculaNueva.fechaEstreno + '_' + peliculaNueva.nombre).put(this.imagenPorDefault);
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