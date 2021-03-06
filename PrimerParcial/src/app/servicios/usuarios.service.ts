import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuarioActual: Usuario;

  constructor(private fireStore: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router) { }


  enviarUsuario(nuevoUsuario: Usuario) {
    let id = this.fireStore.createId();
    nuevoUsuario.uid = id;
    this.usuarioActual = nuevoUsuario;
    return this.fireStore.collection('users').doc(id).set(JSON.parse(JSON.stringify(nuevoUsuario)), { merge: true });
  }



  traerTodosUsuarios() {
    return this.fireStore.collection('users').snapshotChanges();
  }


  traerUno(id) {
    return this.fireStore.collection('users').doc(id).valueChanges();
  }

  borrarUno(uid) {
    return this.fireStore.collection('users').doc(uid).delete();
  }

  actualizarUno(usuario) {
    return this.fireStore.collection('users').doc(usuario.uid).update(usuario);
  }

  traerUnUsuarioPorMail(mail) {
    this.fireStore.collection('users').snapshotChanges().subscribe(e => {
      e.map(a => {
        const data = a.payload.doc.data() as Usuario;
        if (data.email == mail) {
          this.usuarioActual = data;
          console.info("this.usuario", this.usuarioActual);
          localStorage.setItem("email", mail);
          //this.router.navigateByUrl("/perfil"); //para navegar hacia un determinado perfil
          //this.router.navigateByUrl("/home");
        }

      });

    })
  }

  getUserByMail(mail) {
    let usuario;
    this.fireStore.collection('users').snapshotChanges().subscribe(e => {
      e.map(a => {
        const data = a.payload.doc.data() as Usuario;
        if (data.email == mail) {
          this.usuarioActual = data;
          //console.info("this.usuario", JSON.stringify(this.usuarioActual));
          localStorage.setItem("usuario", JSON.stringify(this.usuarioActual));
          //var user = JSON.parse(localStorage.getItem('usuario')); //para traerlo despues
          //this.router.navigateByUrl("/perfil"); //para navegar hacia un determinado perfil
          //this.router.navigateByUrl("/home");
        }

      });

    })
    usuario=JSON.parse(localStorage.getItem('usuario'));
    console.log('usuario seteado: ', usuario.perfil);
    try{
      if(usuario.perfil=='administrador'){
        console.log('VA A ADMIN?')
        this.router.navigateByUrl("/administrador");
      }else if(usuario.perfil=="cliente"){
        this.router.navigateByUrl("/cliente");
      }else if(usuario.perfil=="visitante"){
        this.router.navigateByUrl("/visitante");
      }

    }catch(err){
      console.log('error al intentar ingresar', err)
    };
    
    
    //console.log("usuario en localstorage",localStorage.getItem('usuario'))
  }


  traerUsuarioActual() {
    return this.usuarioActual
  }

  traerUsuarioActualPerfil() {
    return this.usuarioActual.perfil
  }


  actualizarConFoto(UsuarioNuevo: Usuario, archivo) {
    var lala = this.storage.ref('users/' + UsuarioNuevo.email).put(archivo);
    lala.percentageChanges().subscribe((porcentaje) => {
      porcentaje = Math.round(porcentaje);

      if (porcentaje == 100) {
        setTimeout(() => this.storage.ref('users/' + UsuarioNuevo.email).getDownloadURL().subscribe((URL) => {
          UsuarioNuevo.foto = URL;
          this.actualizarUno(UsuarioNuevo);
        }), 3000);
      }
    });

  }

}
