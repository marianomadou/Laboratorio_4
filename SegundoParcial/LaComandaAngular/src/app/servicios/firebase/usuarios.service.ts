import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Usuario } from '../../clases/usuario';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuariosFirebase: AngularFirestoreCollection<any>;
  public usuariosObservable: Observable<any>;

  private listaEsperaFirebase: AngularFirestoreCollection<string>;
  private listaEsperaObservable: Observable<string[]>;

  public usuarioActual: Usuario;
  dbRef: AngularFirestoreCollection<any>;

  constructor(private fireStore: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router) {

    this.usuarioActual = null;
    this.dbRef = this.fireStore.collection("users");
  }


  traerUnUsuarioPorMail(mail) {
    this.dbRef.snapshotChanges().subscribe(e => {
      e.map(a => {
        const data = a.payload.doc.data() as Usuario;
        if (data.email == mail) {
          this.usuarioActual = data;
          localStorage.setItem('perfil', this.usuarioActual.perfil)
          localStorage.setItem("email", mail);
        }

      });

    })
  }

  limpiarUsuarioActual() {
    return this.usuarioActual = null;
  }

  traerUsuarioActual() {
    return this.usuarioActual;
  }


  actualizarUsuario(nuevoUsuario: Usuario) {
    return this.dbRef.doc(nuevoUsuario.uid).set(JSON.parse(JSON.stringify(nuevoUsuario)), { merge: true });
  }

  enviarUsuario(nuevoUsuario: Usuario) {
    let id = this.fireStore.createId();
    nuevoUsuario.uid = id;
    this.usuarioActual = nuevoUsuario;
    return this.dbRef.doc(id).set(JSON.parse(JSON.stringify(nuevoUsuario)));
  }

  traerTodosUsuarios() {
    return this.dbRef.snapshotChanges();
  }

  traerUnUsuarios(uid) {
    return this.dbRef.doc(uid).valueChanges();
  }

  borrarUno(uid) {
    return this.dbRef.doc(uid).delete();
  }


  saveUsuario(usuario: Usuario) {
    let id = this.fireStore.createId();
    usuario.uid = id;
    console.info("this.dbRef", this.dbRef)
    return this.dbRef.doc(id).set(usuario);
  }


  TraerUsuariosOrdenMailAsc() {
    this.usuariosFirebase = this.fireStore.collection<Usuario>("users", ref => ref.orderBy('email', 'asc'));
    this.usuariosObservable = this.usuariosFirebase.valueChanges();
    return this.usuariosObservable;
  }


 async enviarUsuarioFoto(nuevoUsuario: Usuario , archivo:File) {
    var lala = this.storage.ref('users/' + archivo.name ).put(archivo);
   await lala.percentageChanges().subscribe((porcentaje) => {
      porcentaje = Math.round(porcentaje);

      if (porcentaje == 100) {
        setTimeout(() => this.storage.ref('users/' + archivo.name).getDownloadURL().subscribe((URL) => {

          nuevoUsuario.photoURL = URL;
         return this.enviarUsuario(nuevoUsuario);
        }), 3000);
      }
    });
  }




}
