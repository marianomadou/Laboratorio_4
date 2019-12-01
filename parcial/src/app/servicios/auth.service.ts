import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private fireStore: AngularFirestore,
  ) {  // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async clavePassSignin(email, pass) {

    console.log("atroden");
    const credential= await this.afAuth.auth.signInWithEmailAndPassword(email, pass);
    return this.updateUserData(credential.user);

  }

  async onLogin(email, pass) {
    console.log("atroden, como tu vieja maraca!");
    return await this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }

  async usuarioPass(email, pass) {

      this.clavePassSignin(email, pass);
  
  }


  enviar(email, pass, perfil) {
    var sp = email.split('@');

    return this.fireStore.collection('users').add({
      email: email,
      displayName: sp[0],
      photoURL: '"./assets/fotopordefecto.jpg",',
      perfil: perfil,
      clave: pass
    })

  }


  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
    localStorage.setItem("email", " ");
  }


  async altaUsuario(email, pass, perfil) {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, pass);
    this.enviar(email, pass, perfil);
  }

}