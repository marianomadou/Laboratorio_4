import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LogStock } from '../clases/log-stock';
import { Usuario } from '../clases/usuario';
import { UsuariosService } from './firebase/usuarios.service';
import { MesasServiceService } from './firebase/mesas-service.service';
import { PedidoServiceService } from './firebase/pedido-service.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private fireStore: AngularFirestore,
    private usuarioServ: UsuariosService,
    private mesaServ: MesasServiceService,
    private pedidoServ: PedidoServiceService,
  ) {  // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          localStorage.setItem('uid', user.uid);
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  /////////// ingresos

  async logInNoGooogle(algo, clave) {

    localStorage.setItem("email", algo);
    this.usuarioServ.traerUnUsuarioPorMail(algo);
    this.fireStore.collection('users').snapshotChanges().subscribe(
        (val) =>
        {
   val.forEach(async element => {
              let element2=   element.payload.doc.data() as Usuario;
                 
 
             if (element2.email== algo && element2.from == "google") {
               await this.googleSignin();
 
             }
             else if (element2.email == algo && element2.from == "github.com") {
               return await this.githubSignin().then(() => this.router.navigateByUrl("/perfil"));
             }
             else if (element2.email == algo && element2.pass == clave) {
        
               await this.clavePassSignin(element2.email, element2.pass).then(() => this.router.navigateByUrl("/perfil"));//modificar acá para los perfiles
             }
            }
            );

        }
      )
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.usuarioServ.traerUnUsuarioPorMail(credential.user.email);
    let data: Usuario;
    data = new Usuario();

    if (credential.additionalUserInfo.isNewUser) {
      data.email = credential.user.email;
      data.displayName = credential.user.displayName;
      data.photoURL = credential.user.photoURL;
      data.from = "google";
      data.perfil = "admin";
      localStorage.setItem('perfil', data.perfil);
      localStorage.setItem('email', data.email);
      this.usuarioServ.enviarUsuario(data);
      this.router.navigateByUrl("/perfil")
    } else {
      await this.usuarioServ.traerUsuarioActual();
      this.router.navigateByUrl("/perfil")
    }
  }



  private updateUserData(user, from) {

    let data: Usuario;
    data = this.usuarioServ.traerUsuarioActual();
    data.credencial = user.uid;
    return this.usuarioServ.actualizarUsuario(data);

  }

  async usuarioPass(email, pass) {
    this.clavePassSignin(email, pass);
  }

  async githubSignin() {
    const provider = new auth.GithubAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserDataGithub(credential);

  }


  private updateUserDataGithub(user) {

    let data: Usuario;
    data = new Usuario();

    console.info("user.credential", user.uid);
    if (user.additionalUserInfo.isNewUser) {

      data.credencial = user.user.uid,
        data.email = user.user.email,
        data.displayName = user.user.displayName,
        data.photoURL = user.user.photoURL,
        data.from = "github.com",
        data.perfil = "cliente";

      localStorage.setItem('perfil', data.perfil);


      this.usuarioServ.enviarUsuario(data);
    }

    else {
      this.usuarioServ.traerUnUsuarioPorMail(user.user.providerData.email);
      this.router.navigateByUrl("/perfil")
    }




  }


  ///////////// nuevos usuarios



  async clavePassSignin(email, pass) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  /*   return this.updateUserData(credential.user, "site"); */
  }


  async usuarioAnonimo(nombre) {
    this.afAuth.auth.signInAnonymously();
    localStorage.setItem('perfil', "anonimo");
    return this.enviarAnonimo(nombre, "anonimo").then(e => this.router.navigateByUrl("/perfil"));
  }

  enviarAnonimo(email, pass) {
    var sp = email.split('@');
    let usuarioAnonimo = new Usuario();
    usuarioAnonimo.email = email,
      usuarioAnonimo.displayName = sp[0],
      usuarioAnonimo.photoURL = '"./assets/foto.png",',
      usuarioAnonimo.from = "site",
      usuarioAnonimo.pass = pass,
      usuarioAnonimo.perfil = "anonimo"
    return this.usuarioServ.enviarUsuario(usuarioAnonimo);
  }





  async altaUsuario(email, pass, file) {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, pass);

    if (file != undefined) {
      localStorage.setItem('perfil', "cliente");
      var sp = email.split('@');
      let usuarioAnonimo = new Usuario();
      usuarioAnonimo.email = email,
        usuarioAnonimo.displayName = sp[0],
        usuarioAnonimo.from = "site",
        usuarioAnonimo.pass = pass,
        usuarioAnonimo.perfil = "cliente"
        this.usuarioServ.enviarUsuarioFoto(usuarioAnonimo, file);   

    } else {
      this.enviar(email, pass, credential.user.uid);
    }

  }

  enviar(email, pass, uid2) {
    localStorage.setItem('perfil', "cliente");
    var sp = email.split('@');
    let usuarioAnonimo = new Usuario();
    usuarioAnonimo.email = email,
      usuarioAnonimo.displayName = sp[0],
      usuarioAnonimo.photoURL = './assets/foto.png,',
      usuarioAnonimo.from = "site",
      usuarioAnonimo.pass = pass,
      usuarioAnonimo.perfil = "cliente"
    return this.usuarioServ.enviarUsuario(usuarioAnonimo);
  }


  async signOut() {
    localStorage.setItem('perfil', "nn");
    localStorage.setItem("email", "nomail");
    this.mesaServ.mesaActual = null;
    this.pedidoServ.pedidos = null;
    this.usuarioServ.limpiarUsuarioActual();
    await this.afAuth.auth.signOut();
    this.router.navigate(['/bienvenida']);
  }
  async signOutSimple() {
    await this.afAuth.auth.signOut();

  }

  whoIsLogIn() {
    return this.afAuth.auth.currentUser;
  }
  whoIsTodo() {
    return this.afAuth.auth
  }












}